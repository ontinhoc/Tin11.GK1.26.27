/**
 * CẤU HÌNH ĐỀ THI VÀ NGÂN HÀNG CÂU HỎI TIN HỌC 11 (GDPT 2018)
 * 
 * Nguồn dữ liệu gồm:
 * - Phần I: 60 câu trắc nghiệm 1 lựa chọn
 * - Phần II: 20 câu trắc nghiệm Đúng/Sai
 * - Phần III: 10 câu tự luận
 * 
 * Hệ thống tự động chia thành 5 ĐỀ ÔN TẬP (Đề 01 -> Đề 05):
 * Mỗi đề gồm: 12 câu Phần I + 4 câu Phần II + 2 câu Phần III (Tổng 18 câu)
 * Thang điểm: Phần I (3.0đ) + Phần II (4.0đ) + Phần III (3.0đ) = 10.0đ chuẩn Bộ GD&ĐT
 */

const EXAM_CONFIG = {
  title: "BÀI ÔN TẬP ĐỊNH KỲ - TIN HỌC 11",
  subject: "Tin học 11 - Định hướng Tin học ứng dụng & Khoa học máy tính",
  durationMinutes: 45, // Thời gian làm bài mỗi đề
  
  // URL Web App của Google Apps Script (Thầy/Cô dán URL của mình vào đây)
  gasWebhookUrl: "", 

  // Số lượng câu hỏi trích xuất cho mỗi đề thi
  examStructure: {
    part1Count: 12, // 12 câu trắc nghiệm 1 lựa chọn (0.25đ / câu = 3.0đ)
    part2Count: 4,  // 4 câu Đúng/Sai (tối đa 1.0đ / câu = 4.0đ)
    part3Count: 2   // 2 câu tự luận (1.5đ / câu = 3.0đ)
  },

  // Danh sách tên 5 đề ôn tập
  examList: [
    { id: 0, code: "ĐỀ SỐ 01", title: "Đề ôn tập số 01" },
    { id: 1, code: "ĐỀ SỐ 02", title: "Đề ôn tập số 02" },
    { id: 2, code: "ĐỀ SỐ 03", title: "Đề ôn tập số 03" },
    { id: 3, code: "ĐỀ SỐ 04", title: "Đề ôn tập số 04" },
    { id: 4, code: "ĐỀ SỐ 05", title: "Đề ôn tập số 05" }
  ],

  // Barem điểm chuẩn Bộ GD&ĐT cho Phần II (Đúng/Sai)
  trueFalseScoringMatrix: {
    0: 0.0,
    1: 0.1,  // Đúng 1 ý: 0.1 điểm
    2: 0.25, // Đúng 2 ý: 0.25 điểm
    3: 0.5,  // Đúng 3 ý: 0.5 điểm
    4: 1.0   // Đúng cả 4 ý: 1.0 điểm
  }
};

/**
 * NGÂN HÀNG CÂU HỎI TOÀN BỘ (Được chia làm 3 mảng riêng biệt)
 * Thầy/Cô chỉ cần sao chép và dán lần lượt các câu hỏi của mình vào 3 mảng dưới đây.
 */
