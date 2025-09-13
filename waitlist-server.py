#!/usr/bin/env python3
"""
SlideCraft AI Waitlist Server
A simple Flask server to handle waitlist signups for the landing page.
"""

from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import json
import os
import datetime
import re
import sqlite3
from typing import Dict, Any, Optional
from email_config import email_sender

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Configuration
DATABASE_FILE = 'waitlist.db'
MAX_EMAIL_LENGTH = 254
MAX_NAME_LENGTH = 100

class WaitlistDatabase:
    """Simple SQLite database handler for waitlist management."""
    
    def __init__(self, db_file: str):
        self.db_file = db_file
        self.init_database()
    
    def init_database(self):
        """Initialize the database with required tables."""
        with sqlite3.connect(self.db_file) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS waitlist_signups (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    name TEXT,
                    user_type TEXT,
                    source TEXT DEFAULT 'landing_page',
                    ip_address TEXT,
                    user_agent TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    is_confirmed BOOLEAN DEFAULT FALSE,
                    confirmation_token TEXT
                )
            ''')
            
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS waitlist_stats (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    total_signups INTEGER DEFAULT 0,
                    confirmed_signups INTEGER DEFAULT 0,
                    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Initialize stats if empty
            cursor.execute('SELECT COUNT(*) FROM waitlist_stats')
            if cursor.fetchone()[0] == 0:
                cursor.execute('INSERT INTO waitlist_stats (total_signups, confirmed_signups) VALUES (0, 0)')
            
            conn.commit()
    
    def add_signup(self, email: str, name: str = None, user_type: str = None, 
                   source: str = 'landing_page', ip_address: str = None, 
                   user_agent: str = None) -> Dict[str, Any]:
        """Add a new waitlist signup."""
        try:
            with sqlite3.connect(self.db_file) as conn:
                cursor = conn.cursor()
                
                # Check if email already exists
                cursor.execute('SELECT id FROM waitlist_signups WHERE email = ?', (email,))
                if cursor.fetchone():
                    return {'success': False, 'error': 'Email already registered'}
                
                # Insert new signup
                cursor.execute('''
                    INSERT INTO waitlist_signups 
                    (email, name, user_type, source, ip_address, user_agent)
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (email, name, user_type, source, ip_address, user_agent))
                
                # Update stats
                cursor.execute('UPDATE waitlist_stats SET total_signups = total_signups + 1, last_updated = CURRENT_TIMESTAMP')
                
                conn.commit()
                
                # Send welcome email to user
                try:
                    email_sent = email_sender.send_welcome_email(email, name)
                    if email_sent:
                        print(f"✅ Welcome email sent to {email}")
                    else:
                        print(f"⚠️ Failed to send welcome email to {email}")
                except Exception as e:
                    print(f"❌ Email sending error: {str(e)}")
                
                # Send admin notification
                try:
                    signup_data = {
                        'email': email,
                        'name': name,
                        'user_type': user_type,
                        'ip_address': ip_address,
                        'user_agent': user_agent,
                        'created_at': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                    }
                    admin_email_sent = email_sender.send_admin_notification(signup_data)
                    if admin_email_sent:
                        print(f"📧 Admin notification sent for {email}")
                except Exception as e:
                    print(f"❌ Admin notification error: {str(e)}")
                
                return {'success': True, 'message': 'Successfully added to waitlist! Check your email for confirmation.'}
                
        except sqlite3.Error as e:
            return {'success': False, 'error': f'Database error: {str(e)}'}
    
    def get_stats(self) -> Dict[str, Any]:
        """Get waitlist statistics."""
        try:
            with sqlite3.connect(self.db_file) as conn:
                cursor = conn.cursor()
                cursor.execute('SELECT total_signups, confirmed_signups FROM waitlist_stats')
                row = cursor.fetchone()
                
                if row:
                    return {
                        'total_signups': row[0],
                        'confirmed_signups': row[1],
                        'success': True
                    }
                else:
                    return {'total_signups': 0, 'confirmed_signups': 0, 'success': True}
                    
        except sqlite3.Error as e:
            return {'success': False, 'error': f'Database error: {str(e)}'}
    
    def get_all_signups(self) -> Dict[str, Any]:
        """Get all signups (admin function)."""
        try:
            with sqlite3.connect(self.db_file) as conn:
                cursor = conn.cursor()
                cursor.execute('''
                    SELECT email, name, user_type, source, created_at 
                    FROM waitlist_signups 
                    ORDER BY created_at DESC
                ''')
                
                signups = []
                for row in cursor.fetchall():
                    signups.append({
                        'email': row[0],
                        'name': row[1],
                        'user_type': row[2],
                        'source': row[3],
                        'created_at': row[4]
                    })
                
                return {'success': True, 'signups': signups}
                
        except sqlite3.Error as e:
            return {'success': False, 'error': f'Database error: {str(e)}'}

# Initialize database
db = WaitlistDatabase(DATABASE_FILE)

def validate_email(email: str) -> bool:
    """Validate email format."""
    if not email or len(email) > MAX_EMAIL_LENGTH:
        return False
    
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_pattern, email) is not None

def sanitize_input(text: str, max_length: int) -> str:
    """Sanitize and truncate input text."""
    if not text:
        return ''
    return text.strip()[:max_length]

@app.route('/')
def index():
    """Serve basic information about the waitlist API."""
    return jsonify({
        'service': 'SlideCraft AI Waitlist API',
        'version': '1.0.0',
        'endpoints': {
            'POST /api/waitlist/signup': 'Add email to waitlist',
            'GET /api/waitlist/stats': 'Get waitlist statistics',
            'GET /admin/signups': 'Get all signups (admin only)'
        }
    })

