/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - BACKEND NHẬN VÀ LƯU KẾT QUẢ 5 ĐỀ ÔN TẬP TIN HỌC 11
 * =========================================================================
 */

function doPost(e) {
  try {
    var rawContents = e.postData.contents;
    var data = JSON.parse(rawContents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "KetQua_TinHoc11";
    var sheet = ss.getSheetByName(sheetName);

    // Nếu chưa có trang tính, tự động tạo mới và tạo hàng tiêu đề chuẩn đẹp
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      
      var headers = [
        "Thời gian nộp",
        "Họ và tên",
        "Lớp",
        "Mã đề thi",
        "Tổng điểm TN (Tối đa 7.0đ)",
        "Điểm Phần I (3.0đ)",
        "Điểm Phần II (4.0đ)",
        "Thời gian làm bài",
        "Chi tiết bài Trắc nghiệm & Đúng/Sai",
        "Bài làm Tự luận (Phần III - 3.0đ)"
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

    // Ghi dòng dữ liệu mới của học sinh kèm Mã Đề
    var newRow = [
      data.timestamp || new Date().toLocaleString("vi-VN"),
      data.studentName || "Ẩn danh",
      data.studentClass || "Chưa rõ",
      data.examCode || "ĐỀ SỐ 01",
      Number(data.totalScore) || 0,
      Number(data.part1Score) || 0,
      Number(data.part2Score) || 0,
      data.duration || "N/A",
      data.quizDetails || "",
      data.essayAnswer || ""
    ];

    sheet.appendRow(newRow);

    var lastRow = sheet.getLastRow();
    
    // Căn giữa các cột thông tin và điểm số
    sheet.getRange(lastRow, 1, 1, 8).setHorizontalAlignment("center");
    // Bật tự động xuống dòng cho cột tự luận
    sheet.getRange(lastRow, 9, 1, 2).setWrap(true);

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

function doGet(e) {
  return ContentService.createTextOutput(
    "✅ Google Apps Script Webhook 5 Đề Tin học 11 đang hoạt động bình thường!"
  );
}
