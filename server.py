#!/usr/bin/env python3
"""
Simple proxy server to handle Claude API requests and avoid CORS issues
"""

import http.server
import socketserver
import json
import urllib.request
import urllib.parse
import os
from urllib.error import HTTPError, URLError

class ProxyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        """Handle preflight CORS requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, x-api-key, anthropic-version')
        self.end_headers()

    def do_POST(self):
        """Handle POST requests to Claude API proxy"""
        if self.path == '/api/claude':
            try:
                # Read request body
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                
                # Parse JSON data
                data = json.loads(post_data.decode('utf-8'))
                
                # Get API key from environment or request
                api_key = os.getenv('CLAUDE_API_KEY') or data.get('api_key')
                if not api_key:
                    self.send_error(401, 'API key required')
                    return
                
                # Prepare request to Claude API
                claude_url = 'https://api.anthropic.com/v1/messages'
                headers = {
                    'Content-Type': 'application/json',
                    'x-api-key': api_key,
                    'anthropic-version': '2023-06-01'
                }
                
                # Remove api_key from data before sending to Claude
                claude_data = {k: v for k, v in data.items() if k != 'api_key'}
                
                # Make request to Claude API
                req = urllib.request.Request(
                    claude_url,
                    data=json.dumps(claude_data).encode('utf-8'),
                    headers=headers
                )
                
                with urllib.request.urlopen(req) as response:
                    response_data = response.read()
                
                # Send response back to client
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(response_data)
                
            except HTTPError as e:
                error_response = e.read().decode('utf-8')
                print(f"Claude API Error: {e.code} - {error_response}")
                
                self.send_response(e.code)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(error_response.encode('utf-8'))
                
            except URLError as e:
                print(f"Network Error: {e}")
                self.send_error(503, f'Service unavailable: {str(e)}')
                
            except json.JSONDecodeError as e:
                print(f"JSON Error: {e}")
                self.send_error(400, f'Invalid JSON: {str(e)}')
                
            except Exception as e:
                print(f"Unexpected Error: {e}")
                self.send_error(500, f'Internal server error: {str(e)}')
        else:
            # Handle normal file serving
            super().do_POST()

    def do_GET(self):
        """Handle GET requests (serve files normally)"""
        super().do_GET()

def run_server(port=8000):
    """Run the proxy server"""
    try:
        with socketserver.TCPServer(("", port), ProxyHTTPRequestHandler) as httpd:
            print(f"SlideCraft AI server is running!")
            print(f"Open http://localhost:{port} in your browser")
            print(f"Proxy API: http://localhost:{port}/api/claude")
            print(f"Stop server: Ctrl+C")
            print("-" * 50)
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except OSError as e:
        if e.errno == 10048:  # Port already in use on Windows
            print(f"Port {port} is already in use. Trying another port...")
            print(f"Retrying with port {port + 1}...")
            run_server(port + 1)
        else:
            print(f"Server start error: {e}")

if __name__ == "__main__":
    # Check for API key
    api_key = os.getenv('CLAUDE_API_KEY')
    if not api_key:
        print("Warning: CLAUDE_API_KEY environment variable not set.")
        print("You can enter API key directly in the web interface.")
        print()
    
    run_server()