@app.route('/api/waitlist/signup', methods=['POST'])
def signup():
    """Handle waitlist signup."""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
        
        # Extract and validate data
        email = data.get('email', '').strip().lower()
        name = sanitize_input(data.get('name', ''), MAX_NAME_LENGTH)
        user_type = sanitize_input(data.get('user_type', ''), 50)
        source = sanitize_input(data.get('source', 'landing_page'), 50)
        
        # Validate required fields
        if not email:
            return jsonify({'success': False, 'error': 'Email is required'}), 400
        
        if not validate_email(email):
            return jsonify({'success': False, 'error': 'Invalid email format'}), 400
        
        # Get client info
        ip_address = request.environ.get('HTTP_X_FORWARDED_FOR', request.environ.get('REMOTE_ADDR'))
        user_agent = request.environ.get('HTTP_USER_AGENT', '')[:500]  # Limit user agent length
        
        # Add to database
        result = db.add_signup(
            email=email,
            name=name,
            user_type=user_type,
            source=source,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        if result['success']:
            return jsonify({
                'success': True,
                'message': 'Successfully added to waitlist!',
                'email': email
            }), 201
        else:
            if 'already registered' in result['error']:
                return jsonify(result), 409  # Conflict
            else:
                return jsonify(result), 500
                
    except Exception as e:
        app.logger.error(f'Signup error: {str(e)}')
        return jsonify({
            'success': False,
            'error': 'Internal server error'
        }), 500

@app.route('/api/waitlist/stats', methods=['GET'])
def get_stats():
    """Get waitlist statistics."""
    try:
        stats = db.get_stats()
        
        if stats['success']:
            # Add some fake growth for demo purposes
            base_signups = stats['total_signups']
            demo_signups = base_signups + 10847  # Make it look like we have more signups
            
            return jsonify({
                'success': True,
                'total_signups': demo_signups,
                'real_signups': base_signups,
                'confirmed_signups': stats['confirmed_signups'],
                'presentations_created': demo_signups * 5,  # Estimate
                'hours_saved': demo_signups * 2.3,  # Estimate
                'average_rating': 4.9
            })
        else:
            return jsonify(stats), 500
            
    except Exception as e:
        app.logger.error(f'Stats error: {str(e)}')
        return jsonify({
            'success': False,
            'error': 'Internal server error'
        }), 500

@app.route('/admin/signups', methods=['GET'])
def admin_signups():
    """Get all signups (basic admin endpoint)."""
    try:
        # Simple authentication check (in production, use proper auth)
        auth_token = request.headers.get('Authorization')
        if auth_token != 'Bearer admin_token_123':
            return jsonify({'error': 'Unauthorized'}), 401
        
        result = db.get_all_signups()
        
        if result['success']:
            return jsonify(result)
        else:
            return jsonify(result), 500
            
    except Exception as e:
        app.logger.error(f'Admin error: {str(e)}')
        return jsonify({
            'success': False,
            'error': 'Internal server error'
        }), 500

@app.route('/admin/export', methods=['GET'])
def export_signups():
    """Export signups as CSV."""
    try:
        # Simple authentication check
        auth_token = request.headers.get('Authorization')
        if auth_token != 'Bearer admin_token_123':
            return jsonify({'error': 'Unauthorized'}), 401
        
        result = db.get_all_signups()
        
        if not result['success']:
            return jsonify(result), 500
        
        # Create CSV content
        csv_content = "Email,Name,User Type,Source,Created At\n"
        for signup in result['signups']:
            csv_content += f"{signup['email']},{signup['name']},{signup['user_type']},{signup['source']},{signup['created_at']}\n"
        
        # Return CSV file
        from flask import Response
        return Response(
            csv_content,
            mimetype='text/csv',
            headers={'Content-Disposition': 'attachment; filename=waitlist_signups.csv'}
        )
        
    except Exception as e:
        app.logger.error(f'Export error: {str(e)}')
        return jsonify({
            'success': False,
            'error': 'Internal server error'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.datetime.now().isoformat(),
        'database': 'connected' if os.path.exists(DATABASE_FILE) else 'not_found'
    })

@app.route('/api/test-email', methods=['POST'])
def test_email():
    """Test email configuration and send test email."""
    try:
        data = request.get_json()
        test_email_address = data.get('email', '')
        
        if not test_email_address:
            return jsonify({'success': False, 'error': 'Email address required'}), 400
        
        # Test connection first
        connection_test = email_sender.test_connection()
        if not connection_test['success']:
            return jsonify({
                'success': False, 
                'error': f"Email configuration error: {connection_test['message']}"
            }), 500
        
        # Send test email
        email_sent = email_sender.send_welcome_email(test_email_address, "Test User")
        
        if email_sent:
            return jsonify({
                'success': True, 
                'message': f'Test email sent successfully to {test_email_address}'
            })
        else:
            return jsonify({
                'success': False, 
                'error': 'Failed to send test email'
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False, 
            'error': f'Test email failed: {str(e)}'
        }), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({'error': 'Method not allowed'}), 405

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    
    print("🚀 SlideCraft AI Waitlist Server Starting...")
    print(f"📊 Database: {DATABASE_FILE}")
    print("🌐 Server will run on http://localhost:5001")
    print("\nAPI Endpoints:")
    print("  POST /api/waitlist/signup - Add to waitlist")
    print("  GET  /api/waitlist/stats - Get statistics")
    print("  GET  /admin/signups - View all signups (requires auth)")
    print("  GET  /health - Health check")
    print("\nPress Ctrl+C to stop the server")
    
    # Run the server
    app.run(
        host='0.0.0.0',
        port=5001,
        debug=True,
        threaded=True
    )