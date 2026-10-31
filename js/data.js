/**
 * CẤU HÌNH ĐỀ THI VÀ NGÂN HÀNG CÂU HỎI TIN HỌC 11
 * Thầy/Cô có thể tùy ý sửa đổi thông tin, thêm/bớt câu hỏi trực tiếp tại file này.
 */

const EXAM_CONFIG = {
  title: "BÀI ÔN TẬP ĐỊNH KỲ - TIN HỌC 11",
  subject: "Tin học 11 (GDPT 2018) - Chủ đề Mạng máy tính & Hệ điều hành",
  durationMinutes: 45, // Thời gian làm bài (phút)
  
  // URL Web App của Google Apps Script (Sẽ dán URL lấy từ Bước 4 vào đây)
  // Nếu để trống, hệ thống vẫn chấm điểm bình thường nhưng không đồng bộ Google Sheets
  gasWebhookUrl: "https://script.google.com/macros/s/AKfycbzhISIInTcGFTp5gg4qLzJ9PhWa3T8q4Vw3maYnvq29bo2XTBZss6x7mlXH9vDXbmg/exec", 

  // Barem điểm chuẩn Bộ GD&ĐT cho Phần II (Trắc nghiệm Đúng/Sai)
  trueFalseScoringMatrix: {
    0: 0.0,
    1: 0.1,  // Đúng 1 ý: 0.1 điểm
    2: 0.25, // Đúng 2 ý: 0.25 điểm
    3: 0.5,  // Đúng 3 ý: 0.5 điểm
    4: 1.0   // Đúng cả 4 ý: 1.0 điểm
  }
};

