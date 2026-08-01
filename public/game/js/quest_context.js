/**
 * QUEST CONTEXT — Ngữ cảnh câu chuyện NPC cho từng dạng câu hỏi
 * ================================================================
 * Cấu trúc: QUEST_CONTEXT[bankKey] = Array<{match, ctx}>
 *   - match: function(candidate) → true/false
 *   - ctx: { npc, npc_icon, story, task, success, fail }
 *
 * bankKey ví dụ: "math_g1", "g1_viet", "g1_science", "g1_tech"
 * hoặc "math_g1", "math_g2" cho toán inline.
 *
 * Quy ước nội dung theo cấp lớp:
 *   Lớp 1: Câu ngắn, con vật/đồ vật gần gũi, tối đa 2 câu
 *   Lớp 2: Tình huống cuộc sống (chợ, vườn, gia đình), 2 câu
 *   Lớp 3: Nhân vật thú vị hơn (phù thủy, thám tử), 2-3 câu
 *   Lớp 4: Tình huống thực tế phức tạp (xây dựng, du lịch), 2-3 câu
 *   Lớp 5: Bối cảnh khoa học/lịch sử/công nghệ, 3 câu
 */

'use strict';

// ============================================================
// HELPER: Chọn ngẫu nhiên từ mảng
// ============================================================
function _randCtx(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============================================================
// TOÁN LỚP 1 — Chú Gà Con 🐣
// Bối cảnh: đếm hạt gạo, trứng, bông hoa trong vườn
// ============================================================
const CTX_MATH_G1 = [
  {
    npc: "Gà Mẹ",
    npc_icon: "🐔",
    story: "Gà Mẹ đang đếm trứng trong ổ nhưng bị quên mất!",
    task: "Hãy giúp Gà Mẹ tính đúng để biết có bao nhiêu trứng nhé!",
    success: "Quạc quạc! Gà Mẹ cảm ơn bé yêu! Ổ trứng đã đủ rồi! 🥚",
    fail: "Ôi, bé tính chưa đúng rồi! Gà Mẹ đang lo lắng lắm. Thử lại nhé! 🐔"
  },
  {
    npc: "Chú Thỏ",
    npc_icon: "🐰",
    story: "Chú Thỏ muốn chia cà rốt cho bạn bè nhưng không biết đếm!",
    task: "Giúp Chú Thỏ tính toán để chia cà rốt đều cho các bạn nhé!",
    success: "Uiii! Chú Thỏ nhảy vui lắm! Cảm ơn bé đã giúp! 🥕",
    fail: "Chú Thỏ chưa nhận được đáp án đúng. Bé thử tính lại xem sao! 🐰"
  },
  {
    npc: "Bé Gấu",
    npc_icon: "🐻",
    story: "Bé Gấu muốn ăn mật ong nhưng cần tính đúng mới mở được hũ!",
    task: "Bé hãy tính cho Gấu nhé! Gấu đang đói lắm rồi!",
    success: "Mmm! Hũ mật ong mở ra rồi! Gấu thưởng bé một thìa mật! 🍯",
    fail: "Chưa đúng rồi bạn ơi! Hũ chưa mở được. Thử lại nào! 🐻"
  }
];

// ============================================================
// TOÁN LỚP 2 — Bác Nông Dân 👨‍🌾
// Bối cảnh: kho lương thực, mùa thu hoạch, phân chia nông sản
// ============================================================
const CTX_MATH_G2 = [
  {
    npc: "Bác Nông Dân",
    npc_icon: "👨‍🌾",
    story: "Mùa thu hoạch đến rồi! Bác cần tính số lúa để phân cho dân làng.",
    task: "Bé giúp bác tính toán để chia lúa đúng cho tất cả mọi người nhé!",
    success: "Bác cảm ơn bé nhiều lắm! Dân làng sẽ có đủ lương thực qua đông! 🌾",
    fail: "Ôi, bác chưa tính được rồi! Bé thử lại giúp bác với nhé! 👨‍🌾"
  },
  {
    npc: "Cô Ba Chợ",
    npc_icon: "🛒",
    story: "Cô Ba bán hàng ở chợ và cần tính tiền trả lại cho khách!",
    task: "Hãy giúp Cô Ba tính đúng để không thiếu tiền cho khách hàng!",
    success: "Cô Ba cảm ơn bé giỏi! Khách hàng hài lòng lắm! 🎉",
    fail: "Cô Ba tính chưa ra kết quả đúng. Bé thử lại giúp cô với!"
  },
  {
    npc: "Chú Ong Thợ",
    npc_icon: "🐝",
    story: "Chú Ong Thợ cần tính số bông hoa cần hút để đủ mật!",
    task: "Giúp Chú Ong tính đúng số hoa để làm đầy tổ mật nhé!",
    success: "Bzz bzz! Tổ ong đã đầy mật! Bé thật tuyệt vời! 🍯",
    fail: "Ong chưa đủ mật! Đáp án chưa đúng, thử lại nào bé! 🐝"
  }
];

// ============================================================
// TOÁN LỚP 3 — Phù Thủy Sao ✨
// Bối cảnh: pha chế thuốc, xây tháp phép thuật, thu thập nguyên liệu
// ============================================================
const CTX_MATH_G3 = [
  {
    npc: "Phù Thủy Sao",
    npc_icon: "🧙",
    story: "Phù Thủy Sao đang pha chế thuốc phép nhưng cần tính đúng lượng nguyên liệu!",
    task: "Bé giúp Phù Thủy tính đúng để thuốc phép không bị hỏng nhé!",
    success: "Thuốc phép phát sáng rực rỡ! Phù Thủy Sao truyền phép cho bé! ✨",
    fail: "Ôi không! Thuốc bốc khói! Đáp án chưa đúng, thử tính lại nào! 🧙"
  },
  {
    npc: "Thợ Rèn Lùn",
    npc_icon: "⚒️",
    story: "Thợ Rèn Lùn muốn đúc kiếm thần nhưng cần tính đúng lượng sắt!",
    task: "Hãy tính toán giúp Thợ Rèn để kiếm thần được đúc hoàn hảo!",
    success: "Kiếm thần sáng loá! Thợ Rèn tặng bé huy chương dũng cảm! ⚔️",
    fail: "Kiếm chưa đúc được! Đáp án còn sai, tính lại thêm một lần nhé! ⚒️"
  }
];

// ============================================================
// TOÁN LỚP 4 — Kỹ Sư Xây 🏗️
// Bối cảnh: tính nguyên vật liệu, thiết kế cầu, tính diện tích
// ============================================================
const CTX_MATH_G4 = [
  {
    npc: "Kỹ Sư Minh",
    npc_icon: "🏗️",
    story: "Kỹ Sư Minh đang thiết kế cây cầu qua sông và cần tính toán chính xác!",
    task: "Giúp Kỹ Sư tính đúng để cây cầu vững chắc và an toàn nhé!",
    success: "Cây cầu xây thành công! Kỹ Sư Minh ghi tên bé vào bảng vàng! 🌉",
    fail: "Tính toán sai sẽ làm cầu không vững! Thử lại để giúp Kỹ Sư nhé! 🏗️"
  },
  {
    npc: "Bếp Trưởng",
    npc_icon: "👨‍🍳",
    story: "Bếp Trưởng cần tính đúng nguyên liệu để nấu tiệc cho 100 người!",
    task: "Bé giúp Bếp Trưởng tính đúng để không thiếu nguyên liệu nhé!",
    success: "Bữa tiệc ngon tuyệt! Bếp Trưởng giành phần ăn ngon nhất cho bé! 🍽️",
    fail: "Thiếu nguyên liệu rồi! Đáp án chưa đúng, thử tính lại nhé! 👨‍🍳"
  }
];

// ============================================================
// TOÁN LỚP 5 — Phi Công Vũ Trụ 🚀
// Bối cảnh: điều hướng tàu, tính nhiên liệu, tỷ lệ phần trăm
// ============================================================
const CTX_MATH_G5 = [
  {
    npc: "Phi Công Hà",
    npc_icon: "🚀",
    story: "Tàu vũ trụ cần tính toán chính xác để đáp xuống Mặt Trăng an toàn!",
    task: "Bé hãy tính đúng để hệ thống điều hướng hoạt động chính xác!",
    success: "Tàu đáp xuống Mặt Trăng thành công! Phi Công Hà tự hào về bé! 🌙",
    fail: "Cảnh báo! Tính toán lệch quỹ đạo rồi! Thử lại để cứu tàu nhé! 🚀"
  },
  {
    npc: "Nhà Khoa Học Lan",
    npc_icon: "🔬",
    story: "Nhà Khoa Học Lan đang phân tích dữ liệu thực nghiệm và cần kết quả chính xác!",
    task: "Hãy giúp tính toán để bộ dữ liệu khoa học được hoàn chỉnh!",
    success: "Dữ liệu chính xác! Nhà Khoa Học Lan công bố bé là trợ lý xuất sắc! 🏆",
    fail: "Dữ liệu bị sai! Khoa học cần chính xác tuyệt đối — thử lại nhé! 🔬"
  }
];

// ============================================================
// TIẾNG VIỆT — Chú Đưa Thư 📮
// ============================================================
const CTX_VIET_G1 = [
  {
    npc: "Chú Đưa Thư",
    npc_icon: "📮",
    story: "Chú Đưa Thư làm rơi một lá thư! Chú cần bé giúp đọc và trả lời đúng.",
    task: "Bé hãy trả lời câu hỏi để giúp chú giao thư đúng địa chỉ nhé!",
    success: "Thư giao thành công! Chú Đưa Thư cảm ơn bé đã giúp! 📬",
    fail: "Ôi, địa chỉ sai rồi! Thư chưa giao được — thử lại nhé bé! 📮"
  },
  {
    npc: "Cô Giáo Hoa",
    npc_icon: "👩‍🏫",
    story: "Cô Giáo Hoa đang dạy bài nhưng cần bé giúp trả lời câu hỏi Tiếng Việt!",
    task: "Bé hãy dùng kiến thức Tiếng Việt để trả lời câu hỏi của cô nhé!",
    success: "Xuất sắc! Cô Giáo khen bé ngoan và giỏi! Được tặng điểm 10! ⭐",
    fail: "Bé ơi, câu trả lời chưa đúng. Cô tin bé sẽ làm được — thử lại nào!"
  }
];

const CTX_VIET_G2 = [
  {
    npc: "Bà Kể Chuyện",
    npc_icon: "👵",
    story: "Bà đang kể chuyện nhưng quên mất một từ quan trọng trong câu!",
    task: "Bé giúp bà chọn đúng từ để câu chuyện hay hơn nhé!",
    success: "Ôi bé giỏi quá! Câu chuyện của bà hay hẳn nhờ bé! 📖",
    fail: "Câu chuyện chưa trôi chảy! Bé thử chọn từ khác xem sao nhé! 👵"
  },
  {
    npc: "Chú Đưa Thư",
    npc_icon: "📮",
    story: "Chú Đưa Thư cần đọc đúng địa chỉ để giao bưu phẩm cho đúng nhà!",
    task: "Hãy dùng kiến thức Tiếng Việt lớp 2 để giúp chú nhé!",
    success: "Bưu phẩm đến đúng nơi! Người nhận vui lắm! 📦",
    fail: "Chưa tìm đúng địa chỉ rồi! Đọc lại câu hỏi và thử lại nhé! 📮"
  }
];

const CTX_VIET_G3 = [
  {
    npc: "Thám Tử Mèo",
    npc_icon: "🕵️",
    story: "Thám Tử Mèo đang điều tra vụ án và cần đọc hiểu văn bản quan trọng!",
    task: "Bé giúp Thám Tử phân tích đúng để tìm ra sự thật nhé!",
    success: "Vụ án được phá giải! Thám Tử Mèo kết nạp bé vào đội điều tra! 🔍",
    fail: "Suy luận chưa đúng! Thám Tử cần bé đọc lại và suy nghĩ thêm nhé! 🕵️"
  }
];

const CTX_VIET_G4 = [
  {
    npc: "Nhà Báo Trẻ",
    npc_icon: "📰",
    story: "Nhà Báo Trẻ cần dùng đúng từ ngữ để viết bài báo hay và chính xác!",
    task: "Hãy giúp Nhà Báo chọn từ đúng để bài báo được đăng nhé!",
    success: "Bài báo hay tuyệt! Nhà Báo Trẻ đăng bài và ghi tên bé vào! 📰",
    fail: "Từ ngữ chưa phù hợp! Đọc lại câu hỏi và thử chọn từ khác nhé! 📝"
  }
];

const CTX_VIET_G5 = [
  {
    npc: "Nhà Văn Cao",
    npc_icon: "✍️",
    story: "Nhà Văn Cao đang viết cuốn sách và cần bé kiểm tra Tiếng Việt lớp 5!",
    task: "Dùng kiến thức của bé để giúp Nhà Văn hoàn thành tác phẩm nhé!",
    success: "Cuốn sách hoàn thành xuất sắc! Nhà Văn dành trang đầu để cảm ơn bé! 📚",
    fail: "Câu chưa đúng ngữ pháp! Nhà Văn tin bé có thể làm tốt hơn — thử lại! ✍️"
  }
];

// ============================================================
// KHOA HỌC — Nàng Tiên Rừng 🌿
// ============================================================
const CTX_SCIENCE_G1 = [
  {
    npc: "Tiên Rừng",
    npc_icon: "🌿",
    story: "Tiên Rừng đang chăm sóc khu vườn kỳ diệu và cần bé trả lời câu hỏi!",
    task: "Hãy dùng hiểu biết về thiên nhiên để giúp Tiên Rừng nhé!",
    success: "Khu vườn nở hoa rực rỡ! Tiên Rừng tặng bé hạt giống may mắn! 🌸",
    fail: "Cây chưa nở hoa! Câu trả lời chưa đúng — thử lại để giúp Tiên Rừng nhé! 🌿"
  }
];

const CTX_SCIENCE_G2 = [
  {
    npc: "Bác Sĩ Vườn",
    npc_icon: "🌱",
    story: "Bác Sĩ Vườn đang chữa bệnh cho cây nhưng cần biết kiến thức đúng!",
    task: "Bé trả lời đúng để giúp Bác Sĩ cứu khu vườn nhé!",
    success: "Cây xanh tươi trở lại! Bác Sĩ Vườn thưởng bé huy hiệu bảo vệ thiên nhiên! 🌿",
    fail: "Cây vẫn chưa khỏe! Thử lại với câu trả lời khác nhé bé! 🌱"
  }
];

const CTX_SCIENCE_G3 = [
  {
    npc: "Nhà Thám Hiểm",
    npc_icon: "🧭",
    story: "Nhà Thám Hiểm đang khám phá rừng nhiệt đới và cần kiến thức khoa học!",
    task: "Hãy trả lời đúng để giúp Nhà Thám Hiểm tiếp tục hành trình nhé!",
    success: "Bản đồ rừng được hoàn thành! Nhà Thám Hiểm đặt tên bé lên bản đồ! 🗺️",
    fail: "Đường đi bị lạc! Kiến thức chưa đúng — thử lại để tìm đường nhé! 🧭"
  }
];

const CTX_SCIENCE_G4 = [
  {
    npc: "Giáo Sư Khoa",
    npc_icon: "🔭",
    story: "Giáo Sư Khoa đang thí nghiệm trong phòng lab và cần trợ lý giỏi!",
    task: "Bé trả lời đúng câu hỏi khoa học để thí nghiệm thành công nhé!",
    success: "Thí nghiệm thành công! Giáo Sư Khoa mời bé tham gia đội nghiên cứu! 🏆",
    fail: "Thí nghiệm chưa thành công! Kiến thức cần chính xác — thử lại nhé! 🔭"
  }
];

const CTX_SCIENCE_G5 = [
  {
    npc: "Phi Hành Gia",
    npc_icon: "👨‍🚀",
    story: "Phi Hành Gia cần kiến thức khoa học để hoàn thành nhiệm vụ không gian!",
    task: "Hãy dùng kiến thức khoa học lớp 5 để giúp Phi Hành Gia nhé!",
    success: "Nhiệm vụ hoàn thành! Phi Hành Gia đặt tên bé lên ngôi sao mới tìm! ⭐",
    fail: "Tàu cần dữ liệu chính xác hơn! Thử lại để giúp Phi Hành Gia nhé! 👨‍🚀"
  }
];

// ============================================================
// TIN HỌC — Robot Nhí 🤖
// ============================================================
const CTX_TECH_G1 = [
  {
    npc: "Robot Nhí",
    npc_icon: "🤖",
    story: "Robot Nhí bị lỗi! Bé cần trả lời đúng để Robot hoạt động trở lại!",
    task: "Hãy dùng kiến thức máy tính để sửa lỗi cho Robot Nhí nhé!",
    success: "Robot Nhí hoạt động trở lại! Cảm ơn bé đã sửa được lỗi! ⚡",
    fail: "Lỗi chưa được sửa! Thử lại với đáp án đúng để cứu Robot nhé! 🤖"
  }
];

const CTX_TECH_G2 = [
  {
    npc: "Cô Lập Trình",
    npc_icon: "💻",
    story: "Cô Lập Trình đang dạy bé sử dụng máy tính nhưng cần bé ghi nhớ kiến thức!",
    task: "Trả lời đúng để chứng minh bé là học sinh giỏi tin học nhé!",
    success: "Bé qua được bài kiểm tra! Cô Lập Trình thưởng bé giải thưởng Sao Vàng! ⭐",
    fail: "Câu trả lời chưa đúng! Cô Lập Trình khuyến khích bé thử lại nhé! 💻"
  }
];

const CTX_TECH_G3 = [
  {
    npc: "Hacker Tốt",
    npc_icon: "🛡️",
    story: "Hacker Tốt đang bảo vệ máy tính khỏi virus và cần bé giúp nhập mã bảo mật!",
    task: "Trả lời đúng để kích hoạt lá chắn bảo vệ máy tính nhé!",
    success: "Lá chắn kích hoạt! Máy tính an toàn nhờ bé! Hacker Tốt thưởng bé! 🔐",
    fail: "Mã bảo mật sai rồi! Virus đang tấn công — thử lại nhanh nhé! 🛡️"
  }
];

const CTX_TECH_G4 = [
  {
    npc: "Kỹ Sư Phần Mềm",
    npc_icon: "⚙️",
    story: "Kỹ Sư Phần Mềm cần lập trình nhưng bị mắc câu hỏi này và cần bé giúp!",
    task: "Dùng kiến thức tin học lớp 4 để giải quyết vấn đề kỹ thuật nhé!",
    success: "Code chạy thành công! Kỹ Sư Phần Mềm mời bé thực tập tại công ty! 💼",
    fail: "Code bị lỗi! Kiến thức chưa chính xác — debug lại nhé bé! ⚙️"
  }
];

const CTX_TECH_G5 = [
  {
    npc: "AI Thông Minh",
    npc_icon: "🧠",
    story: "AI Thông Minh đang học hỏi từ bé để trở nên giỏi hơn — AI cần bé dạy!",
    task: "Hãy trả lời đúng để AI học được kiến thức tin học chính xác nhé!",
    success: "AI đã học xong! Bé là người thầy xuất sắc nhất! 🤖✨",
    fail: "AI học sai rồi! Bé cần chỉnh lại kiến thức để AI học đúng nhé! 🧠"
  }
];

// ============================================================
// BẢNG ÁNH XẠ bankKey → Mảng Context
// ============================================================
const QUEST_CONTEXT_MAP = {
  // Toán inline (math_g1 ... math_g5)
  'math_g1': CTX_MATH_G1,
  'math_g2': CTX_MATH_G2,
  'math_g3': CTX_MATH_G3,
  'math_g4': CTX_MATH_G4,
  'math_g5': CTX_MATH_G5,

  // Tiếng Việt
  'g1_viet': CTX_VIET_G1,
  'g2_viet': CTX_VIET_G2,
  'g3_viet': CTX_VIET_G3,
  'g4_viet': CTX_VIET_G4,
  'g5_viet': CTX_VIET_G5,

  // Khoa học / Tự nhiên-Xã hội
  'g1_science': CTX_SCIENCE_G1,
  'g2_science': CTX_SCIENCE_G2,
  'g3_science': CTX_SCIENCE_G3,
  'g4_science': CTX_SCIENCE_G4,
  'g5_science': CTX_SCIENCE_G5,

  // Tin học / Công nghệ
  'g1_tech': CTX_TECH_G1,
  'g2_tech': CTX_TECH_G2,
  'g3_tech': CTX_TECH_G3,
  'g4_tech': CTX_TECH_G4,
  'g5_tech': CTX_TECH_G5,
};

/**
 * Lấy một context ngẫu nhiên cho bankKey.
 * @param {string} bankKey - ví dụ "math_g2", "g3_viet"
 * @returns {object|null} ctx object hoặc null nếu không có
 */
function getQuestContext(bankKey) {
  const arr = QUEST_CONTEXT_MAP[bankKey];
  if (!arr || arr.length === 0) return null;
  return _randCtx(arr);
}

// Expose ra global scope (dùng trong main.js)
window.getQuestContext = getQuestContext;
