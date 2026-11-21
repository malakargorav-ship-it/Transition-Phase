(() => {
  const $ = id => document.getElementById(id);
  const section = $("fullMockSection");
  if (!section) return;
  let active = null, index = 0, answers = [], timer = null, deadline = 0;
  const message = (text, bad = false) => {
    $("fullMockFeedback").textContent = text;
    $("fullMockFeedback").classList.toggle("error", bad);
  };
  const api = async (url, body) => {
    const response = await fetch(url, {
      method: "POST", credentials: "same-origin",
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Request failed (" + response.status + ").");
    return payload;
  };
  const render = () => {
    if (!active) return;
    const q = active.questions[index];
    $("fullMockCounter").textContent = "QUESTION " + (index + 1) + " / 100";
    $("fullMockSubject").textContent = q.subject;
    $("fullMockQuestion").textContent = q.question;
    $("fullMockOptions").innerHTML = "";
    q.options.forEach((option, i) => {
      const label = document.createElement("label");
      label.className = "full-mock-option";
      const input = document.createElement("input");
      input.type = "radio"; input.name = "fullMockAnswer"; input.value = i;
      input.checked = answers[index] === i;
      input.addEventListener("change", () => { answers[index] = i; renderPalette(); });
      const span = document.createElement("span");
      span.textContent = String.fromCharCode(65 + i) + ". " + option;
      label.append(input, span); $("fullMockOptions").append(label);
    });
    $("fullMockPrev").disabled = index === 0;
    $("fullMockNext").textContent = index === 99 ? "Review answers" : "Next question";
    renderPalette();
  };
  const renderPalette = () => {
    $("fullMockPalette").innerHTML = "";
    active.questions.forEach((_, i) => {
      const button = document.createElement("button");
      button.type = "button"; button.textContent = String(i + 1);
      button.className = "full-mock-palette-item" + (i === index ? " current" : "") + (answers[i] !== null ? " answered" : "");
      button.addEventListener("click", () => { index = i; render(); });
      $("fullMockPalette").append(button);
    });
    $("fullMockAnswered").textContent = answers.filter(x => x !== null).length + " / 100 answered";
  };
  const finish = async () => {
    if (!active) return;
    $("fullMockSubmit").disabled = true;
    try {
      const result = await api("/api/mock/submit", { questionSetId: active.questionSetId, answers });
      clearInterval(timer); active = null;
      $("fullMockExam").hidden = true; $("fullMockResult").hidden = false;
      $("fullMockResult").innerHTML = "";
      const h = document.createElement("h3"); h.textContent = "Mock completed";
      const score = document.createElement("strong"); score.className = "full-mock-score";
      score.textContent = result.score + " / " + result.totalMarks;
      const stats = document.createElement("p");
      stats.textContent = "Correct: " + result.correct + " · Wrong: " + result.wrong + " · Unattempted: " + result.unattempted + " · Accuracy: " + result.accuracy + "%";
      const note = document.createElement("p");
      note.textContent = result.examTrack === "si" ? "Historical SI CWT-2025 marking-style practice result; not a prediction of current-cycle selection." : "General Constable practice result. No negative marking.";
      $("fullMockResult").append(h, score, stats, note);
      message("Result securely calculated and saved on the server.");
    } catch (error) {
      $("fullMockSubmit").disabled = false; message(error.message, true);
    }
  };
  const tick = () => {
    const remaining = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
    const hh = String(Math.floor(remaining / 3600)).padStart(2, "0");
    const mm = String(Math.floor(remaining % 3600 / 60)).padStart(2, "0");
    const ss = String(remaining % 60).padStart(2, "0");
    $("fullMockTimer").textContent = hh + ":" + mm + ":" + ss;
    if (remaining === 0) finish();
  };
  $("startFullMock").addEventListener("click", async () => {
    const track = $("fullMockTrack").value;
    $("startFullMock").disabled = true; message("Preparing a randomized 100-question paper…");
    try {
      const data = await api("/api/mock/start", { examTrack: track });
      active = data; index = 0; answers = Array(100).fill(null);
      deadline = new Date(data.expiresAt).getTime();
      $("fullMockResult").hidden = true; $("fullMockExam").hidden = false;
      $("fullMockExamNote").textContent = data.note;
      $("fullMockMarking").textContent = "100 questions · 120 minutes · +" + data.marking.correct + " correct · " + data.marking.wrong + " wrong";
      $("fullMockSubmit").disabled = false;
      render(); tick(); clearInterval(timer); timer = setInterval(tick, 1000);
      message("Exam started. Your answers and score are handled by the server.");
    } catch (error) { message(error.message, true); }
    finally { $("startFullMock").disabled = false; }
  });
  $("fullMockPrev").addEventListener("click", () => { if (index > 0) { index--; render(); } });
  $("fullMockNext").addEventListener("click", () => { index = Math.min(99, index + 1); render(); });
  $("fullMockSubmit").addEventListener("click", () => {
    const unanswered = answers.filter(x => x === null).length;
    if (unanswered && !window.confirm("You have " + unanswered + " unanswered questions. Submit the mock?")) return;
    finish();
  });
  $("fullMockTrack").addEventListener("change", () => {
    const si = $("fullMockTrack").value === "si";
    $("fullMockPatternHint").textContent = si
      ? "Historical CWT-2025 practice: 100 marks, 120 minutes, −0.5 for each wrong answer. Latest SI cycle rules require official confirmation."
      : "General Constable UB/AB: 100 MCQs, 50 marks, 120 minutes, no negative marking. Subject split shown is platform practice allocation, not an official count.";
  });
})();
