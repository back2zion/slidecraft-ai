#!/usr/bin/env python3
"""
SlideCraft AI Server Launcher
Starts both the main PPT generator server and the waitlist server.
"""

import subprocess
import threading
import time
import sys
import os

def start_main_server():
    """Start the main PPT generator server using UV."""
    print("🚀 Starting SlideCraft AI Main Server on port 8000...")
    try:
        subprocess.run(["uv", "run", "server.py"], check=True)
    except KeyboardInterrupt:
        print("\n📱 Main server stopped")
    except FileNotFoundError:
        print("❌ server.py not found. Make sure you're in the correct directory.")
    except Exception as e:
        print(f"❌ Error starting main server: {e}")

def start_waitlist_server():
    """Start the waitlist server using UV."""
    print("📝 Starting Waitlist Server on port 5001...")
    try:
        subprocess.run(["uv", "run", "--group", "waitlist", "waitlist-server.py"], check=True)
    except KeyboardInterrupt:
        print("\n📝 Waitlist server stopped")
    except FileNotFoundError:
        print("❌ waitlist-server.py not found. Make sure you're in the correct directory.")
    except Exception as e:
        print(f"❌ Error starting waitlist server: {e}")

def main():
    """Main function to coordinate server startup."""
    print("🎨 SlideCraft AI - Server Launcher")
    print("=" * 50)
    
    # Check if required files exist
    required_files = ["server.py", "waitlist-server.py", "index.html", "landing.html"]
    missing_files = [f for f in required_files if not os.path.exists(f)]
    
    if missing_files:
        print(f"❌ Missing required files: {', '.join(missing_files)}")
        print("Make sure you're in the correct directory.")
        return
    
    print("✅ All required files found")
    print("\nStarting servers...")
    print("📱 Main App: http://localhost:8000")
    print("🌐 Landing Page: http://localhost:8000/landing.html")
    print("📝 Waitlist API: http://localhost:5001")
    print("\nPress Ctrl+C to stop all servers")
    print("=" * 50)
    
    # Start servers in separate threads
    main_thread = threading.Thread(target=start_main_server, daemon=True)
    waitlist_thread = threading.Thread(target=start_waitlist_server, daemon=True)
    
    try:
        # Start main server
        main_thread.start()
        time.sleep(2)  # Give main server time to start
        
        # Start waitlist server
        waitlist_thread.start()
        time.sleep(1)
        
        print("\n🎉 Both servers are running!")
        print("🔗 Visit: http://localhost:8000/landing.html")
        
        # Keep main thread alive
        while True:
            time.sleep(1)
            
    except KeyboardInterrupt:
        print("\n\n🛑 Shutting down all servers...")
        print("👋 Thanks for using SlideCraft AI!")

if __name__ == "__main__":
    main()