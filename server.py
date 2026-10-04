#!/usr/bin/env python3
import http.server
import socketserver
import socket
import webbrowser
import os
import sys

def get_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'

PORT = 3000
ip = get_ip()
web_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(web_dir)

# Tạo file qrcode helper HTML để phụ huynh quét mã
qr_url = f"http://{ip}:{PORT}/index.html"
qr_image_url = f"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=http://{ip}:{PORT}/index.html"

qr_html_content = f"""<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Kết Nối Thiết Bị Cho Bé</title>
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #EEF2FF, #FDF2F8);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      color: #1E293B;
      text-align: center;
      padding: 20px;
    }}
    .card {{
      background: white;
      padding: 36px 30px;
      border-radius: 24px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      max-width: 480px;
      width: 100%;
    }}
    h1 {{ color: #4F46E5; margin-bottom: 8px; font-size: 1.6rem; }}
    p {{ color: #64748B; font-size: 0.95rem; margin-top: 0; }}
    .qr-box {{
      margin: 20px 0;
      padding: 16px;
      background: #F8FAFC;
      border: 2px dashed #CBD5E1;
      border-radius: 16px;
      display: inline-block;
    }}
    .qr-box img {{
      display: block;
      width: 240px;
      height: 240px;
      border-radius: 8px;
    }}
    .url-badge {{
      background: #EEF2FF;
      color: #3730A3;
      padding: 10px 18px;
      border-radius: 30px;
      font-weight: 800;
      font-size: 1.15rem;
      display: inline-block;
      margin-top: 8px;
      word-break: break-all;
    }}
    .guide {{
      margin-top: 20px;
      text-align: left;
      background: #FFFBEB;
      border-left: 4px solid #F59E0B;
      padding: 12px 16px;
      border-radius: 4px 12px 12px 4px;
      font-size: 0.9rem;
      color: #78350F;
    }}
  </style>
</head>
<body>
  <div class="card">
    <h1>📱 Cho Bé Học Trên iPad / Điện Thoại</h1>
    <p>Máy của bé đang kết nối cùng mạng Wi-Fi nhà</p>

    <div class="qr-box">
      <img src="{qr_image_url}" alt="Mã QR Truy Cập">
    </div>

    <div>
      <div style="font-size: 0.85rem; font-weight: 700; color: #475569;">HOẶC GÕ ĐỊA CHỈ NÀY TRÊN TRÌNH DUYỆT CỦA BÉ:</div>
      <div class="url-badge">{qr_url}</div>
    </div>

    <div class="guide">
      <strong>Mẹo hay cho bé:</strong><br>
      Sau khi trang web mở lên trên iPad/Điện thoại, hãy bấm nút <strong>Chia sẻ (Share) ➔ Thêm vào MH chính (Add to Home Screen)</strong> để bé có icon mở học toàn màn hình như ứng dụng xịn!
    </div>
  </div>
</body>
</html>
"""

with open("ket_noi_ipad.html", "w", encoding="utf-8") as f:
    f.write(qr_html_content)

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

print("=" * 60)
print(f"🚀 MÁY CHỦ HỌC TIẾNG HÀN ĐÃ SẴN SÀNG!")
print(f"👉 Địa chỉ truy cập trên iPad/Điện thoại của bé: {qr_url}")
print(f"👉 Quét mã QR tại: http://{ip}:{PORT}/ket_noi_ipad.html")
print("=" * 60)
print("💡 Nhấn phím Ctrl + C để dừng máy chủ.")

# Mở trang hướng dẫn mã QR trên máy Mac để phụ huynh quét
try:
    webbrowser.open(f"http://localhost:{PORT}/ket_noi_ipad.html")
except Exception:
    pass

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nĐã dừng máy chủ.")
        sys.exit(0)
