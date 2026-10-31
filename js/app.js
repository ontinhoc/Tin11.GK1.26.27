/**
 * APP.JS - QUẢN LÝ LUỒNG HOẠT ĐỘNG, RENDER GIAO DIỆN VÀ CHẤM ĐIỂM
 */

document.addEventListener("DOMContentLoaded", () => {
  // Trạng thái ứng dụng (Application State)
  const state = {
    student: {
      name: "",
      className: ""
    },
    answers: {}, // Lưu câu trả lời: { qId: answerValue }
    startTime: null,
    endTime: null,
    timeRemaining: 0,
    timerInterval: null,
    totalPointsPart1: 0,
    totalPointsPart2: 0,
    totalScore: 0
  };

  // DOM Elements
  const screens = {
    start: document.getElementById("screen-start"),
    exam: document.getElementById("screen-exam"),
    result: document.getElementById("screen-result")
  };

  const loginForm = document.getElementById("form-login");
  const studentNameInput = document.getElementById("student-name");
  const studentClassInput = document.getElementById("student-class");
  const questionsContainer = document.getElementById("questions-container");
  const timerDisplay = document.getElementById("timer-display");
  const timerBox = document.getElementById("timer-box");
  const progressText = document.getElementById("progress-text");
  const progressBarFill = document.getElementById("progress-bar-fill");
  const btnSubmitExam = document.getElementById("btn-submit-exam");

  // Modal elements
  const modalConfirm = document.getElementById("modal-confirm");
  const modalConfirmMsg = document.getElementById("modal-confirm-msg");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  const modalConfirmBtn = document.getElementById("modal-confirm-btn");

  // Khởi tạo trang ban đầu
  initApp();

  function initApp() {
    document.getElementById("intro-title").textContent = EXAM_CONFIG.title;
    document.getElementById("intro-subject").textContent = EXAM_CONFIG.subject;
    document.getElementById("intro-time").textContent = EXAM_CONFIG.durationMinutes;
    document.getElementById("intro-count").textContent = QUESTIONS_DATA.length;

    // Gán sự kiện Form đăng nhập
    loginForm.addEventListener("submit", handleLoginSubmit);

    // Gán sự kiện Nộp bài
    btnSubmitExam.addEventListener("click", handleOpenConfirmModal);
    modalCancelBtn.addEventListener("click", () => modalConfirm.classList.remove("active"));
    modalConfirmBtn.addEventListener("click", () => {
      modalConfirm.classList.remove("active");
      finishExam();
    });

    // Sự kiện nút In kết quả & Làm lại
    document.getElementById("btn-print").addEventListener("click", () => window.print());
    document.getElementById("btn-restart").addEventListener("click", () => {
      if (confirm("Em có muốn đăng xuất và bắt đầu làm bài lại từ đầu?")) {
        window.location.reload();
      }
    });
  }

  // ==========================================
  // XỬ LÝ CHUYỂN MÀN HÌNH
  // ==========================================
  function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove("active"));
    screens[screenName].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ==========================================
  // MÀN HÌNH 1 -> MÀN HÌNH 2: BẮT ĐẦU THI
  // ==========================================
  function handleLoginSubmit(e) {
    e.preventDefault();
    const name = studentNameInput.value.trim();
    const className = studentClassInput.value.trim();

    if (!name || !className) {
      alert("Vui lòng nhập đầy đủ Họ tên và Lớp học!");
      return;
    }

    state.student.name = name;
    state.student.className = className;
    state.startTime = new Date();

    // Hiển thị thông tin lên Header bài thi
    document.getElementById("exam-student-name").textContent = name;
    document.getElementById("exam-student-class").textContent = "Lớp: " + className;

    // Render danh sách câu hỏi
    renderQuestions();

    // Bắt đầu đếm ngược thời gian
    startTimer(EXAM_CONFIG.durationMinutes * 60);

    // Chuyển màn hình
    showScreen("exam");
    updateProgress();
  }

  // ==========================================
  // ĐỒNG HỒ ĐẾM NGƯỢC
  // ==========================================
  function startTimer(durationSeconds) {
    state.timeRemaining = durationSeconds;
    updateTimerDisplay();

    state.timerInterval = setInterval(() => {
      state.timeRemaining--;
      updateTimerDisplay();

      if (state.timeRemaining <= 300) { // Dưới 5 phút
        timerBox.classList.add("urgent");
      }

      if (state.timeRemaining <= 0) {
        clearInterval(state.timerInterval);
        alert("Đã hết thời gian làm bài! Hệ thống sẽ tự động nộp bài.");
        finishExam();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(state.timeRemaining / 60);
    const seconds = state.timeRemaining % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  // ==========================================
  // RENDER CÂU HỎI THEO 3 DẠNG
  // ==========================================
  function renderQuestions() {
    questionsContainer.innerHTML = "";
    let currentSection = "";

    QUESTIONS_DATA.forEach((q, index) => {
      // Nếu qua phần thi mới thì chèn banner phân cách
      if (q.section && q.section !== currentSection) {
        currentSection = q.section;
        const sectionBanner = document.createElement("div");
        sectionBanner.className = "section-header-banner";
        sectionBanner.innerHTML = `<span>📑</span> <span>${currentSection}</span>`;
        questionsContainer.appendChild(sectionBanner);
      }

      const qCard = document.createElement("div");
      qCard.className = "question-card";
      qCard.id = `card-${q.id}`;

      let questionHtml = `
        <div class="question-meta">
          <span class="question-number">Câu ${index + 1}</span>
          <span class="question-points">${getQuestionPointLabel(q)}</span>
        </div>
        <div class="question-title">${q.content}</div>
      `;

      // Render nội dung tương ứng theo dạng câu hỏi
      if (q.type === "multiple_choice") {
        questionHtml += renderMultipleChoice(q);
      } else if (q.type === "true_false") {
        questionHtml += renderTrueFalse(q);
      } else if (q.type === "essay") {
        questionHtml += renderEssay(q);
      }

      qCard.innerHTML = questionHtml;
      questionsContainer.appendChild(qCard);
    });

    // Gán sự kiện tương tác sau khi render DOM
    attachQuestionEvents();
  }

  function getQuestionPointLabel(q) {
    if (q.type === "multiple_choice") return `${q.point} điểm`;
    if (q.type === "true_false") return "Tối đa 1.0 điểm";
    if (q.type === "essay") return "Tự luận";
    return "";
  }

  // Render Dạng 1: Trắc nghiệm 4 lựa chọn
  function renderMultipleChoice(q) {
    let html = `<div class="options-list">`;
    q.options.forEach(opt => {
      html += `
        <label class="option-item" id="opt-container-${q.id}-${opt.key}">
          <input type="radio" name="answer_${q.id}" value="${opt.key}" data-qid="${q.id}">
          <span class="option-label"><strong>${opt.key}.</strong> ${opt.text}</span>
        </label>
      `;
    });
    html += `</div>`;
    return html;
  }

  // Render Dạng 2: Đúng / Sai
  function renderTrueFalse(q) {
    let html = `<div class="tf-items-list">`;
    q.items.forEach(item => {
      html += `
        <div class="tf-item" id="tf-row-${q.id}-${item.id}">
          <div class="tf-text">
            <span class="tf-sub-id">${item.id})</span> ${item.text}
          </div>
          <div class="tf-btn-group">
            <button type="button" class="tf-btn" data-qid="${q.id}" data-itemid="${item.id}" data-val="true">Đúng</button>
            <button type="button" class="tf-btn" data-qid="${q.id}" data-itemid="${item.id}" data-val="false">Sai</button>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    return html;
  }

  // Render Dạng 3: Tự luận
  function renderEssay(q) {
    return `
      <textarea 
        class="essay-textarea" 
        data-qid="${q.id}" 
        placeholder="${q.placeholder || 'Nhập câu trả lời của em...'}"
      ></textarea>
    `;
  }

  // Gán sự kiện lắng nghe tương tác trả lời
  function attachQuestionEvents() {
    // 1. Sự kiện Dạng 1 (Radio)
    document.querySelectorAll("input[type='radio']").forEach(radio => {
      radio.addEventListener("change", (e) => {
        const qId = e.target.getAttribute("data-qid");
        const val = e.target.value;
        state.answers[qId] = val;

        // Cập nhật giao diện radio được chọn
        document.querySelectorAll(`[id^="opt-container-${qId}-"]`).forEach(el => el.classList.remove("selected"));
        document.getElementById(`opt-container-${qId}-${val}`).classList.add("selected");

        markCardAnswered(qId, true);
        updateProgress();
      });
    });

    // 2. Sự kiện Dạng 2 (Đúng / Sai)
    document.querySelectorAll(".tf-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const qId = e.target.getAttribute("data-qid");
        const itemId = e.target.getAttribute("data-itemid");
        const val = e.target.getAttribute("data-val") === "true";

        if (!state.answers[qId]) {
          state.answers[qId] = {};
        }
        state.answers[qId][itemId] = val;

        // Cập nhật màu nút bấm trong nhóm
        const parentGroup = e.target.closest(".tf-btn-group");
        parentGroup.querySelectorAll(".tf-btn").forEach(b => {
          b.classList.remove("selected-true", "selected-false");
        });
        e.target.classList.add(val ? "selected-true" : "selected-false");

        // Kiểm tra xem đã trả lời đủ 4 ý (a, b, c, d) chưa
        const questionData = QUESTIONS_DATA.find(item => item.id === qId);
        const answeredCount = Object.keys(state.answers[qId]).length;
        const isComplete = answeredCount === questionData.items.length;
        markCardAnswered(qId, isComplete);
        updateProgress();
      });
    });

    // 3. Sự kiện Dạng 3 (Tự luận textarea)
    document.querySelectorAll(".essay-textarea").forEach(textarea => {
      textarea.addEventListener("input", (e) => {
        const qId = e.target.getAttribute("data-qid");
        const val = e.target.value.trim();
        state.answers[qId] = val;

        markCardAnswered(qId, val.length > 0);
        updateProgress();
      });
    });
  }

  function markCardAnswered(qId, isAnswered) {
    const card = document.getElementById(`card-${qId}`);
    if (card) {
      if (isAnswered) {
        card.classList.add("answered");
      } else {
        card.classList.remove("answered");
      }
    }
  }

  // ==========================================
  // CẬP NHẬT TIẾN ĐỘ LÀM BÀI
  // ==========================================
  function updateProgress() {
    let answeredQuestionsCount = 0;

    QUESTIONS_DATA.forEach(q => {
      if (q.type === "multiple_choice" && state.answers[q.id]) {
        answeredQuestionsCount++;
      } else if (q.type === "true_false") {
        if (state.answers[q.id] && Object.keys(state.answers[q.id]).length === q.items.length) {
          answeredQuestionsCount++;
        }
      } else if (q.type === "essay" && state.answers[q.id] && state.answers[q.id].length > 0) {
        answeredQuestionsCount++;
      }
    });

    const total = QUESTIONS_DATA.length;
    const percentage = Math.round((answeredQuestionsCount / total) * 100);

    progressText.textContent = `Đã làm: ${answeredQuestionsCount}/${total} câu`;
    progressBarFill.style.width = `${percentage}%`;
  }

  // ==========================================
  // XÁC NHẬN NỘP BÀI
  // ==========================================
  function handleOpenConfirmModal() {
    let unansweredCount = 0;

    QUESTIONS_DATA.forEach(q => {
      if (q.type === "multiple_choice" && !state.answers[q.id]) {
        unansweredCount++;
      } else if (q.type === "true_false") {
        const answeredSubCount = state.answers[q.id] ? Object.keys(state.answers[q.id]).length : 0;
        if (answeredSubCount < q.items.length) {
          unansweredCount++;
        }
      } else if (q.type === "essay" && (!state.answers[q.id] || state.answers[q.id].length === 0)) {
        unansweredCount++;
      }
    });

    if (unansweredCount > 0) {
      modalConfirmMsg.innerHTML = `Em còn <strong>${unansweredCount} câu</strong> chưa hoàn thành.<br>Em có chắc chắn muốn nộp bài ngay bây giờ?`;
    } else {
      modalConfirmMsg.textContent = "Em đã hoàn thành tất cả các câu hỏi! Nhấn 'Đồng ý' để nộp bài và xem điểm.";
    }

    modalConfirm.classList.add("active");
  }

  // ==========================================
  // CHẤM ĐIỂM VÀ NỘP BÀI
  // ==========================================
  function finishExam() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.endTime = new Date();

    const durationSeconds = Math.round((state.endTime - state.startTime) / 1000);
    const durationMinutes = (durationSeconds / 60).toFixed(1);

    // 1. Tính điểm
    let p1Points = 0;
    let p2Points = 0;
    const evaluationResults = [];

    QUESTIONS_DATA.forEach((q, index) => {
      if (q.type === "multiple_choice") {
        const studentChoice = state.answers[q.id];
        const isCorrect = studentChoice === q.correctAnswer;
        const earned = isCorrect ? q.point : 0;
        p1Points += earned;

        evaluationResults.push({
          index: index + 1,
          id: q.id,
          type: q.type,
          content: q.content,
          studentChoice: studentChoice || "Chưa làm",
          correctAnswer: q.correctAnswer,
          isCorrect: isCorrect,
          earnedPoints: earned,
          explanation: q.explanation
        });
      } else if (q.type === "true_false") {
        const studentSubAnswers = state.answers[q.id] || {};
        let correctSubCount = 0;
        const subDetails = [];

        q.items.forEach(item => {
          const studentVal = studentSubAnswers[item.id];
          const isMatched = studentVal === item.isCorrect;
          if (isMatched) correctSubCount++;

          subDetails.push({
            id: item.id,
            text: item.text,
            studentVal: studentVal !== undefined ? (studentVal ? "Đúng" : "Sai") : "Chưa chọn",
            correctVal: item.isCorrect ? "Đúng" : "Sai",
            isMatched: isMatched
          });
        });

        // Áp dụng barem chuẩn Bộ GD&ĐT
        const earned = EXAM_CONFIG.trueFalseScoringMatrix[correctSubCount] || 0.0;
        p2Points += earned;

        evaluationResults.push({
          index: index + 1,
          id: q.id,
          type: q.type,
          content: q.content,
          subDetails: subDetails,
          correctSubCount: correctSubCount,
          earnedPoints: earned,
          explanation: q.explanation
        });
      } else if (q.type === "essay") {
        const studentText = state.answers[q.id] || "(Chưa nhập câu trả lời)";
        evaluationResults.push({
          index: index + 1,
          id: q.id,
          type: q.type,
          content: q.content,
          studentText: studentText,
          suggestedAnswer: q.suggestedAnswer,
          rubric: q.rubric
        });
      }
    });

    state.totalPointsPart1 = Number(p1Points.toFixed(2));
    state.totalPointsPart2 = Number(p2Points.toFixed(2));
    state.totalScore = Number((state.totalPointsPart1 + state.totalPointsPart2).toFixed(2));

    // 2. Hiển thị kết quả lên giao diện
    renderResultsView(durationMinutes, evaluationResults);

    // 3. Gửi payload ngầm lên Google Apps Script
    syncToGoogleSheets(durationMinutes, evaluationResults);

    // Chuyển sang màn hình 3
    showScreen("result");
  }

  // ==========================================
  // RENDER MÀN HÌNH KẾT QUẢ & ĐỐI CHIẾU
  // ==========================================
  function renderResultsView(durationMinutes, results) {
    document.getElementById("result-student-info").textContent = 
      `${state.student.name} - Lớp ${state.student.className}`;
    document.getElementById("score-total-val").textContent = state.totalScore.toFixed(2);
    document.getElementById("score-p1-val").textContent = `${state.totalPointsPart1} đ`;
    document.getElementById("score-p2-val").textContent = `${state.totalPointsPart2} đ`;
    document.getElementById("score-time-val").textContent = `${durationMinutes} phút`;

    const reviewContainer = document.getElementById("review-container");
    reviewContainer.innerHTML = "";

    results.forEach(res => {
      const itemEl = document.createElement("div");
      itemEl.className = "review-item";

      if (res.type === "multiple_choice") {
        itemEl.classList.add(res.isCorrect ? "status-correct" : "status-wrong");
        itemEl.innerHTML = `
          <div class="review-badge ${res.isCorrect ? 'badge-correct' : 'badge-wrong'}">
            ${res.isCorrect ? '✓ Đúng (+ ' + res.earnedPoints + 'đ)' : '✗ Sai (0 đ)'}
          </div>
          <div class="question-title"><strong>Câu ${res.index}:</strong> ${res.content}</div>
          <div style="font-size: 0.95rem; margin: 0.5rem 0;">
            <div>• Đáp án em chọn: <strong>${res.studentChoice}</strong></div>
            <div>• Đáp án đúng: <strong style="color: var(--success);">${res.correctAnswer}</strong></div>
          </div>
          ${res.explanation ? `<div class="explanation-box"><strong>💡 Lời giải chi tiết:</strong> ${res.explanation}</div>` : ''}
        `;
      } else if (res.type === "true_false") {
        const isFull = res.correctSubCount === 4;
        itemEl.classList.add(isFull ? "status-correct" : (res.correctSubCount > 0 ? "status-essay" : "status-wrong"));

        let subListHtml = `<div style="margin: 0.5rem 0; font-size: 0.9rem;">`;
        res.subDetails.forEach(sub => {
          const icon = sub.isMatched ? "✅" : "❌";
          subListHtml += `
            <div style="padding: 4px 0; border-bottom: 1px dashed var(--border-color);">
              ${icon} <strong>${sub.id})</strong> ${sub.text} 
              <br><small style="color: var(--text-muted); margin-left: 20px;">
                Em chọn: <strong>${sub.studentVal}</strong> | Đáp án: <strong>${sub.correctVal}</strong>
              </small>
            </div>
          `;
        });
        subListHtml += `</div>`;

        itemEl.innerHTML = `
          <div class="review-badge ${isFull ? 'badge-correct' : 'badge-essay'}">
            Đúng ${res.correctSubCount}/4 ý (+ ${res.earnedPoints} đ)
          </div>
          <div class="question-title"><strong>Câu ${res.index}:</strong> ${res.content}</div>
          ${subListHtml}
          ${res.explanation ? `<div class="explanation-box"><strong>💡 Lời giải chi tiết:</strong> ${res.explanation}</div>` : ''}
        `;
      } else if (res.type === "essay") {
        itemEl.classList.add("status-essay");
        itemEl.innerHTML = `
          <div class="review-badge badge-essay">📝 Câu Tự luận / Trả lời ngắn</div>
          <div class="question-title"><strong>Câu ${res.index}:</strong> ${res.content}</div>
          
          <div class="essay-compare-grid">
            <div class="essay-box-student">
              <strong>✍️ Bài làm của em:</strong>
              <div style="white-space: pre-wrap; margin-top: 6px;">${escapeHtml(res.studentText)}</div>
            </div>
            <div class="essay-box-suggested">
              <strong style="color: #065f46;">📖 Đáp án gợi ý & Biểu điểm:</strong>
              <div style="white-space: pre-wrap; margin-top: 6px;">${escapeHtml(res.suggestedAnswer)}</div>
              ${res.rubric ? `<div style="margin-top: 8px; font-size: 0.85rem; color: #047857; border-top: 1px dashed #a7f3d0; padding-top: 6px;">${escapeHtml(res.rubric)}</div>` : ''}
            </div>
          </div>
        `;
      }

      reviewContainer.appendChild(itemEl);
    });
  }

  // ==========================================
  // ĐỒNG BỘ DỮ LIỆU LÊN GOOGLE SHEETS (WEBHOOK)
  // ==========================================
  function syncToGoogleSheets(durationMinutes, results) {
    const syncStatusEl = document.getElementById("sync-status");
    const syncTextEl = document.getElementById("sync-text");

    if (!EXAM_CONFIG.gasWebhookUrl || EXAM_CONFIG.gasWebhookUrl.trim() === "") {
      syncStatusEl.className = "sync-banner sync-loading";
      syncTextEl.textContent = "ℹ️ Đã hoàn thành bài thi (Chưa cấu hình Google Apps Script URL trong data.js).";
      return;
    }

    // Tách riêng nội dung tự luận để giáo viên dễ chấm
    const essayAnswersSummary = results
      .filter(r => r.type === "essay")
      .map(r => `[Câu ${r.index}]: ${r.studentText}`)
      .join("\n---\n");

    // Chi tiết trắc nghiệm dạng chuỗi tóm tắt
    const testDetailsSummary = results
      .filter(r => r.type !== "essay")
      .map(r => {
        if (r.type === "multiple_choice") {
          return `C${r.index}: ${r.studentChoice} (${r.isCorrect ? 'Đ' : 'S'})`;
        } else {
          return `C${r.index} (${r.correctSubCount}/4): ` + r.subDetails.map(s => `${s.id}:${s.studentVal}`).join(",");
        }
      })
      .join(" | ");

    const payload = {
      timestamp: new Date().toLocaleString("vi-VN"),
      studentName: state.student.name,
      studentClass: state.student.className,
      totalScore: state.totalScore,
      part1Score: state.totalPointsPart1,
      part2Score: state.totalPointsPart2,
      duration: `${durationMinutes} phút`,
      quizDetails: testDetailsSummary,
      essayAnswer: essayAnswersSummary
    };

    // Gửi POST request dạng JSON (sử dụng text/plain để tránh CORS preflight với Google Apps Script)
    fetch(EXAM_CONFIG.gasWebhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    })
      .then(() => {
        syncStatusEl.className = "sync-banner sync-success";
        syncTextEl.textContent = "✅ Kết quả và bài làm tự luận đã được lưu thành công vào Google Sheets!";
      })
      .catch(err => {
        console.error("Lỗi đồng bộ Google Sheets:", err);
        syncStatusEl.className = "sync-banner sync-failed";
        syncTextEl.textContent = "⚠️ Không thể kết nối với Google Sheets. Vui lòng chụp màn hình kết quả!";
      });
  }

  function escapeHtml(text) {
    if (!text) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