const QUESTIONS_DATA = [
  // =================================================================
  // PHẦN I: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (CHỌN 1 ĐÁP ÁN ĐÚNG)
  // =================================================================
  {
    id: "q1",
    type: "multiple_choice",
    section: "Phần I. Câu trắc nghiệm nhiều phương án lựa chọn",
    content: "Trong hệ thống mạng máy tính, thiết bị nào sau đây dùng để định tuyến và chuyển tiếp các gói tin giữa các mạng khác nhau?",
    options: [
      { key: "A", text: "Switch (Bộ chuyển mạch)" },
      { key: "B", text: "Router (Bộ định tuyến)" },
      { key: "C", text: "Hub (Bộ chia tín hiệu)" },
      { key: "D", text: "Network Interface Card (Card mạng)" }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Router (Bộ định tuyến) hoạt động ở tầng Network (Tầng 3), làm nhiệm vụ định tuyến và chuyển tiếp gói tin giữa các mạng máy tính khác nhau."
  },
  {
    id: "q2",
    type: "multiple_choice",
    section: "Phần I. Câu trắc nghiệm nhiều phương án lựa chọn",
    content: "Giao thức nào sau đây được sử dụng phổ biến nhất để truyền tải trang web có bảo mật và mã hóa dữ liệu trên Internet?",
    options: [
      { key: "A", text: "HTTP" },
      { key: "B", text: "FTP" },
      { key: "C", text: "HTTPS" },
      { key: "D", text: "SMTP" }
    ],
    correctAnswer: "C",
    point: 0.25,
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) sử dụng chứng chỉ SSL/TLS để mã hóa dữ liệu giữa trình duyệt của người dùng và máy chủ web."
  },
  {
    id: "q3",
    type: "multiple_choice",
    section: "Phần I. Câu trắc nghiệm nhiều phương án lựa chọn",
    content: "Địa chỉ IPv4 chuẩn có độ dài bao nhiêu bit và thường được biểu diễn dưới dạng nào?",
    options: [
      { key: "A", text: "32 bit, gồm 4 số thập phân cách nhau bởi dấu chấm" },
      { key: "B", text: "64 bit, gồm 8 số thập phân cách nhau bởi dấu gạch ngang" },
      { key: "C", text: "128 bit, gồm các cụm ký tự hexa cách nhau bởi dấu hai chấm" },
      { key: "D", text: "16 bit, gồm 2 số nhị phân" }
    ],
    correctAnswer: "A",
    point: 0.25,
    explanation: "IPv4 có độ dài 32 bit, chia làm 4 octet (mỗi octet 8 bit), biểu diễn dưới dạng 4 số thập phân cách nhau bằng dấu chấm (VD: 192.168.1.1)."
  },
  {
    id: "q4",
    type: "multiple_choice",
    section: "Phần I. Câu trắc nghiệm nhiều phương án lựa chọn",
    content: "Đặc điểm cơ bản nhất của phần mềm nguồn mở (Open Source Software) là gì?",
    options: [
      { key: "A", text: "Luôn luôn được cung cấp miễn phí và cấm bán thương mại" },
      { key: "B", text: "Mã nguồn được công khai, cho phép người dùng xem, sửa đổi và phân phối lại" },
      { key: "C", text: "Không có bản quyền và tác giả không chịu bất kỳ trách nhiệm pháp lý nào" },
      { key: "D", text: "Chỉ chạy được trên hệ điều hành Linux" }
    ],
    correctAnswer: "B",
    point: 0.25,
    explanation: "Điểm cốt lõi của phần mềm nguồn mở là mã nguồn được công khai minh bạch cùng giấy phép cho phép cộng đồng quyền tự do nghiên cứu, chỉnh sửa và chia sẻ."
  },

  // =================================================================
  // PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI (4 Ý a, b, c, d)
  // =================================================================
  {
    id: "q5",
    type: "true_false",
    section: "Phần II. Câu trắc nghiệm Đúng / Sai",
    content: "Khi tìm hiểu về hệ điều hành Linux và hệ sinh thái mã nguồn mở, các học sinh đưa ra một số nhận định. Hãy xác định mỗi nhận định sau là Đúng hay Sai:",
    items: [
      {
        id: "a",
        text: "Linux là phần mềm thương mại có mã nguồn đóng, buộc phải trả phí bản quyền cho mỗi máy cài đặt.",
        isCorrect: false
      },
      {
        id: "b",
        text: "Người dùng có quyền tự do nghiên cứu, sửa đổi và phân phối lại mã nguồn Linux theo giấy phép GNU GPL.",
        isCorrect: true
      },
      {
        id: "c",
        text: "Hệ điều hành di động Android phổ biến hiện nay được phát triển dựa trên nhân (Kernel) Linux.",
        isCorrect: true
      },
      {
        id: "d",
        text: "Ubuntu, Fedora, Debian và Windows Server là các bản phân phối (distro) chính thức của Linux.",
        isCorrect: false
      }
    ],
    explanation: "Ý (a) Sai vì Linux là nguồn mở, miễn phí sử dụng nhân. Ý (d) Sai vì Windows Server là hệ điều hành độc quyền thương mại của hãng Microsoft, không phải bản phân phối của Linux."
  },
  {
    id: "q6",
    type: "true_false",
    section: "Phần II. Câu trắc nghiệm Đúng / Sai",
    content: "Xét các phát biểu liên quan đến mạng không dây (Wi-Fi) và bảo mật mạng trong trường học:",
    items: [
      {
        id: "a",
        text: "Wi-Fi sử dụng sóng vô tuyến để kết nối các thiết bị với mạng mà không cần cáp mạng vật lý.",
        isCorrect: true
      },
      {
        id: "b",
        text: "Giao thức bảo mật WPA3 hiện có tính an toàn cao hơn so với WPA2 và WEP cũ.",
        isCorrect: true
      },
      {
        id: "c",
        text: "Mạng Wi-Fi công cộng không đặt mật khẩu là hoàn toàn an toàn vì ai cũng có thể truy cập hợp pháp.",
        isCorrect: false
      },
      {
        id: "d",
        text: "Việc tắt phát SSID (tên mạng Wi-Fi) có thể giúp ẩn tên mạng nhưng không thay thế được cơ chế mã hóa mật khẩu mạnh.",
        isCorrect: true
      }
    ],
    explanation: "Ý (c) Sai vì Wi-Fi công cộng không mật khẩu tiềm ẩn nguy cơ nghe lén gói tin (Packet Sniffing) và tấn công giả mạo (Man-In-The-Middle)."
  },

  // =================================================================
  // PHẦN III: TỰ LUẬN / TRẢ LỜI NGẮN
  // =================================================================
  {
    id: "q7",
    type: "essay",
    section: "Phần III. Câu hỏi Tự luận / Trả lời ngắn",
    content: "Em hãy nêu sự khác biệt cơ bản giữa mạng cục bộ (LAN) và mạng diện rộng (WAN) về hai tiêu chí: Phạm vi địa lý và Tốc độ truyền dữ liệu?",
    placeholder: "Nhập câu trả lời tự luận của em vào đây...",
    suggestedAnswer: "1. Về phạm vi địa lý:\n- Mạng LAN (Local Area Network): Giới hạn trong phạm vi hẹp (phòng học, tòa nhà, cơ quan, bán kính dưới vài km).\n- Mạng WAN (Wide Area Network): Trải rộng trên phạm vi địa lý lớn (quận huyện, thành phố, quốc gia hoặc toàn cầu).\n\n2. Về tốc độ truyền dữ liệu:\n- Mạng LAN thường có tốc độ cao (100 Mbps đến hàng Gbps) do khoảng cách ngắn và đường truyền nội bộ riêng.\n- Mạng WAN thường có tốc độ thấp hơn LAN và chịu ảnh hưởng nhiều bởi hạ tầng viễn thông công cộng.",
    rubric: "Biểu điểm gợi ý:\n- Nêu đúng sự khác biệt về phạm vi địa lý: 0.5 điểm.\n- Nêu đúng sự khác biệt về tốc độ truyền tải: 0.5 điểm."
  }
];
