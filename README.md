# HỆ THỐNG ÔN TẬP TIN HỌC 11 TRỰC TUYẾN (GDPT 2018)

Website trắc nghiệm và tự luận trực tuyến miễn phí dành cho học sinh THPT, hỗ trợ đầy đủ 3 dạng câu hỏi theo cấu trúc định dạng đề thi mới nhất của Bộ Giáo dục & Đào tạo.

---

## 🌟 CÁC TÍNH NĂNG NỔI BẬT

1. **Chuẩn 3 dạng câu hỏi GDPT 2018:**
   - **Phần I:** Trắc nghiệm nhiều lựa chọn (chọn 1 đáp án A, B, C, D).
   - **Phần II:** Trắc nghiệm Đúng/Sai (chọn Đ/S cho 4 ý a, b, c, d với thuật toán barem điểm chuẩn: 0.1đ - 0.25đ - 0.5đ - 1.0đ).
   - **Phần III:** Tự luận / Trả lời ngắn (ô nhập bài làm + đối chiếu đáp án gợi ý & biểu điểm sau khi nộp).
2. **Giao diện hiện đại & Mobile-First:** Thiết kế mượt mà trên điện thoại, máy tính bảng và máy tính.
3. **Đồng hồ đếm ngược:** Cảnh báo khi còn dưới 5 phút, tự động nộp bài khi hết giờ.
4. **Tích hợp Google Sheets qua Google Apps Script:** Tự động gửi kết quả làm bài ngầm về bảng tính của giáo viên (Tên, Lớp, Điểm tổng, Điểm từng phần, Thời gian làm bài, Chi tiết trắc nghiệm và Toàn bộ bài làm tự luận).
5. **In kết quả / Lưu PDF:** Cho phép học sinh in hoặc lưu trang kết quả bài làm để lưu trữ.

---

## 📁 CẤU TRÚC DỰ ÁN

```text
tinhoc11-quiz-app/
├── index.html           # Khung giao diện chính (SPA 3 màn hình)
├── css/
│   └── style.css        # Giao diện hiện đại, responsive mobile-first
├── js/
│   ├── data.js          # Cấu hình đề thi & Ngân hàng câu hỏi Tin học 11
│   └── app.js           # Xử lý render, tính điểm và đồng bộ Webhook
├── gas/
│   └── Code.gs          # Mã Google Apps Script nhận Webhook vào Google Sheets
└── README.md            # Tài liệu hướng dẫn sử dụng
```

---

## 🚀 HƯỚNG DẪN TRIỂN KHAI NHANH

### Bước 1: Thiết lập Google Sheets nhận điểm (Backend)
1. Tạo một trang tính Google Sheets mới tại [Google Drive](https://drive.google.com).
2. Chọn **Tiện ích mở rộng (Extensions)** ➔ **Apps Script**.
3. Dán toàn bộ mã trong file [`gas/Code.gs`](gas/Code.gs) vào.
4. Bấm **Triển khai (Deploy)** ➔ **Tùy chọn triển khai mới (New deployment)**.
5. Chọn loại **Ứng dụng web (Web app)**:
   - Thực thi dưới dạng: **Tôi (Me)**.
   - Ai có quyền truy cập: **Bất kỳ ai (Anyone)** *(Bắt buộc để học sinh không cần đăng nhập Google vẫn nộp được)*.
6. Bấm **Triển khai** và sao chép **URL ứng dụng web** (có đuôi `/exec`).
7. Mở file [`js/data.js`](js/data.js), dán URL vừa sao chép vào biến `gasWebhookUrl`.

---

### Bước 2: Chỉnh sửa hoặc thêm bớt câu hỏi
Thầy/Cô chỉ cần mở file [`js/data.js`](js/data.js) và sao chép/chỉnh sửa các khối câu hỏi mẫu:

```javascript
// Thêm câu trắc nghiệm 4 lựa chọn:
{
  id: "q_moi",
  type: "multiple_choice",
  section: "Phần I. Câu trắc nghiệm nhiều phương án lựa chọn",
  content: "Câu hỏi của thầy cô ở đây?",
  options: [
    { key: "A", text: "Phương án A" },
    { key: "B", text: "Phương án B" },
    { key: "C", text: "Phương án C" },
    { key: "D", text: "Phương án D" }
  ],
  correctAnswer: "A",
  point: 0.25,
  explanation: "Giải thích đáp án..."
}
```

---

### Bước 3: Triển khai website miễn phí lên GitHub Pages
1. Tạo một Repository mới trên [GitHub](https://github.com) (chế độ Public).
2. Tải toàn bộ các file trong thư mục này lên Repository.
3. Vào mục **Settings** của Repository ➔ Chọn tab **Pages** ở menu bên trái.
4. Tại mục **Build and deployment** ➔ **Branch**: Chọn nhánh `main` (hoặc `master`) và thư mục `/ (root)`.
5. Bấm **Save**. Sau khoảng 1 phút, GitHub sẽ cung cấp một đường link website trực tuyến miễn phí (Ví dụ: `https://ten-tai-khoan.github.io/ten-repo/`).
6. Thầy/Cô có thể gửi link này cho toàn bộ học sinh làm bài ngay trên điện thoại hoặc máy tính!
