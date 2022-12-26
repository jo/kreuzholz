#!/usr/bin/env python

from http.server import HTTPServer, BaseHTTPRequestHandler
from io import BytesIO
import json
from random import randrange


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        print("path:", self.path)

        if self.path == "/":
            resp_data = { "ok": True, "welcome": "This is Anschlag!" }

            self.send_response(200)
            self.end_headers()
            response = BytesIO()
            response.write(json.dumps(resp_data).encode(encoding='utf_8'))
            self.wfile.write(response.getvalue())
        elif self.path == "/info":
            resp_data = { "ok": True, "position": randrange(200) + randrange(10) * randrange(1000) / 100 }

            self.send_response(200)
            self.end_headers()
            response = BytesIO()
            response.write(json.dumps(resp_data).encode(encoding='utf_8'))
            self.wfile.write(response.getvalue())
        else:
            resp_data = { "ok": False, "error": "not_found" }

            self.send_response(400)
            self.end_headers()
            response = BytesIO()
            response.write(json.dumps(resp_data).encode(encoding='utf_8'))
            self.wfile.write(response.getvalue())

    def do_POST(self):
        print("path:", self.path)

        if self.path == "/go":
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body)
        
            print("data:", data)

            resp_data = { "ok": True, "command": "go" }

            self.send_response(200)
            self.end_headers()
            response = BytesIO()
            response.write(json.dumps(resp_data).encode(encoding='utf_8'))
            self.wfile.write(response.getvalue())

        elif self.path == "/stop":
            resp_data = { "ok": True, "command": "stop" }

            self.send_response(200)
            self.end_headers()
            response = BytesIO()
            response.write(json.dumps(resp_data).encode(encoding='utf_8'))
            self.wfile.write(response.getvalue())

        else:
            resp_data = { "ok": False, "error": "not_found" }

            self.send_response(400)
            self.end_headers()
            response = BytesIO()
            response.write(json.dumps(resp_data).encode(encoding='utf_8'))
            self.wfile.write(response.getvalue())


httpd = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)
httpd.serve_forever()
