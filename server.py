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
            print(f"🚀 AI PPT Generator 서버가 실행되었습니다!")
            print(f"📍 브라우저에서 http://localhost:{port} 접속하세요")
            print(f"🔧 프록시 API: http://localhost:{port}/api/claude")
            print(f"⚡ 서버 중지: Ctrl+C")
            print("-" * 50)
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 서버가 중지되었습니다.")
    except OSError as e:
        if e.errno == 10048:  # Port already in use on Windows
            print(f"❌ 포트 {port}가 이미 사용 중입니다. 다른 포트를 시도해보세요.")
            print(f"💡 포트 {port + 1}로 다시 시도합니다...")
            run_server(port + 1)
        else:
            print(f"❌ 서버 시작 오류: {e}")

if __name__ == "__main__":
    # Check for API key
    api_key = os.getenv('CLAUDE_API_KEY')
    if not api_key:
        print("⚠️  경고: CLAUDE_API_KEY 환경변수가 설정되지 않았습니다.")
        print("💡 API 키는 웹 인터페이스에서 직접 입력할 수 있습니다.")
        print()
    
    run_server()