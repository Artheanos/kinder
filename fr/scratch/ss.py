import argparse
import json
from http.server import HTTPServer, BaseHTTPRequestHandler

print('Loading')

db = ['text', 'dupa']


class MyHandler(BaseHTTPRequestHandler):
    def set_headers(self, http_response: int):
        self.send_response(http_response)
        self.send_header("Content-type", "text/html")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

    def do_GET(self):
        if not self.path.startswith('/texts'):
            self.set_headers(400)
            return

        if self.path[6:] == '/dupa':
            self.set_headers(400)
        elif self.path == '/texts':
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(db).encode())
        else:
            db.append(self.path[6:])
            self.set_headers(200)


parser = argparse.ArgumentParser(description="Run a simple HTTP server")
parser.add_argument(
    "-l",
    "--listen",
    default="localhost",
    help="Specify the IP address on which the server listens",
)
parser.add_argument(
    "-p",
    "--port",
    type=int,
    default=5000,
    help="Specify the port on which the server listens",
)
args = parser.parse_args()

print(f'Started server at {args.listen}:{args.port}')
HTTPServer((args.listen, args.port), MyHandler).serve_forever()
