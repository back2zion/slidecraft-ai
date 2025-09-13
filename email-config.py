#!/usr/bin/env python3
"""
Email configuration and sender for SlideCraft AI Waitlist
Supports Gmail SMTP with app passwords
"""

import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr
import os
import logging
from typing import Dict, Any, Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EmailSender:
    """Email sender class for waitlist confirmations and notifications."""
    
    def __init__(self):
        # Email configuration from environment variables
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.sender_email = os.getenv('SENDER_EMAIL', '')
        self.sender_password = os.getenv('SENDER_PASSWORD', '')
        self.sender_name = os.getenv('SENDER_NAME', 'SlideCraft AI Team')
        
        # Validate configuration
        if not self.sender_email or not self.sender_password:
            logger.warning("Email configuration not complete. Set SENDER_EMAIL and SENDER_PASSWORD environment variables.")
    
    def send_welcome_email(self, recipient_email: str, recipient_name: str = "") -> bool:
        """Send welcome email to new waitlist signup."""
        try:
            # Create message
            msg = MIMEMultipart("alternative")
            msg["Subject"] = "🚀 Welcome to SlideCraft AI Waitlist!"
            msg["From"] = formataddr((self.sender_name, self.sender_email))
            msg["To"] = recipient_email
            
            # Email content
            recipient_display = recipient_name if recipient_name else "there"
            
            # Plain text version
            text_content = f"""
Hi {recipient_display}!

🎉 Welcome to the SlideCraft AI waitlist!

Thank you for your interest in SlideCraft AI - the revolutionary AI-powered presentation generator that turns 8 hours of work into 8 minutes.

What's Next?
✅ You're now on our exclusive waitlist
✅ You'll be among the first to get early access
✅ We'll notify you as soon as new features are available
✅ Get tips and updates on AI-powered presentation creation

In the meantime, feel free to try our current version at:
🔗 https://slidecraft-ai.com

Questions? Just reply to this email - we'd love to hear from you!

Best regards,
The SlideCraft AI Team

---
Follow us for updates:
🌐 Website: https://slidecraft-ai.com
🎬 Demo: https://youtu.be/pBW2L7jmffw
📧 Contact: support@slidecraft-ai.com
            """
            
            # HTML version
            html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to SlideCraft AI!</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #3b82f6; font-size: 28px; margin-bottom: 10px;">
            🚀 Welcome to SlideCraft AI!
        </h1>
        <p style="color: #6b7280; font-size: 16px; margin: 0;">
            Turn 8 Hours of Work into 8 Minutes
        </p>
    </div>
    
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
        <h2 style="margin: 0 0 15px 0; font-size: 24px;">Hi {recipient_display}! 👋</h2>
        <p style="margin: 0; font-size: 18px; opacity: 0.9;">
            Thank you for joining our exclusive waitlist! You're now part of the future of AI-powered presentations.
        </p>
    </div>
    
    <div style="margin-bottom: 30px;">
        <h3 style="color: #1f2937; margin-bottom: 20px;">🎯 What's Next?</h3>
        <ul style="list-style: none; padding: 0;">
            <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                ✅ <strong>You're on the list!</strong> - First in line for early access
            </li>
            <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                📧 <strong>Stay updated</strong> - Get notified of new features and releases
            </li>
            <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                🎁 <strong>Exclusive access</strong> - Special features just for waitlist members
            </li>
            <li style="padding: 10px 0;">
                💡 <strong>Pro tips</strong> - Learn AI presentation best practices
            </li>
        </ul>
    </div>
    
    <div style="text-align: center; margin-bottom: 30px;">
        <a href="https://slidecraft-ai.com" 
           style="display: inline-block; background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
            🚀 Try SlideCraft AI Now
        </a>
    </div>
    
    <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
        <h4 style="color: #374151; margin: 0 0 15px 0;">📺 See SlideCraft AI in Action</h4>
        <p style="margin: 0 0 15px 0; color: #6b7280;">
            Watch our demo video to see how easy it is to create professional presentations with AI.
        </p>
        <a href="https://youtu.be/pBW2L7jmffw" 
           style="color: #3b82f6; text-decoration: none; font-weight: 500;">
            ▶️ Watch Demo Video
        </a>
    </div>
    
    <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb; margin-top: 30px;">
        <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px 0;">
            Questions? Just reply to this email - we'd love to help!
        </p>
        <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Best regards,<br>
            <strong>The SlideCraft AI Team</strong>
        </p>
    </div>
    
    <div style="text-align: center; padding: 15px 0; color: #9ca3af; font-size: 12px;">
        <p style="margin: 0;">
            You received this email because you signed up for the SlideCraft AI waitlist.
        </p>
    </div>
    
</body>
</html>
            """
            
            # Attach both versions
            text_part = MIMEText(text_content, "plain")
            html_part = MIMEText(html_content, "html")
            
            msg.attach(text_part)
            msg.attach(html_part)
            
            # Send email
            return self._send_email(msg)
            
        except Exception as e:
            logger.error(f"Failed to send welcome email to {recipient_email}: {str(e)}")
            return False
    
    def send_admin_notification(self, signup_data: Dict[str, Any]) -> bool:
        """Send notification to admin about new signup."""
        try:
            admin_email = os.getenv('ADMIN_EMAIL', self.sender_email)
            
            # Create message
            msg = MIMEMultipart()
            msg["Subject"] = f"🎯 New SlideCraft AI Waitlist Signup - {signup_data.get('email', 'Unknown')}"
            msg["From"] = formataddr((self.sender_name, self.sender_email))
            msg["To"] = admin_email
            
            # Email content
            content = f"""
New Waitlist Signup Alert!

📧 Email: {signup_data.get('email', 'N/A')}
👤 Name: {signup_data.get('name', 'Not provided')}
🏢 User Type: {signup_data.get('user_type', 'Not specified')}
📅 Signup Time: {signup_data.get('created_at', 'N/A')}
🌐 IP Address: {signup_data.get('ip_address', 'N/A')}
📱 User Agent: {signup_data.get('user_agent', 'N/A')[:100]}...

---
Total signups can be viewed at: http://localhost:8000/admin.html

Manage your waitlist from the admin dashboard.
            """
            
            text_part = MIMEText(content, "plain")
            msg.attach(text_part)
            
            # Send email
            return self._send_email(msg)
            
        except Exception as e:
            logger.error(f"Failed to send admin notification: {str(e)}")
            return False
    
    def _send_email(self, message: MIMEMultipart) -> bool:
        """Send email using SMTP."""
        try:
            if not self.sender_email or not self.sender_password:
                logger.warning("Email credentials not configured. Email not sent.")
                return False
            
            # Create SMTP connection
            context = ssl.create_default_context()
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.sender_email, self.sender_password)
                
                # Send email
                text = message.as_string()
                server.sendmail(
                    self.sender_email, 
                    message["To"], 
                    text
                )
                
            logger.info(f"Email sent successfully to {message['To']}")
            return True
            
        except Exception as e:
            logger.error(f"SMTP error: {str(e)}")
            return False
    
    def test_connection(self) -> Dict[str, Any]:
        """Test email configuration and connection."""
        try:
            if not self.sender_email or not self.sender_password:
                return {
                    "success": False,
                    "message": "Email credentials not configured"
                }
            
            context = ssl.create_default_context()
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.sender_email, self.sender_password)
                
            return {
                "success": True,
                "message": f"Email connection successful to {self.smtp_server}:{self.smtp_port}"
            }
            
        except Exception as e:
            return {
                "success": False,
                "message": f"Email connection failed: {str(e)}"
            }

# Global email sender instance
email_sender = EmailSender()