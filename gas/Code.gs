/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - BACKEND NHẬN VÀ LƯU KẾT QUẢ BÀI THI TIN HỌC 11
 * =========================================================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT NHANH TRONG 2 PHÚT:
 * 1. Mở Google Drive (drive.google.com), tạo một bảng tính mới: "KẾT QUẢ ÔN TẬP TIN HỌC 11".
 * 2. Trên thanh menu, chọn: Tiện ích mở rộng (Extensions) ➔ Apps Script.
 * 3. Xóa hết code mặc định trong file Code.gs và dán toàn bộ đoạn mã này vào.
 * 4. Nhấn biểu tượng Đĩa mềm 💾 (Save) để lưu lại.
 * 5. Bấm nút màu xanh "Triển khai" (Deploy) ➔ Chọn "Tùy chọn triển khai mới" (New deployment).
 * 6. Bấm biểu tượng bánh răng ⚙️ bên cạnh "Chọn loại", chọn: "Ứng dụng web" (Web app).
 * 7. Thiết lập thông số:
 *    - Mô tả: "Webhook ôn tập Tin học 11"
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Me - địa chỉ gmail của thầy/cô)
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone)  <-- CỰC KỲ QUAN TRỌNG!
 * 8. Bấm "Triển khai" (Deploy). Cấp quyền truy cập nếu Google yêu cầu.
 * 9. Sao chép "URL ứng dụng web" (Web App URL có đuôi /exec) và dán vào biến `gasWebhookUrl` 
 *    trong file `js/data.js` của trang web.
 */

// Xử lý khi nhận dữ liệu POST từ website học sinh
function doPost(e) {
  try {
    var rawContents = e.postData.contents;
    var data = JSON.parse(rawContents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "KetQua_TinHoc11";
    var sheet = ss.getSheetByName(sheetName);

    // Nếu chưa có trang tính, tự động tạo mới và tạo hàng tiêu đề đẹp mắt
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      
      var headers = [
        "Thời gian nộp",
        "Họ và tên",
        "Lớp",
        "Tổng điểm TN (Thang 10)",
        "Điểm Phần I (Nhiều lựa chọn)",
        "Điểm Phần II (Đúng/Sai)",
        "Thời gian làm bài",
        "Chi tiết bài Trắc nghiệm & Đúng/Sai",
        "Bài làm Tự luận (Phần III)"
      ];

      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setValues([headers]);
      
      // Định dạng giao diện tiêu đề
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#3b82f6");
      headerRange.setFontColor("#ffffff");
      headerRange.setHorizontalAlignment("center");
      headerRange.setVerticalAlignment("middle");
      sheet.setRowHeight(1, 35);
      sheet.setFrozenRows(1);
    }

    // Ghi dòng dữ liệu mới của học sinh
    var newRow = [
      data.timestamp || new Date().toLocaleString("vi-VN"),
      data.studentName || "Ẩn danh",
      data.studentClass || "Chưa rõ",
      Number(data.totalScore) || 0,
      Number(data.part1Score) || 0,
      Number(data.part2Score) || 0,
      data.duration || "N/A",
      data.quizDetails || "",
      data.essayAnswer || ""
    ];

    sheet.appendRow(newRow);

    var lastRow = sheet.getLastRow();
    
    // Căn giữa các cột điểm số và thời gian
    sheet.getRange(lastRow, 1, 1, 7).setHorizontalAlignment("center");
    // Bật tự động xuống dòng cho cột tự luận để thầy cô dễ đọc
    sheet.getRange(lastRow, 8, 1, 2).setWrap(true);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Dữ liệu đã được lưu thành công vào Google Sheets!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Xử lý khi mở URL trên trình duyệt để kiểm tra trạng thái hoạt động của Script
function doGet(e) {
  return ContentService.createTextOutput(
    "✅ Google Apps Script Webhook cho Website Ôn tập Tin học 11 đang hoạt động bình thường!"
  );
}