const QUESTION_BANK = {

  // =================================================================
  // PHẦN I: 60 CÂU TRẮC NGHIỆM 1 LỰA CHỌN (12 câu / đề)
  // =================================================================
  part1: [
{
    id: "p1_1",
    content: "Cơ chế nào giúp hệ điều hành máy tính cá nhân tự động nhận biết thiết bị ngoại vi khi cắm vào hoặc khi khởi động máy tính?",
    options: [
      { key: "A", text: "Cơ chế đa nhiệm." },
      { key: "B", text: "Cơ chế plug & play." },
      { key: "C", text: "Cơ chế giao diện dòng lệnh." },
      { key: "D", text: "Cơ chế phân quyền sử dụng." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Plug & Play giúp hệ điều hành tự động nhận biết và cấu hình thiết bị ngoại vi khi thiết bị được kết nối."
  },
  {
    id: "p1_2",
    content: "Hệ điều hành LINUX phiên bản 1.0 được công bố chính thức vào năm nào dưới dạng mã nguồn mở?",
    options: [
      { key: "A", text: "Năm 1985." },
      { key: "B", text: "Năm 1990." },
      { key: "C", text: "Năm 1994." },
      { key: "D", text: "Năm 2001." }
    ],
    correctAnswer: "C",
    point: 0.25,
    explanation: "Linux phiên bản 1.0 được công bố vào năm 1994."
  },
  {
    id: "p1_3",
    content: "Hai hệ điều hành phổ biến nhất trên các thiết bị di động hiện nay là những hệ điều hành nào?",
    options: [
      { key: "A", text: "Windows và macOS." },
      { key: "B", text: "iOS và Android." },
      { key: "C", text: "Unix và LINUX." },
      { key: "D", text: "MS-DOS và Ubuntu." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "iOS và Android là hai hệ điều hành phổ biến trên điện thoại thông minh và máy tính bảng."
  },
  {
    id: "p1_4",
    content: "Trong hệ thống máy tính, hệ điều hành đóng vai trò gì đối với phần cứng và phần mềm ứng dụng?",
    options: [
      { key: "A", text: "Là thiết bị trực tiếp thực hiện tính toán và xử lý dữ liệu." },
      { key: "B", text: "Là phần mềm ứng dụng được thiết kế theo yêu cầu cụ thể của từng người dùng." },
      { key: "C", text: "Là môi trường trung gian giúp phần mềm ứng dụng khai thác hiệu quả phần cứng." },
      { key: "D", text: "Là phương tiện lưu trữ dữ liệu lâu dài kể cả khi tắt máy tính." }
    ],
    correctAnswer: "C",
    point: 0.25,
    explanation: "Hệ điều hành quản lí phần cứng và cung cấp môi trường để phần mềm ứng dụng hoạt động."
  },
  {
    id: "p1_5",
    content: "Giao diện đồ họa (GUI) của hệ điều hành máy tính cá nhân bao gồm các thành phần cơ bản nào sau đây?",
    options: [
      { key: "A", text: "Cửa sổ, biểu tượng và chuột." },
      { key: "B", text: "Mạch logic AND, OR và NOT." },
      { key: "C", text: "Cuộn băng đục lỗ và bìa đục lỗ." },
      { key: "D", text: "Bàn phím cơ, tay cầm chơi game và tai nghe." }
    ],
    correctAnswer: "A",
    point: 0.25,
    explanation: "Giao diện đồ họa sử dụng các thành phần trực quan như cửa sổ và biểu tượng, thường được thao tác bằng chuột."
  },
  {
    id: "p1_6",
    content: "Để hiển thị bảng chọn gồm các lệnh có thể thực hiện đối với một đối tượng trên máy tính, người dùng thực hiện thao tác nào?",
    options: [
      { key: "A", text: "Nháy đúp chuột vào đối tượng." },
      { key: "B", text: "Nháy nút phải chuột vào đối tượng." },
      { key: "C", text: "Nháy nút trái chuột hai lần." },
      { key: "D", text: "Kéo thả đối tượng đến vị trí mới." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Nháy nút phải chuột thường mở bảng chọn ngữ cảnh với các lệnh dành cho đối tượng."
  },
  {
    id: "p1_7",
    content: "Tiện ích nào của hệ điều hành máy tính cá nhân có chức năng kiểm tra và khử các lỗi trên đĩa cứng?",
    options: [
      { key: "A", text: "Tiện ích hợp mảnh (Optimize)." },
      { key: "B", text: "Tiện ích kiểm tra đĩa (Check disk)." },
      { key: "C", text: "Tiện ích nén tệp dữ liệu." },
      { key: "D", text: "Tiện ích gõ tiếng Việt." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Check disk kiểm tra hệ thống tệp và tìm lỗi trên ổ đĩa."
  },
  {
    id: "p1_8",
    content: "Theo sách giáo khoa, mỗi cung (sector) trên đĩa cứng chứa bao nhiêu byte dữ liệu?",
    options: [
      { key: "A", text: "128 byte." },
      { key: "B", text: "256 byte." },
      { key: "C", text: "512 byte." },
      { key: "D", text: "1024 byte." }
    ],
    correctAnswer: "C",
    point: 0.25,
    explanation: "Theo nội dung câu hỏi trong sách giáo khoa, một sector chứa 512 byte dữ liệu."
  },
  {
    id: "p1_9",
    content: "Trong hệ điều hành Windows, để kiểm tra và khắc phục lỗi đĩa cứng, người dùng truy cập vào thẻ nào trong cửa sổ Properties của ổ đĩa?",
    options: [
      { key: "A", text: "Thẻ General." },
      { key: "B", text: "Thẻ Tools." },
      { key: "C", text: "Thẻ Hardware." },
      { key: "D", text: "Thẻ Security." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Thẻ Tools trong cửa sổ Properties có các công cụ kiểm tra và tối ưu hóa ổ đĩa."
  },
  {
    id: "p1_10",
    content: "Tiện ích nào sau đây là tiện ích cơ bản được cung cấp trên hệ điều hành thiết bị di động?",
    options: [
      { key: "A", text: "Quản lý danh bạ và hẹn giờ." },
      { key: "B", text: "Quản trị cơ sở dữ liệu quan hệ." },
      { key: "C", text: "Lập trình và thiết kế mạch logic." },
      { key: "D", text: "Kiểm tra lỗi vật lý đĩa cứng HDD." }
    ],
    correctAnswer: "A",
    point: 0.25,
    explanation: "Quản lý danh bạ và hẹn giờ là các tiện ích cơ bản thường có trên thiết bị di động."
  },
  {
    id: "p1_11",
    content: "Tại sao sau một thời gian sử dụng, các tệp dữ liệu lưu trữ trên đĩa cứng (HDD) thường xuất hiện hiện tượng bị phân mảnh?",
    options: [
      { key: "A", text: "Do các tệp dữ liệu bị vi-rút tấn công và làm hư hỏng cấu trúc lưu trữ." },
      { key: "B", text: "Do hệ điều hành ghi các phần của cùng một tệp vào nhiều vùng trống nằm rải rác trên các đường ghi khác nhau." },
      { key: "C", text: "Do đầu đọc của đĩa cứng bị lệch cơ học khiến các cung dữ liệu bị mất liên kết." },
      { key: "D", text: "Do đĩa cứng tự động nén dữ liệu lại khi dung lượng lưu trữ vượt quá giới hạn." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Khi không có vùng trống liên tục đủ lớn, các phần của tệp có thể được lưu ở nhiều vị trí rải rác trên đĩa."
  },
  {
    id: "p1_12",
    content: "Tiện ích hợp mảnh (Optimize) trên hệ điều hành mang lại lợi ích gì cho quá trình vận hành của đĩa cứng?",
    options: [
      { key: "A", text: "Giúp tăng dung lượng lưu trữ vật lý của đĩa cứng lên gấp đôi." },
      { key: "B", text: "Sắp xếp lại các liên cung của tệp nằm liên tục, giúp giảm sự di chuyển đầu từ và tăng tốc độ truy xuất dữ liệu." },
      { key: "C", text: "Tự động sao lưu toàn bộ dữ liệu trên đĩa cứng lên hệ thống lưu trữ đám mây." },
      { key: "D", text: "Sửa chữa hoàn toàn các hư hỏng vật lý ở các cung bị lỗi (bad sector)." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Optimize sắp xếp các phần dữ liệu phân mảnh để giảm thời gian đầu từ tìm kiếm dữ liệu trên HDD."
  },
  {
    id: "p1_13",
    content: "Trong trường hợp nào người dùng nên chạy tiện ích Kiểm tra đĩa (Check disk) của hệ điều hành?",
    options: [
      { key: "A", text: "Khi muốn tìm kiếm và gỡ bỏ các phần mềm chạy ngầm chiếm nhiều bộ nhớ RAM." },
      { key: "B", text: "Khi đĩa cứng xảy ra sự cố mất liên kết dữ liệu hoặc xuất hiện các cung bị lỗi vật lý (bad sector)." },
      { key: "C", text: "Khi hệ điều hành yêu cầu cập nhật phiên bản mới từ nhà sản xuất." },
      { key: "D", text: "Khi độ phân giải hiển thị của màn hình bị thay đổi đột ngột." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Check disk được dùng để kiểm tra lỗi hệ thống tệp và các vấn đề trên ổ đĩa."
  },
  {
    id: "p1_14",
    content: "Để mở cửa sổ chứa công cụ kiểm tra lỗi và tối ưu hoá đĩa cứng trong hệ điều hành Windows, người dùng thực hiện các thao tác nào?",
    options: [
      { key: "A", text: "Mở File Explorer, nháy nút phải chuột vào ổ đĩa muốn xử lý, chọn Properties rồi chọn thẻ Tools." },
      { key: "B", text: "Mở cửa sổ Task Manager, chuyển sang thẻ Performance rồi chọn mục Disk Cleaning." },
      { key: "C", text: "Nháy đúp chuột vào biểu tượng Recycle Bin trên màn hình nền rồi chọn mục Disk Optimizer." },
      { key: "D", text: "Nhấn tổ hợp phím Ctrl + Alt + Delete rồi chọn thẻ System Diagnostics." }
    ],
    correctAnswer: "A",
    point: 0.25,
    explanation: "Các công cụ kiểm tra và tối ưu ổ đĩa được mở từ Properties của ổ đĩa, tại thẻ Tools."
  },
  {
    id: "p1_15",
    content: "Việc sử dụng tiện ích \"Quản lý ứng dụng\" trên hệ điều hành di động (Android, iOS) giúp ích gì cho người dùng?",
    options: [
      { key: "A", text: "Tự động tăng dung lượng bộ nhớ trong RAM của thiết bị di động." },
      { key: "B", text: "Cho phép xem danh sách ứng dụng đã cài đặt và xóa bỏ các ứng dụng không cần thiết để giải phóng bộ nhớ." },
      { key: "C", text: "Giúp nâng cấp tốc độ xử lý của vi xử lý CPU trên điện thoại." },
      { key: "D", text: "Tự động ngắt kết nối Wi-Fi khi điện thoại ở trạng thái chờ." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Quản lý ứng dụng cho phép xem và gỡ ứng dụng không cần thiết, giúp giải phóng dung lượng lưu trữ."
  },
  {
    id: "p1_16",
    content: "Phần mềm được cung cấp cả mã nguồn để người dùng có thể tự sửa đổi, cải tiến và phân phối lại theo quy định gọi là loại phần mềm nào?",
    options: [
      { key: "A", text: "Phần mềm thương mại." },
      { key: "B", text: "Phần mềm đóng gói." },
      { key: "C", text: "Phần mềm nguồn mở." },
      { key: "D", text: "Phần mềm đặt hàng." }
    ],
    correctAnswer: "C",
    point: 0.25,
    explanation: "Phần mềm nguồn mở cung cấp mã nguồn và cho phép sửa đổi, phân phối theo các điều khoản giấy phép."
  },
  {
    id: "p1_17",
    content: "Giấy phép công cộng nào sau đây được áp dụng rộng rãi nhất đối với phần mềm nguồn mở?",
    options: [
      { key: "A", text: "GNU GPL." },
      { key: "B", text: "MS DOS." },
      { key: "C", text: "HTML5." },
      { key: "D", text: "ISO 9001." }
    ],
    correctAnswer: "A",
    point: 0.25,
    explanation: "GNU GPL là một giấy phép phần mềm tự do và nguồn mở được sử dụng rộng rãi."
  },
  {
    id: "p1_18",
    content: "Phần mềm nào sau đây là ví dụ về phần mềm thương mại đóng gói?",
    options: [
      { key: "A", text: "GIMP." },
      { key: "B", text: "Inkscape." },
      { key: "C", text: "Microsoft Word." },
      { key: "D", text: "LibreOffice Writer." }
    ],
    correctAnswer: "C",
    point: 0.25,
    explanation: "Microsoft Word là phần mềm thương mại đóng gói."
  },
  {
    id: "p1_19",
    content: "Phần mềm chạy trên Internet (phần mềm trực tuyến) có đặc điểm cơ bản nào sau đây?",
    options: [
      { key: "A", text: "Bắt buộc người dùng phải mua bản quyền trước khi tải về máy." },
      { key: "B", text: "Cho phép sử dụng trực tiếp qua Internet mà không cần cài đặt vào máy tính." },
      { key: "C", text: "Yêu cầu máy tính phải cài đặt hệ điều hành Linux mới có thể chạy được." },
      { key: "D", text: "Chỉ hoạt động được khi máy tính hoàn toàn không có kết nối mạng." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Phần mềm trực tuyến thường được truy cập và sử dụng qua Internet, không cần cài đặt như phần mềm truyền thống."
  },
  {
    id: "p1_20",
    content: "Ứng dụng trực tuyến nào sau đây của Google cung cấp chức năng soạn thảo văn bản chạy trên Internet?",
    options: [
      { key: "A", text: "Google Sheets." },
      { key: "B", text: "Google Docs." },
      { key: "C", text: "Google Slides." },
      { key: "D", text: "Google Drive." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Google Docs là ứng dụng trực tuyến của Google dùng để soạn thảo văn bản."
  },
  {
    id: "p1_21",
    content: "Ưu điểm chính của phần mềm nguồn mở so với phần mềm thương mại nguồn đóng về mặt kiểm soát công nghệ và tính phụ thuộc là gì?",
    options: [
      { key: "A", text: "Người dùng hoàn toàn không bị lệ thuộc vào một nhà cung cấp duy nhất vì có mã nguồn mở và cộng đồng cùng phát triển." },
      { key: "B", text: "Người dùng được nhà sản xuất cam kết bảo hành và hỗ trợ kỹ thuật trực tiếp 24/7." },
      { key: "C", text: "Phần mềm nguồn mở luôn có nhiều tính năng độc quyền hơn phần mềm thương mại." },
      { key: "D", text: "Người dùng không cần phải tuân thủ bất kỳ điều khoản hay giấy phép sử dụng nào." }
    ],
    correctAnswer: "A",
    point: 0.25,
    explanation: "Mã nguồn mở và cộng đồng phát triển giúp người dùng có thêm khả năng kiểm soát, giảm phụ thuộc vào một nhà cung cấp."
  },
  {
    id: "p1_22",
    content: "Quy định \"bản sửa đổi của một phần mềm nguồn mở theo giấy phép GNU GPL cũng phải được công bố mã nguồn và phát triển dựa trên giấy phép GNU GPL\" có ý nghĩa gì?",
    options: [
      { key: "A", text: "Nhằm ngăn cấm người dùng không được phép chỉnh sửa mã nguồn ban đầu của tác giả." },
      { key: "B", text: "Nhằm đảm bảo sự phát triển bền vững của phần mềm nguồn mở và giữ cho các phiên bản cải tiến luôn mở cho cộng đồng." },
      { key: "C", text: "Nhằm giúp tác giả ban đầu thu lại phí bản quyền từ những người phát triển bản cải tiến." },
      { key: "D", text: "Nhằm bắt buộc người sử dụng phải chuyển phần mềm nguồn mở thành phần mềm thương mại đóng gói." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Quy định này giữ cho các bản sửa đổi và phát triển tiếp theo tiếp tục được chia sẻ theo giấy phép nguồn mở."
  },
  {
    id: "p1_23",
    content: "So với phần mềm cài đặt truyền thống trên máy tính, phần mềm chạy trên Internet (như Google Docs, Google Sheets) mang lại lợi ích nổi bật nào sau đây?",
    options: [
      { key: "A", text: "Hoạt động bình thường và ổn định ngay cả khi máy tính bị mất hoàn toàn kết nối Internet." },
      { key: "B", text: "Người dùng có thể sử dụng trực tiếp trên trình duyệt ở bất kỳ đâu, trên bất kỳ thiết bị nào có kết nối Internet mà không cần cài đặt." },
      { key: "C", text: "Tự động bảo vệ máy tính khỏi tất cả các loại phần mềm độc hại và vi-rút." },
      { key: "D", text: "Không cần tài khoản đăng nhập hay bất kỳ phương thức xác thực người dùng nào." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Phần mềm trực tuyến có thể được truy cập qua trình duyệt trên các thiết bị có kết nối Internet mà không cần cài đặt."
  },
  {
    id: "p1_24",
    content: "Phát biểu nào sau đây giải thích đúng về mối quan hệ giữa phần mềm thương mại và phần mềm nguồn mở trong thực tế?",
    options: [
      { key: "A", text: "Phần mềm nguồn mở sẽ hoàn toàn thay thế phần mềm thương mại trong tương lai gần." },
      { key: "B", text: "Phần mềm thương mại và phần mềm nguồn mở song song tồn tại, bổ sung cho nhau để đáp ứng các nhu cầu đa dạng của người dùng." },
      { key: "C", text: "Phần mềm thương mại không bao giờ có chất lượng bằng phần mềm nguồn mở do không được công khai mã nguồn." },
      { key: "D", text: "Tất cả phần mềm nguồn mở đều là phần mềm thương mại được bán với giá rẻ." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Hai loại phần mềm có thể cùng tồn tại và đáp ứng những nhu cầu, điều kiện sử dụng khác nhau."
  },
  {
    id: "p1_25",
    content: "Vì sao hầu hết các phần mềm thương mại lại được cung cấp dưới dạng \"mã máy\" (nguồn đóng) mà không cung cấp mã nguồn?",
    options: [
      { key: "A", text: "Vì mã máy giúp phần mềm chạy chậm hơn để tiết kiệm bộ nhớ máy tính." },
      { key: "B", text: "Vì để bảo vệ ý tưởng sáng tạo, bản quyền và chống việc tự ý sửa đổi sản phẩm của nhà sản xuất." },
      { key: "C", text: "Vì mã máy là dạng văn bản gần với ngôn ngữ tự nhiên nên người dùng dễ đọc hơn." },
      { key: "D", text: "Vì hệ điều hành chỉ chấp nhận cài đặt các phần mềm nguồn mở." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Nhà sản xuất thường giữ kín mã nguồn để bảo vệ sản phẩm, bản quyền và quyền kiểm soát việc sửa đổi."
  },
  {
    id: "p1_26",
    content: "Tất cả các thiết bị bên trong thân máy tính như CPU, RAM, ổ đĩa cứng đều được gắn trên bảng mạch nào?",
    options: [
      { key: "A", text: "Bảng mạch mở rộng." },
      { key: "B", text: "Bảng mạch chính (mainboard)." },
      { key: "C", text: "Bảng mạch đồ họa." },
      { key: "D", text: "Bảng mạch điều khiển mạng." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Mainboard là bảng mạch chính kết nối các linh kiện quan trọng trong máy tính."
  },
  {
    id: "p1_27",
    content: "Bộ phận nào trong CPU đảm nhận nhiệm vụ thực hiện tất cả các phép tính số học và logic trong máy tính?",
    options: [
      { key: "A", text: "Bộ điều khiển (CU)." },
      { key: "B", text: "Bộ số học và logic (ALU)." },
      { key: "C", text: "Bộ nhớ đệm (Cache)." },
      { key: "D", text: "Thanh ghi (Register)." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "ALU thực hiện các phép toán số học và logic trong CPU."
  },
  {
    id: "p1_28",
    content: "Bộ phận nào trong CPU có chức năng phối hợp đồng bộ các thiết bị của máy tính, đảm bảo máy tính thực hiện đúng chương trình?",
    options: [
      { key: "A", text: "Bộ điều khiển (Control Unit - CU)." },
      { key: "B", text: "Bộ số học và logic (Arithmetic & Logic Unit - ALU)." },
      { key: "C", text: "Bộ nhớ ngoài." },
      { key: "D", text: "Bộ nhớ truy cập ngẫu nhiên (RAM)." }
    ],
    correctAnswer: "A",
    point: 0.25,
    explanation: "CU điều khiển và phối hợp hoạt động của các bộ phận máy tính theo lệnh chương trình."
  },
  {
    id: "p1_29",
    content: "Đơn vị nào sau đây thường được dùng để đo tốc độ (tần số đồng hồ xung) của CPU?",
    options: [
      { key: "A", text: "Gigabyte (GB)." },
      { key: "B", text: "Megabyte (MB)." },
      { key: "C", text: "Gigahertz (GHz)." },
      { key: "D", text: "Dots per inch (dpi)." }
    ],
    correctAnswer: "C",
    point: 0.25,
    explanation: "Tần số xung nhịp CPU thường được biểu thị bằng hertz, phổ biến là gigahertz (GHz)."
  },
  {
    id: "p1_30",
    content: "Bộ nhớ RAM có đặc điểm nào sau đây trong quá trình máy tính hoạt động?",
    options: [
      { key: "A", text: "Chỉ cho phép đọc dữ liệu mà không thể ghi thêm dữ liệu mới." },
      { key: "B", text: "Dữ liệu lưu trong RAM vẫn được giữ lại lâu dài sau khi tắt máy." },
      { key: "C", text: "Là bộ nhớ có thể đọc và ghi, dữ liệu tạm thời trong RAM sẽ bị xóa khi tắt máy." },
      { key: "D", text: "Là bộ nhớ ngoài có dung lượng lưu trữ lên tới hàng Terabyte." }
    ],
    correctAnswer: "C",
    point: 0.25,
    explanation: "RAM là bộ nhớ khả biến có thể đọc và ghi; dữ liệu trong RAM mất khi ngắt nguồn điện."
  },
  {
    id: "p1_31",
    content: "Bộ nhớ ROM có đặc điểm cơ bản nào sau đây?",
    options: [
      { key: "A", text: "Dữ liệu trong ROM bị mất toàn bộ khi ngừng cấp nguồn điện." },
      { key: "B", text: "Dữ liệu chỉ có thể đọc mà không thể ghi hay xóa thông thường, không bị mất khi tắt máy." },
      { key: "C", text: "Là vùng nhớ đệm nằm hoàn toàn bên trong chip CPU." },
      { key: "D", text: "Cho phép người dùng tùy ý ghi mới và xóa dữ liệu hàng ngày." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "ROM là bộ nhớ phi khả biến, giữ dữ liệu khi tắt máy và thông thường không cho phép ghi, xóa tùy ý."
  },
  {
    id: "p1_32",
    content: "Phép nhân logic (phép AND) giữa hai đại lượng x và y chỉ cho kết quả bằng 1 khi nào?",
    options: [
      { key: "A", text: "Khi có ít nhất một trong hai đại lượng x hoặc y bằng 1." },
      { key: "B", text: "Khi cả hai đại lượng x và y đều bằng 1." },
      { key: "C", text: "Khi cả hai đại lượng x và y đều bằng 0." },
      { key: "D", text: "Khi hai đại lượng x và y có giá trị trái ngược nhau." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Phép AND chỉ cho kết quả 1 khi tất cả các đầu vào đều bằng 1."
  },
  {
    id: "p1_33",
    content: "Phép cộng logic (phép OR) giữa hai đại lượng x và y cho kết quả bằng 1 khi nào?",
    options: [
      { key: "A", text: "Khi ít nhất một trong hai đại lượng x hoặc y bằng 1." },
      { key: "B", text: "Chỉ khi cả hai đại lượng x và y cùng bằng 1." },
      { key: "C", text: "Chỉ khi cả hai đại lượng x và y cùng bằng 0." },
      { key: "D", text: "Khi cả hai đại lượng x và y đều có giá trị âm." }
    ],
    correctAnswer: "A",
    point: 0.25,
    explanation: "Phép OR cho kết quả 1 nếu có ít nhất một đầu vào bằng 1."
  },
  {
    id: "p1_34",
    content: "Phép phủ định logic (phép NOT) cho kết quả như thế nào đối với giá trị đầu vào?",
    options: [
      { key: "A", text: "Luôn cho kết quả bằng 0 trong mọi trường hợp." },
      { key: "B", text: "Luôn cho kết quả bằng 1 trong mọi trường hợp." },
      { key: "C", text: "Cho kết quả trùng khớp hoàn toàn với giá trị đầu vào." },
      { key: "D", text: "Cho kết quả ngược lại với giá trị đầu vào (đảo 0 thành 1 và 1 thành 0)." }
    ],
    correctAnswer: "D",
    point: 0.25,
    explanation: "NOT đảo giá trị logic đầu vào: 0 thành 1 và 1 thành 0."
  },
  {
    id: "p1_35",
    content: "Mọi mạch logic phức tạp trong thiết bị số đều có thể được xây dựng kết hợp từ những cổng logic cơ bản nào?",
    options: [
      { key: "A", text: "Cổng AND, OR và NOT." },
      { key: "B", text: "Cổng USB, HDMI và VGA." },
      { key: "C", text: "Cổng LAN, Switch và Router." },
      { key: "D", text: "Cổng SATA, PCI và Bus." }
    ],
    correctAnswer: "A",
    point: 0.25,
    explanation: "Các cổng AND, OR và NOT là những cổng logic cơ bản dùng để xây dựng mạch logic."
  },
  {
    id: "p1_36",
    content: "Khi tắt nguồn điện của máy tính, dữ liệu đang xử lý lưu trong bộ nhớ RAM bị mất đi nhưng dữ liệu lưu trong bộ nhớ ROM vẫn còn nguyên vẹn. Phát biểu nào sau đây giải thích đúng về nguyên nhân của hiện tượng này?",
    options: [
      { key: "A", text: "RAM là bộ nhớ chỉ đọc còn ROM là bộ nhớ có thể đọc và ghi." },
      { key: "B", text: "RAM là bộ nhớ khả biến phụ thuộc vào nguồn điện nuôi, còn ROM là bộ nhớ phi khả biến giữ lại dữ liệu kể cả khi mất điện." },
      { key: "C", text: "RAM nằm hoàn toàn bên ngoài máy tính còn ROM nằm trên bảng mạch chính." },
      { key: "D", text: "RAM có dung lượng lưu trữ lớn hơn ROM rất nhiều lần nên khó giữ dữ liệu hơn." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "RAM cần nguồn điện để duy trì dữ liệu, trong khi ROM giữ dữ liệu ngay cả khi máy tính mất điện."
  },
  {
    id: "p1_37",
    content: "Thông số tần số xung nhịp của CPU (được đo bằng đơn vị GHz) thể hiện điều nào sau đây?",
    options: [
      { key: "A", text: "Dung lượng dữ liệu tối đa mà CPU có thể lưu trữ tạm thời khi tính toán." },
      { key: "B", text: "Số lượng phép tính hoặc chu kỳ xử lý mà CPU có thể thực hiện được trong một giây." },
      { key: "C", text: "Tốc độ truyền dữ liệu qua mạng Internet của máy tính." },
      { key: "D", text: "Kích thước vật lý và số lượng chân cắm của vi xử lý trên bảng mạch chính." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Tần số xung nhịp cho biết số chu kỳ đồng hồ CPU thực hiện trong một giây."
  },
  {
    id: "p1_38",
    content: "Xét biểu thức logic z = x AND y. Khi nào giá trị của z nhận giá trị bằng 0?",
    options: [
      { key: "A", text: "Chỉ khi cả x và y đều bằng 0." },
      { key: "B", text: "Khi có ít nhất một trong hai đại lượng x hoặc y nhận giá trị 0." },
      { key: "C", text: "Chỉ khi x bằng 1 và y bằng 0." },
      { key: "D", text: "Khi cả x và y đều nhận giá trị bằng 1." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Phép AND chỉ cho kết quả 1 khi cả hai đầu vào bằng 1; do đó, kết quả bằng 0 nếu có đầu vào bằng 0."
  },
  {
    id: "p1_39",
    content: "Sự phối hợp giữa Bộ điều khiển (CU) và Bộ số học và logic (ALU) trong CPU khi thực hiện một lệnh của chương trình diễn ra như thế nào?",
    options: [
      { key: "A", text: "ALU giải mã lệnh và điều phối thiết bị, sau đó truyền kết quả cho CU thực hiện tính toán." },
      { key: "B", text: "CU giải mã lệnh và gửi tín hiệu điều khiển, còn ALU trực tiếp nhận dữ liệu và thực hiện các phép tính số học hoặc logic." },
      { key: "C", text: "Cả CU và ALU đều cùng thực hiện phép tính số học một cách độc lập để tăng tốc độ." },
      { key: "D", text: "ALU lưu trữ dữ liệu lâu dài còn CU xóa toàn bộ dữ liệu sau khi tính xong." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "CU giải mã và điều phối việc thực hiện lệnh; ALU thực hiện các phép toán số học và logic."
  },
  {
    id: "p1_40",
    content: "Cho một mạch logic gồm cổng NOT kết nối với đầu vào x, sau đó đầu ra của cổng NOT cùng với đầu vào y được đưa vào cổng OR. Mạch logic này cho kết quả đầu ra bằng 0 khi nào?",
    options: [
      { key: "A", text: "Khi x = 0 và y = 0." },
      { key: "B", text: "Khi x = 1 và y = 0." },
      { key: "C", text: "Khi x = 0 và y = 1." },
      { key: "D", text: "Khi x = 1 và y = 1." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Đầu ra là (NOT x) OR y. Kết quả bằng 0 khi NOT x = 0 và y = 0, tức là x = 1 và y = 0."
  },
  {
    id: "p1_41",
    content: "Kích thước màn hình của các thiết bị số như máy tính hay điện thoại thường được đo bằng đơn vị nào và tính theo đường nào của màn hình?",
    options: [
      { key: "A", text: "Đo bằng centimet và tính theo chiều rộng." },
      { key: "B", text: "Đo bằng inch và tính theo đường chéo." },
      { key: "C", text: "Đo bằng pixel và tính theo chiều cao." },
      { key: "D", text: "Đo bằng mm và tính theo chu vi." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Kích thước màn hình thường được đo bằng inch theo đường chéo."
  },
  {
    id: "p1_42",
    content: "Độ phân giải của màn hình hiển thị (ví dụ 1920 x 1080) được xác định bằng yếu tố nào?",
    options: [
      { key: "A", text: "Tổng số màu sắc mà màn hình có thể hiển thị." },
      { key: "B", text: "Số lượng điểm ảnh (pixel) hiển thị theo chiều ngang và chiều dọc." },
      { key: "C", text: "Dung lượng bộ nhớ đệm tích hợp của màn hình." },
      { key: "D", text: "Tần số làm mới hình ảnh trong một giây." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Độ phân giải biểu thị số điểm ảnh theo chiều ngang và chiều dọc của màn hình."
  },
  {
    id: "p1_43",
    content: "Đơn vị Megapixel (MP) thường được sử dụng để đo thông số kỹ thuật nào của camera trên các thiết bị số?",
    options: [
      { key: "A", text: "Tốc độ chụp ảnh." },
      { key: "B", text: "Dung lượng bộ nhớ trong của camera." },
      { key: "C", text: "Độ phân giải của hình ảnh do camera thu được." },
      { key: "D", text: "Kích thước ống kính camera." }
    ],
    correctAnswer: "C",
    point: 0.25,
    explanation: "Megapixel biểu thị số lượng điểm ảnh và thường được dùng để mô tả độ phân giải hình ảnh."
  },
  {
    id: "p1_44",
    content: "Cổng kết nối nào sau đây vừa truyền tải được tín hiệu hình ảnh chất lượng cao vừa truyền tải được tín hiệu âm thanh từ máy tính ra thiết bị ngoại vi?",
    options: [
      { key: "A", text: "Cổng VGA." },
      { key: "B", text: "Cổng HDMI." },
      { key: "C", text: "Cổng USB 2.0." },
      { key: "D", text: "Cổng Audio 3.5mm." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "HDMI truyền đồng thời tín hiệu hình ảnh và âm thanh dạng số."
  },
  {
    id: "p1_45",
    content: "Cổng kết nối VGA trên máy tính thường được sử dụng để truyền tải loại tín hiệu nào?",
    options: [
      { key: "A", text: "Tín hiệu âm thanh vòm kỹ thuật số." },
      { key: "B", text: "Tín hiệu hình ảnh dạng tương tự (Analog) ra màn hình hoặc máy chiếu." },
      { key: "C", text: "Tín hiệu kết nối mạng Internet tốc độ cao." },
      { key: "D", text: "Tín hiệu nguồn điện sạc cho thiết bị di động." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "VGA truyền tín hiệu hình ảnh dạng tương tự đến màn hình hoặc máy chiếu."
  },
  {
    id: "p1_46",
    content: "Phần mềm chuyên dụng giúp hệ điều hành nhận biết và điều khiển thiết bị ngoại vi khi kết nối với máy tính được gọi là gì?",
    options: [
      { key: "A", text: "Trình soạn thảo văn bản." },
      { key: "B", text: "Trình duyệt web." },
      { key: "C", text: "Trình điều khiển thiết bị (Driver)." },
      { key: "D", text: "Hệ quản trị cơ sở dữ liệu." }
    ],
    correctAnswer: "C",
    point: 0.25,
    explanation: "Driver giúp hệ điều hành giao tiếp và điều khiển thiết bị phần cứng."
  },
  {
    id: "p1_47",
    content: "Phương thức kết nối không dây tầm ngắn nào sau đây thường được sử dụng để truyền dữ liệu hoặc kết nối tai nghe, chuột với máy tính và điện thoại?",
    options: [
      { key: "A", text: "Kết nối cáp quang." },
      { key: "B", text: "Kết nối Bluetooth." },
      { key: "C", text: "Kết nối cổng COM." },
      { key: "D", text: "Kết nối cổng Ethernet." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Bluetooth là kết nối không dây tầm ngắn thường dùng với tai nghe, chuột và các thiết bị khác."
  },
  {
    id: "p1_48",
    content: "Khi kết nối điện thoại thông minh với máy tính qua cáp USB, để máy tính có thể truy cập và sao chép tệp tin từ điện thoại, người dùng cần chọn chế độ nào trên điện thoại?",
    options: [
      { key: "A", text: "Chế độ \"Chỉ sạc\" (Charging only)." },
      { key: "B", text: "Chế độ \"Truyền tệp\" (File Transfer / MTP)." },
      { key: "C", text: "Chế độ \"Máy bay\" (Airplane mode)." },
      { key: "D", text: "Chế độ \"Tiết kiệm pin\" (Battery saver)." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Chế độ File Transfer/MTP cho phép máy tính truy cập và truyền tệp với điện thoại."
  },
  {
    id: "p1_49",
    content: "Chuẩn kết nối không dây nào cho phép máy tính và các thiết bị di động truy cập mạng Internet thông qua trạm phát sóng trong phạm vi mạng cục bộ?",
    options: [
      { key: "A", text: "Bluetooth." },
      { key: "B", text: "Wi-Fi." },
      { key: "C", text: "USB." },
      { key: "D", text: "HDMI." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Wi-Fi kết nối thiết bị với mạng cục bộ và cho phép truy cập Internet qua điểm truy cập không dây."
  },
  {
    id: "p1_50",
    content: "Thiết bị số nào sau đây đóng vai trò là thiết bị ra (Output device) của hệ thống máy tính?",
    options: [
      { key: "A", text: "Bàn phím (Keyboard)." },
      { key: "B", text: "Con trỏ chuột (Mouse)." },
      { key: "C", text: "Máy in (Printer)." },
      { key: "D", text: "Micro (Microphone)." }
    ],
    correctAnswer: "C",
    point: 0.25,
    explanation: "Máy in là thiết bị ra vì xuất thông tin từ máy tính lên giấy."
  },
  {
    id: "p1_51",
    content: "Sự khác nhau cơ bản giữa cổng VGA và cổng HDMI khi truyền tải dữ liệu từ máy tính ra màn hình hoặc máy chiếu là gì?",
    options: [
      { key: "A", text: "Cổng VGA chỉ truyền tín hiệu âm thanh, còn cổng HDMI truyền được cả hình ảnh và âm thanh." },
      { key: "B", text: "Cổng VGA truyền tín hiệu hình ảnh dạng tương tự (analog) không kèm âm thanh, còn cổng HDMI truyền tín hiệu số (digital) bao gồm cả hình ảnh và âm thanh." },
      { key: "C", text: "Cổng VGA truyền tín hiệu số với tốc độ cao hơn cổng HDMI." },
      { key: "D", text: "Cổng HDMI chỉ dùng để kết nối với chuột và bàn phím, còn cổng VGA dùng để xuất hình ảnh." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "VGA truyền hình ảnh analog, còn HDMI truyền hình ảnh và âm thanh digital."
  },
  {
    id: "p1_52",
    content: "Tại sao khi sử dụng chuột máy tính, người dùng cần tùy chỉnh lại tốc độ di chuyển của con trỏ chuột trong hệ điều hành?",
    options: [
      { key: "A", text: "Để thay đổi độ phân giải điểm ảnh của màn hình hiển thị." },
      { key: "B", text: "Để giúp tỉ lệ di chuyển con trỏ chuột trên màn hình phù hợp với khoảng cách di chuyển tay, thuận tiện và chính xác khi thao tác." },
      { key: "C", text: "Để tăng dung lượng bộ nhớ đệm của hệ điều hành." },
      { key: "D", text: "Để chuột có thể tự động kết nối không dây qua Bluetooth mà không cần ghép đôi." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Điều chỉnh tốc độ giúp con trỏ di chuyển phù hợp với thao tác tay, tăng sự thuận tiện và chính xác."
  },
  {
    id: "p1_53",
    content: "Khi kết nối máy ảnh số hoặc điện thoại thông minh với máy tính qua cáp USB, màn hình thiết bị xuất hiện thông báo \"USB Mode, Mass Storage\" có ý nghĩa gì?",
    options: [
      { key: "A", text: "Điện thoại chỉ đang nhận nguồn điện sạc từ máy tính mà không cho phép trao đổi dữ liệu." },
      { key: "B", text: "Máy tính nhận thiết bị số như một bộ nhớ ngoài, cho phép người dùng truy cập tệp tin và thư mục dữ liệu trên thiết bị." },
      { key: "C", text: "Máy tính đang tự động cài đặt hệ điều hành mới cho thiết bị số." },
      { key: "D", text: "Thiết bị số đang chia sẻ kết nối mạng Internet không dây cho máy tính." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Mass Storage cho phép máy tính nhận thiết bị như bộ nhớ ngoài để truy cập tệp và thư mục."
  },
  {
    id: "p1_54",
    content: "Điểm khác biệt quan trọng khi kết nối hai thiết bị qua Bluetooth so với kết nối qua sóng Wi-Fi trong mạng cục bộ là gì?",
    options: [
      { key: "A", text: "Kết nối Bluetooth có phạm vi truyền sóng xa hơn kết nối Wi-Fi rất nhiều." },
      { key: "B", text: "Bluetooth là phương thức kết nối không dây tầm ngắn (thường dưới 10m) và tại một thời điểm, mỗi thiết bị chỉ kết nối Bluetooth trực tiếp với một thiết bị khác." },
      { key: "C", text: "Bluetooth không đòi hỏi các thiết bị phải ghép đôi trước khi truyền dữ liệu." },
      { key: "D", text: "Wi-Fi chỉ truyền được tín hiệu âm thanh còn Bluetooth truyền được mọi loại dữ liệu." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Bluetooth thường dùng cho kết nối trực tiếp tầm ngắn giữa các thiết bị."
  },
  {
    id: "p1_55",
    content: "Tại sao việc đọc kỹ tài liệu hướng dẫn kỹ thuật của nhà sản xuất lại quan trọng khi kết nối một thiết bị số mới với máy tính?",
    options: [
      { key: "A", text: "Vì mọi thiết bị số đều bắt buộc phải dùng chung một phương thức kết nối duy nhất." },
      { key: "B", text: "Vì tài liệu hướng dẫn giúp người dùng hiểu rõ các thông số kỹ thuật, cách cắm nối chính xác và cách thiết lập các tham số cấu hình phù hợp." },
      { key: "C", text: "Vì tài liệu hướng dẫn cung cấp mã nguồn mở của hệ điều hành máy tính." },
      { key: "D", text: "Vì nếu không đọc tài liệu thì máy tính sẽ tự động xóa toàn bộ dữ liệu trên đĩa cứng." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Tài liệu hướng dẫn cung cấp thông tin cần thiết để kết nối và cấu hình thiết bị đúng cách."
  },
  {
    id: "p1_56",
    content: "Dịch vụ lưu trữ và chia sẻ tệp tin trên Internet còn được gọi bằng tên gọi nào khác?",
    options: [
      { key: "A", text: "Dịch vụ lưu trữ đám mây." },
      { key: "B", text: "Dịch vụ thư điện tử." },
      { key: "C", text: "Dịch vụ mạng xã hội." },
      { key: "D", text: "Dịch vụ tìm kiếm trực tuyến." }
    ],
    correctAnswer: "A",
    point: 0.25,
    explanation: "Dịch vụ lưu trữ và chia sẻ tệp qua Internet thường được gọi là dịch vụ lưu trữ đám mây."
  },
  {
    id: "p1_57",
    content: "Khi sử dụng ổ đĩa trực tuyến Google Drive, nhà cung cấp nào là đơn vị phát triển và cung cấp dịch vụ này?",
    options: [
      { key: "A", text: "Microsoft." },
      { key: "B", text: "Apple." },
      { key: "C", text: "Google." },
      { key: "D", text: "Dropbox." }
    ],
    correctAnswer: "C",
    point: 0.25,
    explanation: "Google Drive là dịch vụ lưu trữ trực tuyến do Google cung cấp."
  },
  {
    id: "p1_58",
    content: "Khi chia sẻ tệp tin trên ổ đĩa trực tuyến, quyền nào cho phép người được chia sẻ thực hiện mọi thao tác như xem, nhận xét, chỉnh sửa, xóa và đổi tên tệp?",
    options: [
      { key: "A", text: "Quyền chỉ xem." },
      { key: "B", text: "Quyền được nhận xét." },
      { key: "C", text: "Quyền chỉnh sửa." },
      { key: "D", text: "Quyền truy cập tự do." }
    ],
    correctAnswer: "C",
    point: 0.25,
    explanation: "Quyền chỉnh sửa cho phép người được chia sẻ sửa đổi nội dung và quản lý tệp trong phạm vi quyền được cấp."
  },
  {
    id: "p1_59",
    content: "Thao tác nào sau đây cho phép đưa tệp dữ liệu từ máy tính cá nhân lên ổ đĩa trực tuyến để lưu trữ?",
    options: [
      { key: "A", text: "Tải tệp xuống." },
      { key: "B", text: "Tải tệp lên." },
      { key: "C", text: "Xóa tệp." },
      { key: "D", text: "Nén tệp." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Tải tệp lên (upload) đưa dữ liệu từ máy tính cá nhân lên dịch vụ trực tuyến."
  },
  {
    id: "p1_60",
    content: "Trong các dịch vụ sau đây, dịch vụ lưu trữ trực tuyến nào do tập đoàn Microsoft cung cấp?",
    options: [
      { key: "A", text: "iCloud." },
      { key: "B", text: "OneDrive." },
      { key: "C", text: "Google Drive." },
      { key: "D", text: "Dropbox." }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "OneDrive là dịch vụ lưu trữ trực tuyến do Microsoft cung cấp."
  }
    // Gợi ý: Thầy/Cô tiếp tục dán câu 13 đến 60 vào đây theo mẫu trên!
  ],

  // =================================================================
  // PHẦN II: 20 CÂU TRẮC NGHIỆM ĐÚNG / SAI (4 câu / đề)
  // Mỗi câu có 4 ý a, b, c, d
  // =================================================================
  part2: [
  {
    id: "p2_1",
    content: "Trong lịch sử phát triển của máy tính cá nhân, giao diện người dùng đã có bước tiến lớn từ giao diện dòng lệnh (CLI) sang giao diện đồ họa (GUI). Hệ điều hành MS-DOS ra đời năm 1981 sử dụng giao diện dòng lệnh, yêu cầu người dùng gõ lệnh trực tiếp bằng văn bản từ bàn phím. Sự xuất hiện của hệ điều hành Windows với giao diện đồ họa GUI cho phép người dùng tương tác thông qua biểu tượng, con trỏ chuột, bảng chọn và các cửa sổ hiển thị.",
    items: [
      { id: "a", text: "MS-DOS là hệ điều hành sử dụng giao diện dòng lệnh (CLI).", isCorrect: true },
      { id: "b", text: "Giao diện đồ họa (GUI) bắt buộc người dùng phải gõ các câu lệnh văn bản bằng bàn phím để khởi chạy ứng dụng.", isCorrect: false },
      { id: "c", text: "Sự phát triển từ giao diện dòng lệnh sang giao diện đồ họa giúp người dùng tương tác với máy tính trực quan hơn và giảm bớt gánh nặng phải ghi nhớ cú pháp câu lệnh.", isCorrect: true },
      { id: "d", text: "Để khắc phục sự cố máy tính bị nhiễm vi-rút làm ẩn biểu tượng trên màn hình Windows, người dùng nên gỡ bỏ hoàn toàn giao diện đồ họa GUI để quay về sử dụng duy nhất giao diện MS-DOS làm môi trường làm việc chính lâu dài.", isCorrect: false }
    ],
    explanation: "Ý (b) Sai vì GUI cho phép tương tác qua biểu tượng, chuột, bảng chọn và cửa sổ. Ý (d) Sai vì quay về MS-DOS không phải cách xử lý phù hợp để khắc phục vi-rút làm ẩn biểu tượng."
  },
  {
    id: "p2_2",
    content: "Hệ điều hành Windows do tập đoàn Microsoft phát triển là hệ điều hành thương mại phổ biến nhất trên máy tính cá nhân. Trải qua các phiên bản như Windows 3.1, Windows 95, Windows XP đến Windows 10, 11, Windows không ngừng hoàn thiện khả năng đa nhiệm và giao diện người dùng. Đặc biệt, từ phiên bản Windows 95, tính năng Plug and Play (PnP - cắm và chạy) đã được tích hợp, giúp hệ điều hành tự động nhận biết thiết bị ngoại vi và cài đặt trình điều khiển (driver) tương ứng.",
    items: [
      { id: "a", text: "Windows là một hệ điều hành thương mại nguồn đóng do tập đoàn Microsoft phát triển.", isCorrect: true },
      { id: "b", text: "Tính năng Plug and Play (PnP) yêu cầu người dùng phải tự lập trình mã nguồn driver mỗi khi cắm thiết bị ngoại vi mới vào máy tính.", isCorrect: false },
      { id: "c", text: "Khả năng đa nhiệm của hệ điều hành Windows giúp máy tính phân chia tài nguyên để vận hành nhiều chương trình ứng dụng cùng một lúc.", isCorrect: true },
      { id: "d", text: "Một người dùng cắm chuột mới vào cổng USB của máy tính nhưng con trỏ chuột không di chuyển; do tính năng PnP luôn tự động giải quyết mọi lỗi nên người dùng chỉ cần cắm đi cắm lại chuột mà không cần kiểm tra trạng thái thiết bị trong Device Manager hay thử kết nối sang cổng USB khác.", isCorrect: false }
    ],
    explanation: "Ý (b) Sai vì PnP giúp tự nhận biết thiết bị và cài đặt driver tương ứng, không yêu cầu người dùng tự lập trình driver. Ý (d) Sai vì PnP không khắc phục được mọi lỗi; cần kiểm tra thiết bị, driver hoặc cổng kết nối."
  },
  {
    id: "p2_3",
    content: "Linux là hệ điều hành nguồn mở do Linus Torvalds phát triển từ năm 1991. Khác với các hệ điều hành thương mại đóng gói, Linux cho phép người dùng truy cập, nghiên cứu, chỉnh sửa và phân phối lại mã nguồn hoàn toàn miễn phí. Do đó, cộng đồng phát triển toàn cầu đã tạo ra nhiều bản phân phối (distribution) nổi tiếng như Ubuntu, Fedora, Debian, Red Hat, phục vụ đa dạng nhu cầu từ máy tính cá nhân đến các hệ thống máy chủ và thiết bị di động.",
    items: [
      { id: "a", text: "Linux là hệ điều hành thương mại do tập đoàn Microsoft chính thức phát hành vào năm 1991.", isCorrect: false },
      { id: "b", text: "Ubuntu và Fedora là các bản phân phối phổ biến được xây dựng dựa trên nhân Linux.", isCorrect: true },
      { id: "c", text: "Mọi phần mềm ứng dụng thiết kế cho hệ điều hành Windows đều có thể chạy trực tiếp ngay trên Linux mà không cần qua trình giả lập hay biên dịch lại vì hai hệ điều hành dùng chung nhân.", isCorrect: false },
      { id: "d", text: "Khi một doanh nghiệp muốn xây dựng hệ thống máy chủ lưu trữ dữ liệu nội bộ với chi phí bản quyền tối ưu và có khả năng can thiệp chỉnh sửa mã nguồn bảo mật riêng, việc lựa chọn hệ điều hành Linux là giải pháp phù hợp hơn so với hệ điều hành thương mại nguồn đóng.", isCorrect: true }
    ],
    explanation: "Ý (a) Sai vì Linux là hệ điều hành nguồn mở gắn với Linus Torvalds, không phải sản phẩm của Microsoft. Ý (c) Sai vì Linux và Windows không dùng chung nhân; ứng dụng Windows không mặc nhiên chạy trực tiếp trên Linux."
  },
  {
    id: "p2_4",
    content: "Thiết bị di động như điện thoại thông minh và máy tính bảng sử dụng các hệ điều hành di động chuyên dụng, trong đó phổ biến nhất là Android (do Google phát triển) và iOS (do Apple phát triển). Hệ điều hành di động được thiết kế tối ưu cho màn hình cảm ứng, tích hợp các kết nối không dây như Wi-Fi, Bluetooth, 4G/5G, GPS và quản lý tiết kiệm năng lượng pin để đảm bảo tính di động cao.",
    items: [
      { id: "a", text: "Android và iOS là hai hệ điều hành phổ biến dành cho thiết bị di động.", isCorrect: true },
      { id: "b", text: "Hệ điều hành di động bắt buộc thiết bị phải cắm dây cáp mạng Ethernet cố định thì mới có thể kết nối Internet.", isCorrect: false },
      { id: "c", text: "Màn hình cảm ứng trên điện thoại thông minh đóng vai trò vừa là thiết bị vào (tiếp nhận thao tác vuốt, chạm) vừa là thiết bị ra (hiển thị thông tin).", isCorrect: true },
      { id: "d", text: "Một người dùng Android tải một tệp ứng dụng có đuôi .apk từ trang web ngoài cửa hàng Google Play; hệ điều hành Android sẽ tự động cho phép cài đặt ngay lập tức mà không cần bất kỳ thao tác cấp quyền nào từ người dùng.", isCorrect: false }
    ],
    explanation: "Ý (b) Sai vì thiết bị di động có thể kết nối Internet qua Wi-Fi hoặc mạng di động. Ý (d) Sai vì cài ứng dụng từ nguồn ngoài có thể cần người dùng cấp quyền cho phép cài đặt."
  },
  {
    id: "p2_5",
    content: "Hệ điều hành đóng vai trò là phần mềm trung gian quản lý toàn bộ tài nguyên phần cứng (CPU, bộ nhớ RAM, đĩa cứng, thiết bị ngoại vi) và cung cấp môi trường cho các phần mềm ứng dụng hoạt động. Khi người dùng mở một ứng dụng, hệ điều hành sẽ cấp phát một phần dung lượng RAM và điều phối thời gian xử lý của CPU. Khi tắt ứng dụng, hệ điều hành thu hồi tài nguyên bộ nhớ để cấp phát cho các tiến trình khác.",
    items: [
      { id: "a", text: "Hệ điều hành là phần mềm quản lý và điều phối các tài nguyên phần cứng của máy tính.", isCorrect: true },
      { id: "b", text: "Bộ nhớ RAM và CPU là các tài nguyên phần cứng do hệ điều hành trực tiếp quản lý và phân phối.", isCorrect: true },
      { id: "c", text: "Khi người dùng đóng một ứng dụng đang chạy, hệ điều hành vẫn duy trì việc chiếm dụng dung lượng RAM của ứng dụng đó và không thu hồi lại tài nguyên.", isCorrect: false },
      { id: "d", text: "Một máy tính bị giật lag do dung lượng RAM bị chiếm dụng 98% khi mở nhiều phần mềm nặng cùng lúc; người dùng thực hiện thao tác dọn dẹp các tệp tin rác trên đĩa cứng để giải phóng dung lượng RAM ngay lập tức mà không cần đóng bớt các phần mềm đang chạy.", isCorrect: false }
    ],
    explanation: "Ý (c) Sai vì hệ điều hành thu hồi tài nguyên khi ứng dụng kết thúc. Ý (d) Sai vì xóa tệp rác trên đĩa không giải phóng ngay RAM đang được các ứng dụng sử dụng; cần đóng bớt ứng dụng hoặc xử lý tiến trình."
  },
  {
    id: "p2_6",
    content: "Dựa trên khía cạnh bản quyền và khả năng tiếp cận mã nguồn, phần mềm được chia thành ba nhóm chính: Phần mềm thương mại (bản quyền đóng, trả phí), Phần mềm nguồn mở (cung cấp tự do cả chương trình và mã nguồn theo các giấy phép như GNU GPL) và Phần mềm miễn phí (Freeware - cho phép sử dụng không tốn phí nhưng giữ kín mã nguồn).",
    items: [
      { id: "a", text: "Phần mềm thương mại là loại phần mềm được nhà sản xuất cung cấp kèm theo toàn bộ mã nguồn công khai để người dùng tùy chỉnh.", isCorrect: false },
      { id: "b", text: "Freeware là phần mềm cho phép người dùng sử dụng miễn phí nhưng nhà phát triển không công khai mã nguồn.", isCorrect: true },
      { id: "c", text: "Sự khác biệt cốt lõi giữa phần mềm nguồn mở và phần mềm miễn phí (Freeware) nằm ở quyền hạn của người dùng đối với mã nguồn chương trình.", isCorrect: true },
      { id: "d", text: "Một trường học muốn trang bị phần mềm văn phòng cho toàn bộ máy tính với tiêu chí không tốn chi phí bản quyền và có thể chủ động chỉnh sửa mã nguồn để tích hợp tính năng quản lý riêng; nhà trường nên lựa chọn bộ phần mềm Microsoft Office hơn là LibreOffice.", isCorrect: false }
    ],
    explanation: "Ý (a) Sai vì phần mềm thương mại thường không công khai mã nguồn. Ý (d) Sai vì LibreOffice là phần mềm nguồn mở phù hợp hơn với tiêu chí không tốn phí bản quyền và có thể chỉnh sửa mã nguồn."
  },
  {
    id: "p2_7",
    content: "Năm 1983, Richard Stallman khởi xướng dự án GNU nhằm tạo ra một hệ điều hành tự do hoàn toàn. Đến năm 1985, Quỹ Phần mềm Tự do (FSF) ra đời cùng với giấy phép công cộng GNU GPL. Giấy phép này đảm bảo 4 quyền tự do cơ bản cho người dùng: tự do chạy chương trình, tự do nghiên cứu và sửa đổi mã nguồn, tự do phân phối lại bản sao, và tự do cải tiến chương trình để đóng góp cho cộng đồng.",
    items: [
      { id: "a", text: "Quỹ Phần mềm Tự do (FSF) do Richard Stallman thành lập để thúc đẩy quyền tự do sử dụng và phát triển phần mềm.", isCorrect: true },
      { id: "b", text: "Giấy phép GNU GPL cấm người dùng phân phối lại các bản sao phần mềm nguồn mở cho người khác.", isCorrect: false },
      { id: "c", text: "Giấy phép GNU GPL quy định rằng mọi sản phẩm phái sinh được phát triển dựa trên mã nguồn mở tuân thủ GPL cũng phải được phát hành dưới dạng mã nguồn mở theo cùng giấy phép đó.", isCorrect: true },
      { id: "d", text: "Một công ty phần mềm lấy mã nguồn mở tuân thủ giấy phép GNU GPL để phát triển thành một sản phẩm mới, sau đó bán bản quyền phần mềm này dưới dạng phần mềm thương mại nguồn đóng hoàn toàn; hành động này tuân thủ đúng quy định của giấy phép GNU GPL.", isCorrect: false }
    ],
    explanation: "Ý (b) Sai vì GPL cho phép phân phối lại bản sao theo các điều kiện của giấy phép. Ý (d) Sai vì sản phẩm phái sinh thuộc GPL phải tuân thủ các điều kiện chia sẻ mã nguồn của giấy phép."
  },
  {
    id: "p2_8",
    content: "Hiện nay, nhiều phần mềm nguồn mở đã đạt chất lượng cao và trở thành giải pháp thay thế hoàn hảo cho các phần mềm thương mại đắt tiền. Chẳng hạn, bộ ứng dụng văn phòng LibreOffice thay thế cho Microsoft Office, phần mềm xử lý ảnh GIMP thay thế cho Adobe Photoshop, phần mềm đồ họa vectơ Inkscape thay thế cho Adobe Illustrator, và hệ quản trị CSDL MySQL được sử dụng rộng rãi trên toàn cầu.",
    items: [
      { id: "a", text: "LibreOffice là bộ ứng dụng văn phòng nguồn mở có các chức năng soạn thảo văn bản, bảng tính và trình chiếu tương tự Microsoft Office.", isCorrect: true },
      { id: "b", text: "GIMP là phần mềm xử lý ảnh đồ họa thương mại nguồn đóng bắt buộc người dùng phải trả phí bản quyền hàng tháng.", isCorrect: false },
      { id: "c", text: "Việc sử dụng phần mềm nguồn mở như LibreOffice hay GIMP giúp các cơ quan, doanh nghiệp giảm thiểu chi phí bản quyền phần mềm và giảm nguy cơ vi phạm bản quyền phần mềm quốc tế.", isCorrect: true },
      { id: "d", text: "Một thiết kế viên đồ họa muốn chỉnh sửa các tệp thiết kế theo chuẩn mã nguồn đóng độc quyền của Adobe Illustrator mà không có kết nối mạng hay công cụ chuyển đổi; việc cài đặt duy nhất phần mềm Inkscape sẽ đảm bảo mở và xử lý hoàn hảo 100% mọi tính năng và hiệu ứng phức tạp của Adobe Illustrator không một lỗi nhỏ.", isCorrect: false }
    ],
    explanation: "Ý (b) Sai vì GIMP là phần mềm nguồn mở, không phải phần mềm thương mại đóng phí hằng tháng. Ý (d) Sai vì Inkscape không đảm bảo tương thích hoàn hảo với mọi tính năng và hiệu ứng độc quyền của Illustrator."
  },
  {
    id: "p2_9",
    content: "Phần mềm chạy trên Internet (hay ứng dụng web / SaaS) là các phần mềm được cài đặt và vận hành trên máy chủ từ xa. Người dùng truy cập và sử dụng dịch vụ thông qua trình duyệt web trên thiết bị của mình mà không cần cài đặt phức tạp. Các ví dụ điển hình bao gồm Google Docs, Google Sheets, Canva, Microsoft 365 trực tuyến, mang lại khả năng làm việc cộng tác theo thời gian thực và đồng bộ dữ liệu liên tục.",
    items: [
      { id: "a", text: "Google Docs và Google Sheets là các ví dụ điển hình về phần mềm chạy trên Internet.", isCorrect: true },
      { id: "b", text: "Để sử dụng phần mềm chạy trên Internet, bắt buộc người dùng phải tải bộ cài đặt dung lượng lớn và cài đặt trực tiếp lên đĩa cứng máy tính cá nhân.", isCorrect: false },
      { id: "c", text: "Ưu điểm nổi bật của phần mềm chạy trên Internet là cho phép nhiều người dùng cùng truy cập, chỉnh sửa và làm việc cộng tác trên một tệp tài liệu theo thời gian thực từ các vị trí địa lý khác nhau.", isCorrect: true },
      { id: "d", text: "Trong chuyến công tác đến khu vực miền núi không có sóng di động hay kết nối Internet, một nhóm nghiên cứu chọn sử dụng duy nhất ứng dụng Google Docs trực tuyến (không bật chế độ ngoại tuyến) để cùng soạn thảo báo cáo; giải pháp này đảm bảo công việc diễn ra liên tục và không bị gián đoạn.", isCorrect: false }
    ],
    explanation: "Ý (b) Sai vì phần mềm trực tuyến thường được truy cập qua trình duyệt, không cần cài bộ phần mềm lớn. Ý (d) Sai vì Google Docs trực tuyến cần kết nối Internet nếu không bật chế độ ngoại tuyến."
  },
  {
    id: "p2_10",
    content: "Phần mềm chạy trên đĩa cục bộ (Local software) được cài đặt trực tiếp trên máy tính, khai thác tối đa sức mạnh phần cứng của máy và hoạt động tốt ngay cả khi không có mạng. Trong khi đó, phần mềm chạy trên Internet phụ thuộc vào kết nối mạng, phụ thuộc vào tốc độ đường truyền và máy chủ của nhà cung cấp, nhưng lại mang đến sự linh hoạt cao, tự động cập nhật và dễ dàng chia sẻ tài nguyên.",
    items: [
      { id: "a", text: "Phần mềm chạy trên đĩa cục bộ có thể hoạt động bình thường ngay cả khi máy tính bị mất kết nối Internet.", isCorrect: true },
      { id: "b", text: "Tốc độ xử lý và khả năng làm việc của phần mềm chạy trên Internet hoàn toàn không bị ảnh hưởng bởi sự ổn định của đường truyền mạng.", isCorrect: false },
      { id: "c", text: "Việc dữ liệu được lưu trữ trên máy chủ từ xa khi sử dụng phần mềm chạy trên Internet giúp hoàn toàn triệt tiêu mọi nguy cơ về rò rỉ và an toàn thông tin mà không cần bất kỳ giải pháp bảo mật nào.", isCorrect: false },
      { id: "d", text: "Một doanh nghiệp dựng phim chuyên nghiệp cần xử lý các video độ phân giải 4K/8K dung lượng hàng trăm GB đòi hỏi tối ưu sức mạnh phần cứng đồ họa chuyên dụng và không bị giới hạn bởi băng thông mạng; doanh nghiệp này nên ưu tiên lựa chọn phần mềm dựng phim cài đặt trên đĩa cục bộ hơn là phần mềm biên tập video trực tuyến.", isCorrect: true }
    ],
    explanation: "Ý (b) Sai vì phần mềm trực tuyến phụ thuộc vào chất lượng đường truyền. Ý (c) Sai vì lưu trữ trên máy chủ không loại bỏ rủi ro an toàn thông tin; vẫn cần biện pháp bảo mật."
  },
  {
    id: "p2_11",
    content: "Khi xuất hình ảnh từ máy tính ra màn hình hoặc máy chiếu, hai chuẩn kết nối phổ biến thường được sử dụng là VGA và HDMI. Cổng VGA (Video Graphics Array) sử dụng tín hiệu tương tự (analog) chỉ truyền được tín hiệu hình ảnh. Trong khi đó, cổng HDMI (High-Definition Multimedia Interface) sử dụng tín hiệu kỹ thuật số (digital) cho phép truyền đồng thời cả hình ảnh chất lượng cao và âm thanh.",
    items: [
      { id: "a", text: "Cổng VGA truyền tín hiệu hình ảnh ở dạng tương tự (analog).", isCorrect: true },
      { id: "b", text: "Cổng HDMI truyền được cả hình ảnh và âm thanh bằng tín hiệu kỹ thuật số.", isCorrect: true },
      { id: "c", text: "Việc truyền đồng thời cả hình ảnh và âm thanh qua một cáp duy nhất của cổng VGA giúp đơn giản hóa việc kết nối máy tính với tivi.", isCorrect: false },
      { id: "d", text: "Một tivi thông minh hiện đại có cả cổng cắm HDMI và VGA; để phát bài hát có cả hình ảnh 4K và âm thanh vòm ra tivi thông qua duy nhất một sợi cáp, người dùng chọn sử dụng cổng VGA.", isCorrect: false }
    ],
    explanation: "Ý (c) Sai vì VGA chỉ truyền hình ảnh, không truyền âm thanh. Ý (d) Sai vì VGA không truyền hình ảnh 4K và âm thanh vòm qua một cáp; HDMI phù hợp hơn."
  },
  {
    id: "p2_12",
    content: "Các thiết bị số như máy tính, điện thoại di động có các thông số kỹ thuật đặc trưng về hiển thị và thu nhận hình ảnh. Kích thước màn hình được đo bằng đơn vị inch theo độ dài đường chéo. Độ phân giải màn hình được xác định bằng số lượng điểm ảnh (pixel) theo chiều ngang và chiều dọc. Ngoài ra, độ phân giải của camera thường được đo bằng đơn vị Megapixel (MP), phản ánh mức độ chi tiết của bức ảnh thu được.",
    items: [
      { id: "a", text: "Kích thước màn hình của điện thoại hay máy tính được đo bằng đơn vị inch theo độ dài đường chéo màn hình.", isCorrect: true },
      { id: "b", text: "Đơn vị Megapixel (MP) được dùng để đo dung lượng bộ nhớ trong của camera.", isCorrect: false },
      { id: "c", text: "Màn hình có độ phân giải Full HD (1920 x 1080) có tổng số điểm ảnh ít hơn so với màn hình có độ phân giải HD (1280 x 720).", isCorrect: false },
      { id: "d", text: "Một nhiếp ảnh gia cần chụp bức ảnh quảng cáo kích thước lớn ngoài trời yêu cầu hình ảnh sắc nét khi in ấn; việc lựa chọn camera có độ phân giải 48 MP sẽ đáp ứng độ chi tiết hình ảnh tốt hơn camera 12 MP trên cùng một công nghệ cảm biến.", isCorrect: true }
    ],
    explanation: "Ý (b) Sai vì MP đo độ phân giải ảnh, không đo dung lượng bộ nhớ. Ý (c) Sai vì Full HD có nhiều điểm ảnh hơn HD. Ý (d) Đúng theo giả định cùng công nghệ cảm biến; độ phân giải cao hơn có thể ghi lại nhiều chi tiết hơn."
  },
  {
    id: "p2_13",
    content: "Trình điều khiển thiết bị (Driver) là phần mềm trung gian giúp hệ điều hành nhận biết, điều khiển và giao tiếp với các thiết bị ngoại vi kết nối với máy tính. Mặc dù nhiều hệ điều hành tích hợp sẵn cơ chế Plug and Play (PnP) tự động nhận diện thiết bị, nhưng đối với các thiết bị chuyên dụng hoặc thiết bị mới, người dùng cần cài đặt đúng trình điều khiển do nhà sản xuất cung cấp để thiết bị hoạt động đầy đủ chức năng.",
    items: [
      { id: "a", text: "Driver là phần mềm giúp hệ điều hành nhận biết và điều khiển thiết bị ngoại vi.", isCorrect: true },
      { id: "b", text: "Tất cả các thiết bị ngoại vi khi cắm vào máy tính đều bắt buộc người dùng phải tự lập trình phần mềm Driver thì mới sử dụng được.", isCorrect: false },
      { id: "c", text: "Việc cài đặt nhầm Driver của một thiết bị khác loại sẽ giúp hệ điều hành tự động sửa lỗi và tăng tốc độ xử lý cho thiết bị ngoại vi đang cắm.", isCorrect: false },
      { id: "d", text: "Để khắc phục lỗi một bàn vẽ điện tử chuyên dụng cắm vào máy tính chỉ nhận thao tác di chuyển con trỏ như chuột thường mà không nhận lực nhấn nét vẽ, người dùng nên tìm và cài đặt đúng bản Driver chính thức từ nhà sản xuất bàn vẽ đó.", isCorrect: true }
    ],
    explanation: "Ý (b) Sai vì nhiều thiết bị được hệ điều hành nhận diện bằng driver có sẵn hoặc PnP. Ý (c) Sai vì driver không phù hợp có thể khiến thiết bị hoạt động lỗi; cần cài đúng driver."
  },
  {
    id: "p2_14",
    content: "Kết nối không dây trên các thiết bị số mang lại sự tiện lợi cao cho người dùng. Bluetooth là công nghệ kết nối không dây tầm ngắn (thường trong khoảng cách dưới 10m), dùng để kết nối trực tiếp giữa hai thiết bị với nhau như máy tính với chuột, bàn phím, tai nghe. Trong khi đó, Wi-Fi là công nghệ mạng không dây cho phép nhiều thiết bị cùng kết nối vào trạm phát sóng (Access Point) để truy cập mạng cục bộ và Internet.",
    items: [
      { id: "a", text: "Bluetooth là chuẩn kết nối không dây tầm ngắn thường được sử dụng trong phạm vi dưới 10m.", isCorrect: true },
      { id: "b", text: "Kết nối Bluetooth bắt buộc tất cả các thiết bị phải truy cập thông qua trạm phát sóng Wi-Fi của nhà mạng.", isCorrect: false },
      { id: "c", text: "Khoảng cách truyền dữ liệu và phạm vi phủ sóng của kết nối Bluetooth rộng hơn và xa hơn rất nhiều so với kết nối Wi-Fi.", isCorrect: false },
      { id: "d", text: "Trong một phòng họp không có sẵn mạng Internet hay thiết bị phát Wi-Fi, để truyền nhanh một tệp tài liệu dung lượng nhỏ từ điện thoại thông minh sang máy tính xách tay ở khoảng cách 2 mét, việc bật và ghép đôi Bluetooth giữa hai thiết bị là giải pháp kết nối không dây trực tiếp phù hợp.", isCorrect: true }
    ],
    explanation: "Ý (b) Sai vì Bluetooth kết nối trực tiếp giữa các thiết bị, không cần trạm Wi-Fi. Ý (c) Sai vì Bluetooth thường có phạm vi ngắn hơn Wi-Fi."
  },
  {
    id: "p2_15",
    content: "Khi kết nối điện thoại thông minh với máy tính bằng cáp USB, hệ điều hành trên điện thoại thường cung cấp các chế độ kết nối khác nhau như \"Chỉ sạc\" (Charging only) hoặc \"Truyền tệp\" (File Transfer/MTP). Ngoài ra, khi kết nối chuột với máy tính, hệ điều hành cho phép người dùng tùy chỉnh tốc độ con trỏ chuột để phù hợp với thói quen thao tác và tính chất công việc.",
    items: [
      { id: "a", text: "Chế độ \"Truyền tệp\" (File Transfer) cho phép máy tính truy cập và sao chép dữ liệu từ điện thoại.", isCorrect: true },
      { id: "b", text: "Khi chọn chế độ \"Chỉ sạc\", máy tính sẽ tự động mở File Explorer và sao chép toàn bộ ảnh trên điện thoại vào ổ C.", isCorrect: false },
      { id: "c", text: "Tốc độ di chuyển con trỏ chuột trên màn hình phản ánh tỉ lệ giữa khoảng cách con trỏ dịch chuyển trên màn hình và khoảng cách di chuyển thực tế của chuột trên mặt bàn.", isCorrect: true },
      { id: "d", text: "Một kỹ thuật viên chỉnh sửa ảnh cần thực hiện các thao tác chấm sửa chi tiết nhỏ trên bức ảnh độ phân giải cao; việc tăng tốc độ con trỏ chuột lên mức tối đa trong Windows sẽ giúp thao tác chấm sửa chi tiết trở nên chính xác và dễ dàng hơn.", isCorrect: false }
    ],
    explanation: "Ý (b) Sai vì chế độ Chỉ sạc không cho phép máy tính tự truy cập và sao chép ảnh. Ý (d) Sai vì tốc độ con trỏ tối đa có thể làm thao tác chi tiết khó kiểm soát; nên chọn tốc độ phù hợp."
  },
  {
    id: "p2_16",
    content: "Dịch vụ lưu trữ trực tuyến (dịch vụ lưu trữ đám mây) cho phép người dùng lưu trữ dữ liệu trên các máy chủ từ xa thông qua kết nối Internet. Thay vì chỉ lưu dữ liệu trên ổ đĩa cứng của máy tính hay thẻ nhớ cá nhân, các dịch vụ nổi tiếng như Google Drive, Microsoft OneDrive, Dropbox mang lại sự tiện lợi trong việc quản lý, truy cập và chia sẻ tệp tin mọi lúc, mọi nơi.",
    items: [
      { id: "a", text: "Google Drive và Microsoft OneDrive là các dịch vụ lưu trữ đám mây phổ biến hiện nay.", isCorrect: true },
      { id: "b", text: "Dịch vụ lưu trữ đám mây bắt buộc người dùng phải lưu trữ dữ liệu trực tiếp trên đĩa cứng máy tính cá nhân thì mới có thể sử dụng.", isCorrect: false },
      { id: "c", text: "Lưu trữ dữ liệu trên đám mây giúp người dùng tự động tăng gấp đôi dung lượng bộ nhớ RAM của thiết bị cá nhân đang kết nối.", isCorrect: false },
      { id: "d", text: "Một học sinh cần mở tệp slide thuyết trình nhóm trên máy tính của phòng chiếu ở trường mà không cần mang theo USB; học sinh đó tải tệp báo cáo lên Google Drive trước ở nhà và đăng nhập tài khoản để mở trực tuyến trên máy tính lớp học là một giải pháp phù hợp.", isCorrect: true }
    ],
    explanation: "Ý (b) Sai vì dữ liệu được lưu trên máy chủ trực tuyến, dù có thể đồng bộ thêm về máy cá nhân. Ý (c) Sai vì lưu trữ đám mây không làm tăng RAM của thiết bị."
  },
  {
    id: "p2_17",
    content: "Google Drive là một dịch vụ lưu trữ trực tuyến cho phép người dùng thực hiện nhiều thao tác quản lý tệp tin như: tải tệp/thư mục lên (Upload), tải xuống (Download), tạo thư mục mới, đổi tên, di chuyển, xóa và khôi phục tệp tin từ Thùng rác (Trash). Khi tệp bị xóa, nó sẽ được chuyển vào Thùng rác và lưu trữ tạm thời trong một khoảng thời gian trước khi bị xóa vĩnh viễn.",
    items: [
      { id: "a", text: "Thao tác tải tệp lên (Upload) cho phép chuyển dữ liệu từ máy tính cá nhân lên ổ đĩa trực tuyến Google Drive.", isCorrect: true },
      { id: "b", text: "Khi một tệp tin bị xóa khỏi Google Drive, nó sẽ ngay lập tức bị biến mất vĩnh viễn và không thể khôi phục lại dưới bất kỳ hình thức nào.", isCorrect: false },
      { id: "c", text: "Việc di chuyển tệp tin vào một thư mục mới trên Google Drive sẽ tự động xóa bản sao của tệp tin đó trên ổ cứng máy tính cá nhân.", isCorrect: false },
      { id: "d", text: "Một giáo viên vô tình nhấp nút xóa một tệp đề thi quan trọng trên Google Drive cách đây 5 ngày; để lấy lại tệp này mà không cần soạn lại từ đầu, giáo viên mở mục Thùng rác (Trash), nhấp chuột phải vào tệp đề thi và chọn \"Khôi phục\" (Restore).", isCorrect: true }
    ],
    explanation: "Ý (b) Sai vì tệp thường được chuyển vào Thùng rác trước khi bị xóa vĩnh viễn. Ý (c) Sai vì thao tác di chuyển trong Drive không tự xóa bản sao trên ổ cứng máy tính."
  },
  {
    id: "p2_18",
    content: "Khi chia sẻ tệp hoặc thư mục trên các dịch vụ lưu trữ trực tuyến như Google Drive hay OneDrive, người sở hữu có thể thiết lập các quyền truy cập khác nhau cho người nhận. Ba quyền chia sẻ cơ bản gồm: \"Người xem\" (Viewer - chỉ được xem và tải tệp), \"Người nhận xét\" (Commenter - được xem và thêm ghi chú/nhận xét) và \"Người chỉnh sửa\" (Editor - được toàn quyền xem, nhận xét, chỉnh sửa nội dung, thêm/xóa tệp hoặc chia sẻ cho người khác).",
    items: [
      { id: "a", text: "Quyền \"Người chỉnh sửa\" (Editor) cho phép người được chia sẻ có thể sửa đổi nội dung và thêm tệp mới vào thư mục.", isCorrect: true },
      { id: "b", text: "Quyền \"Người xem\" (Viewer) cho phép người nhận có thể tùy ý xóa hoặc đổi tên tệp tin của người sở hữu.", isCorrect: false },
      { id: "c", text: "Khi chia sẻ một thư mục với quyền \"Người chỉnh sửa\", tất cả các tệp tin và thư mục con nằm bên trong thư mục đó đều tự động kế thừa quyền chỉnh sửa cho người nhận.", isCorrect: true },
      { id: "d", text: "Một nhóm trưởng muốn gửi dự thảo kế hoạch cho các thành viên trong nhóm đóng góp ý kiến nhận xét bằng lời văn nhưng không muốn các thành viên tự ý thay đổi trực tiếp nội dung văn bản gốc; nhóm trưởng nên đặt quyền chia sẻ cho liên kết là \"Người chỉnh sửa\" (Editor).", isCorrect: false }
    ],
    explanation: "Ý (b) Sai vì quyền Viewer không cho phép tùy ý xóa hoặc đổi tên tệp. Ý (d) Sai vì mục tiêu chỉ nhận xét phù hợp với quyền Commenter, không phải Editor."
  },
  {
    id: "p2_19",
    content: "Dịch vụ lưu trữ trực tuyến cung cấp hai chế độ truy cập chính khi tạo liên kết chia sẻ: \"Bị hạn chế\" (Restricted - chỉ những người được thêm tài khoản email cụ thể mới mở được) và \"Bất kỳ ai có liên kết\" (Anyone with the link - bất kỳ ai có đường dẫn đều có thể truy cập). Việc quản lý chế độ truy cập đóng vai trò quan trọng trong việc bảo vệ an toàn thông tin và tránh rò rỉ dữ liệu quan trọng ra bên ngoài.",
    items: [
      { id: "a", text: "Chế độ \"Bị hạn chế\" chỉ cho phép những tài khoản email được chỉ định cụ thể mới có quyền mở tệp.", isCorrect: true },
      { id: "b", text: "Chế độ \"Bất kỳ ai có liên kết\" bắt buộc người nhận phải nhập đúng mật khẩu tài khoản của người sở hữu thì mới xem được dữ liệu.", isCorrect: false },
      { id: "c", text: "Việc đặt quyền \"Bất kỳ ai có liên kết\" kèm quyền \"Người chỉnh sửa\" cho một tệp chứa thông tin cá nhân nhạy cảm sẽ làm tăng nguy cơ bị rò rỉ và chỉnh sửa dữ liệu trái phép.", isCorrect: true },
      { id: "d", text: "Một cán bộ quản lý muốn gửi bảng tổng hợp điểm thi học kỳ của toàn trường cho tất cả giáo viên chủ nhiệm xem nhưng cần đảm bảo học sinh không thể truy cập dù có vô tình biết đường liên kết; cán bộ đó nên chọn chế độ chia sẻ \"Bất kỳ ai có liên kết\" và đặt quyền \"Người xem\".", isCorrect: false }
    ],
    explanation: "Ý (b) Sai vì chế độ chia sẻ bằng liên kết không yêu cầu mật khẩu của chủ sở hữu. Ý (d) Sai vì bất kỳ ai có liên kết đều có thể truy cập; nên giới hạn người nhận bằng email cụ thể."
  },
  {
    id: "p2_20",
    content: "Các phần mềm ứng dụng trực tuyến như Google Docs, Google Sheets tích hợp trên đám mây cho phép nhiều người cùng mở và làm việc cộng tác trên một tệp tài liệu theo thời gian thực. Mọi thay đổi đều được hệ thống tự động lưu lại tức thì. Ngoài ra, tính năng \"Lịch sử phiên bản\" (Version history) ghi lại chi tiết thời gian và người thực hiện từng chỉnh sửa, giúp người dùng theo dõi tiến độ và khôi phục lại trạng thái tài liệu ở bất kỳ thời điểm nào trong quá khứ.",
    items: [
      { id: "a", text: "Google Docs cho phép nhiều người dùng cùng chỉnh sửa trực tuyến trên một tệp văn bản tại cùng một thời điểm.", isCorrect: true },
      { id: "b", text: "Khi soạn thảo văn bản trên Google Docs, người dùng phải nhấn nút Save (Lưu) liên tục sau mỗi dòng gõ thì dữ liệu mới không bị mất.", isCorrect: false },
      { id: "c", text: "Tính năng \"Lịch sử phiên bản\" giúp người quản lý tệp biết chính xác thành viên nào đã chỉnh sửa nội dung gì và vào thời gian nào.", isCorrect: true },
      { id: "d", text: "Trong quá trình thảo luận nhóm trên tệp Google Sheets, một thành viên vô tình xóa mất một bảng số liệu quan trọng từ ngày hôm qua và tiếp tục gõ thêm nhiều nội dung mới hôm nay; để lấy lại bảng số liệu bị xóa mà không làm mất các nội dung mới gõ hôm nay, trưởng nhóm mở Lịch sử phiên bản, chọn phiên bản ngày hôm qua và nhấn \"Khôi phục phiên bản này\" (Restore this version).", isCorrect: false }
    ],
    explanation: "Ý (b) Sai vì Google Docs tự động lưu thay đổi. Ý (d) Sai vì khôi phục phiên bản cũ có thể thay thế trạng thái hiện tại; để giữ nội dung mới, cần cân nhắc sao chép dữ liệu cần thiết hoặc khôi phục có chọn lọc."
  }
],

  // =================================================================
  // PHẦN III: 10 CÂU TỰ LUẬN / TRẢ LỜI NGẮN (2 câu / đề)
  // =================================================================
  part3: [
  {
    id: "p3_1",
    content: "Hãy giải thích vì sao khi xuất hình ảnh và âm thanh từ máy tính ra màn hình tivi hiện đại, người ta thường ưu tiên sử dụng cổng HDMI thay vì cổng VGA.",
    placeholder: "Nhập câu trả lời tự luận của em vào đây...",
    suggestedAnswer: "HDMI truyền đồng thời hình ảnh và âm thanh dạng số qua một cáp, hỗ trợ chất lượng và độ phân giải cao, phù hợp với tivi hiện đại. VGA chủ yếu truyền hình ảnh dạng tương tự, không truyền âm thanh nên cần kết nối âm thanh riêng.",
    rubric: "Tiêu chí chấm:\n- Nêu được HDMI truyền đồng thời hình ảnh và âm thanh dạng số qua một cáp.\n- Nêu được HDMI hỗ trợ chất lượng/độ phân giải cao, phù hợp với tivi hiện đại.\n- Nêu được VGA chủ yếu truyền hình ảnh dạng tương tự và không truyền âm thanh."
  },
  {
    id: "p3_2",
    content: "Trình điều khiển thiết bị (Driver) đóng vai trò gì trong quá trình máy tính kết nối và sử dụng một thiết bị ngoại vi mới? Nếu không có Driver phù hợp thì điều gì sẽ xảy ra?",
    placeholder: "Nhập câu trả lời tự luận của em vào đây...",
    suggestedAnswer: "Driver là phần mềm giúp hệ điều hành nhận diện, giao tiếp và điều khiển thiết bị ngoại vi. Thiếu hoặc cài sai Driver có thể khiến thiết bị không được nhận diện, không hoạt động hoặc chỉ hoạt động một phần chức năng.",
    rubric: "Tiêu chí chấm:\n- Nêu được Driver giúp hệ điều hành nhận diện, giao tiếp và điều khiển thiết bị ngoại vi.\n- Nêu được hậu quả khi thiếu hoặc cài sai Driver: thiết bị có thể không được nhận diện, không hoạt động hoặc hoạt động không đầy đủ."
  },
  {
    id: "p3_3",
    content: "Trình bày sự khác nhau về mục đích sử dụng và phạm vi hoạt động giữa kết nối không dây Bluetooth và kết nối không dây Wi-Fi trên các thiết bị số.",
    placeholder: "Nhập câu trả lời tự luận của em vào đây...",
    suggestedAnswer: "Bluetooth chủ yếu kết nối trực tiếp các thiết bị ở khoảng cách ngắn như tai nghe, chuột, bàn phím và truyền tệp nhỏ; thường không cần điểm truy cập. Wi-Fi chủ yếu kết nối thiết bị với mạng cục bộ hoặc Internet thông qua bộ phát, thường có phạm vi và tốc độ cao hơn Bluetooth.",
    rubric: "Tiêu chí chấm:\n- Nêu được mục đích của Bluetooth: kết nối trực tiếp thiết bị ở khoảng cách ngắn, thường dùng với tai nghe, chuột, bàn phím hoặc truyền tệp nhỏ.\n- Nêu được mục đích của Wi-Fi: kết nối thiết bị với mạng cục bộ hoặc Internet thông qua bộ phát.\n- So sánh được phạm vi hoạt động, đồng thời nêu Wi-Fi thường có phạm vi và tốc độ cao hơn Bluetooth."
  },
  {
    id: "p3_4",
    content: "Khi kết nối điện thoại thông minh với máy tính qua cáp USB, vì sao người dùng cần phải chọn chế độ \"Truyền tệp\" (File Transfer / MTP) trên điện thoại thì máy tính mới có thể đọc và sao chép dữ liệu?",
    placeholder: "Nhập câu trả lời tự luận của em vào đây...",
    suggestedAnswer: "Ở chế độ Chỉ sạc, cổng USB chủ yếu cấp nguồn và chưa cho phép máy tính truy cập dữ liệu. Khi chọn Truyền tệp (MTP), mở khóa điện thoại và chấp thuận yêu cầu truy cập nếu có, máy tính mới có thể nhận bộ nhớ điện thoại để đọc và sao chép tệp.",
    rubric: "Tiêu chí chấm:\n- Phân biệt được chế độ Chỉ sạc với chế độ Truyền tệp.\n- Nêu được rằng chế độ Chỉ sạc chủ yếu cấp nguồn, không cho phép máy tính truy cập dữ liệu.\n- Nêu được thao tác chọn MTP, mở khóa điện thoại và chấp thuận yêu cầu truy cập nếu có."
  },
  {
    id: "p3_5",
    content: "Tốc độ di chuyển của con trỏ chuột trên màn hình phụ thuộc vào yếu tố nào và vì sao việc điều chỉnh tốc độ này lại quan trọng đối với người sử dụng máy tính?",
    placeholder: "Nhập câu trả lời tự luận của em vào đây...",
    suggestedAnswer: "Tốc độ con trỏ phụ thuộc vào thiết lập tốc độ hoặc độ nhạy chuột trong hệ điều hành, độ nhạy cảm biến (DPI) và thao tác di chuyển chuột. Điều chỉnh phù hợp giúp thao tác nhanh nhưng vẫn chính xác, đặc biệt khi vẽ hoặc chỉnh sửa chi tiết.",
    rubric: "Tiêu chí chấm:\n- Nêu được các yếu tố ảnh hưởng: thiết lập tốc độ/độ nhạy trong hệ điều hành, DPI của chuột và thao tác di chuyển chuột.\n- Giải thích được việc điều chỉnh phù hợp giúp thao tác thuận tiện, chính xác.\n- Nêu được ví dụ về công việc cần độ chính xác như vẽ hoặc chỉnh sửa chi tiết."
  },
  {
    id: "p3_6",
    content: "Trường hợp bạn Nam muốn kết nối chiếc máy tính xách tay cá nhân với máy chiếu của lớp học để báo cáo bài tập nhóm. Tuy nhiên, sau khi cắm cáp HDMI, máy chiếu chỉ hiển thị hình nền máy tính mà không hiển thị nội dung bài trình chiếu PowerPoint Nam đang mở. Em hãy hướng dẫn Nam cách xử lý trong hệ điều hành Windows để màn hình máy chiếu hiển thị đúng nội dung bài trình chiếu trên máy tính.",
    placeholder: "Nhập câu trả lời tự luận của em vào đây...",
    suggestedAnswer: "Kiểm tra cáp HDMI và nguồn vào của máy chiếu. Nhấn Windows + P, chọn Duplicate (Nhân đôi) để máy chiếu hiển thị giống màn hình máy tính. Nếu chọn Extend (Mở rộng), chuyển cửa sổ trình chiếu PowerPoint sang màn hình máy chiếu hoặc chọn đúng màn hình trong PowerPoint tại Slide Show > Monitor, sau đó bắt đầu trình chiếu.",
    rubric: "Tiêu chí chấm:\n- Nêu được việc kiểm tra cáp HDMI và nguồn vào của máy chiếu.\n- Hướng dẫn nhấn Windows + P và chọn Duplicate để chiếu cùng nội dung trên hai màn hình.\n- Với chế độ Extend, hướng dẫn chuyển cửa sổ PowerPoint sang màn hình máy chiếu hoặc chọn đúng màn hình trong Slide Show > Monitor."
  },
  {
    id: "p3_7",
    content: "An cắm cáp USB kết nối điện thoại thông minh với máy tính để sao chép hình ảnh phục vụ bài thực hành. Tuy nhiên, trên máy tính không xuất hiện biểu tượng bộ nhớ điện thoại trong File Explorer mà điện thoại chỉ hiện thông báo đang sạc pin. Em hãy đề xuất quy trình các bước thao tác trên điện thoại và máy tính để An có thể sao chép được ảnh sang máy tính.",
    placeholder: "Nhập câu trả lời tự luận của em vào đây...",
    suggestedAnswer: "Dùng cáp USB có hỗ trợ truyền dữ liệu, kết nối điện thoại với máy tính và mở khóa điện thoại. Trên điện thoại, mở thông báo kết nối USB, chọn Truyền tệp (File Transfer/MTP) và cấp quyền nếu được hỏi. Trên máy tính, mở File Explorer > This PC > tên điện thoại > bộ nhớ > DCIM/Pictures, chọn ảnh rồi Copy và Paste vào thư mục đích. Nếu máy tính chưa nhận điện thoại, thử cáp hoặc cổng USB khác và kiểm tra Driver.",
    rubric: "Tiêu chí chấm:\n- Nêu được việc dùng cáp hỗ trợ truyền dữ liệu, kết nối và mở khóa điện thoại.\n- Hướng dẫn chọn File Transfer/MTP và cấp quyền truy cập nếu được yêu cầu.\n- Hướng dẫn tìm ảnh trong bộ nhớ điện thoại bằng File Explorer và sao chép vào thư mục đích.\n- Nêu được cách xử lý khi máy tính chưa nhận thiết bị: thử cáp/cổng khác hoặc kiểm tra Driver."
  },
  {
    id: "p3_8",
    content: "Bạn Hoa mới mua một chiếc tai nghe không dây Bluetooth và muốn kết nối với máy tính xách tay chạy hệ điều hành Windows để học trực tuyến. Em hãy trình bày các bước chi tiết để Hoa có thể thực hiện việc ghép đôi và kết nối thành công tai nghe này với máy tính.",
    placeholder: "Nhập câu trả lời tự luận của em vào đây...",
    suggestedAnswer: "Bật tai nghe và đưa tai nghe vào chế độ ghép đôi (pairing). Trên Windows, bật Bluetooth tại Settings > Bluetooth & devices, chọn Add device > Bluetooth. Chọn tên tai nghe trong danh sách, xác nhận ghép đôi và chờ thông báo Connected. Trong Settings > System > Sound, chọn tai nghe làm thiết bị phát âm thanh rồi kiểm tra âm thanh.",
    rubric: "Tiêu chí chấm:\n- Hướng dẫn bật tai nghe và đưa tai nghe vào chế độ ghép đôi.\n- Hướng dẫn bật Bluetooth trên Windows và chọn Settings > Bluetooth & devices > Add device > Bluetooth.\n- Nêu được thao tác chọn tên tai nghe, ghép đôi và chờ kết nối thành công.\n- Hướng dẫn chọn tai nghe làm thiết bị phát âm thanh và kiểm tra."
  },
  {
    id: "p3_9",
    content: "Một bạn học sinh thường xuyên làm bài tập thiết kế đồ họa trên máy tính nhận thấy việc di chuyển con trỏ chuột hiện tại quá nhanh khiến các thao tác vẽ đường nét chi tiết thiếu chính xác. Em hãy hướng dẫn bạn cách truy cập và điều chỉnh lại tốc độ con trỏ chuột trong hệ điều hành Windows sao cho phù hợp với công việc thiết kế đồ họa.",
    placeholder: "Nhập câu trả lời tự luận của em vào đây...",
    suggestedAnswer: "Mở Settings > Bluetooth & devices > Mouse hoặc Control Panel > Mouse > Pointer Options. Giảm thanh trượt Mouse pointer speed/Select a pointer speed xuống mức vừa phải, thử di chuyển và vẽ chi tiết rồi điều chỉnh tiếp. Nếu chuột hỗ trợ, có thể điều chỉnh DPI; nên ưu tiên độ chính xác thay vì đặt tốc độ tối đa.",
    rubric: "Tiêu chí chấm:\n- Nêu được ít nhất một đường dẫn truy cập cài đặt chuột trong Windows.\n- Hướng dẫn giảm tốc độ con trỏ, thử thao tác và điều chỉnh đến mức phù hợp.\n- Nêu được có thể điều chỉnh DPI nếu chuột hỗ trợ và cần ưu tiên độ chính xác khi thiết kế."
  },
  {
    id: "p3_10",
    content: "Trong buổi làm việc nhóm tại thư viện, nhóm của Lan cần kết nối máy tính xách tay vào mạng Wi-Fi công cộng của thư viện để tải tài liệu và chia sẻ dữ liệu giữa các máy tính. Em hãy hướng dẫn các bước để Lan kết nối máy tính vào mạng Wi-Fi và đưa ra hai lưu ý quan trọng để bảo vệ an toàn dữ liệu khi sử dụng mạng không dây này.",
    placeholder: "Nhập câu trả lời tự luận của em vào đây...",
    suggestedAnswer: "Bật Wi-Fi trên máy tính, chọn biểu tượng mạng trên thanh tác vụ, chọn đúng tên mạng Wi-Fi của thư viện, nhấn Connect và nhập mật khẩu nếu có. Nếu mạng yêu cầu, mở trình duyệt và đăng nhập qua trang chào; sau đó kiểm tra kết nối. Hai lưu ý: (1) xác minh đúng mạng của thư viện, tránh điểm phát giả mạo; (2) hạn chế truy cập hoặc chia sẻ dữ liệu nhạy cảm trên mạng công cộng, tắt chia sẻ tệp và ưu tiên website HTTPS/VPN khi cần.",
    rubric: "Tiêu chí chấm:\n- Nêu được các bước bật Wi-Fi, chọn đúng mạng, kết nối và nhập mật khẩu nếu có.\n- Nêu được thao tác đăng nhập qua trang chào nếu mạng yêu cầu và kiểm tra kết nối.\n- Đưa ra hai lưu ý bảo mật phù hợp, chẳng hạn xác minh đúng mạng; hạn chế truy cập/chia sẻ dữ liệu nhạy cảm; tắt chia sẻ tệp; ưu tiên HTTPS hoặc VPN khi cần."
  }
]
};

/**
 * HÀM TRÍCH XUẤT CÂU HỎI CHO TỪNG ĐỀ (TỪ ĐỀ 01 ĐẾN ĐỀ 05)
 * Trích xuất: 12 câu Phần I + 4 câu Phần II + 2 câu Phần III
 */
function getQuestionsForExam(examIndex) {
  const p1Count = EXAM_CONFIG.examStructure.part1Count; // 12
  const p2Count = EXAM_CONFIG.examStructure.part2Count; // 4
  const p3Count = EXAM_CONFIG.examStructure.part3Count; // 2

  const totalP1 = QUESTION_BANK.part1.length;
  const totalP2 = QUESTION_BANK.part2.length;
  const totalP3 = QUESTION_BANK.part3.length;

  const resultQuestions = [];

  // 1. Trích xuất 12 câu Phần I (Dùng vòng lặp xoay vòng nếu thầy cô chưa dán đủ 60 câu)
  for (let i = 0; i < p1Count; i++) {
    const dataIndex = (examIndex * p1Count + i) % totalP1;
    const q = QUESTION_BANK.part1[dataIndex];
    if (q) {
      resultQuestions.push({
        ...q,
        type: "multiple_choice",
        section: "Phần I. Câu trắc nghiệm nhiều phương án lựa chọn"
      });
    }
  }

  // 2. Trích xuất 4 câu Phần II
  for (let i = 0; i < p2Count; i++) {
    const dataIndex = (examIndex * p2Count + i) % totalP2;
    const q = QUESTION_BANK.part2[dataIndex];
    if (q) {
      resultQuestions.push({
        ...q,
        type: "true_false",
        section: "Phần II. Câu trắc nghiệm Đúng / Sai"
      });
    }
  }

  // 3. Trích xuất 2 câu Phần III
  for (let i = 0; i < p3Count; i++) {
    const dataIndex = (examIndex * p3Count + i) % totalP3;
    const q = QUESTION_BANK.part3[dataIndex];
    if (q) {
      resultQuestions.push({
        ...q,
        type: "essay",
        section: "Phần III. Câu hỏi Tự luận / Trả lời ngắn"
      });
    }
  }

  return resultQuestions;
}
