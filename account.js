(() => {
  const $ = id => document.getElementById(id);
  const ADMIN_EMAIL = "malakargorav@gmail.com";
  const api = async (path, options = {}) => {
    const response = await fetch(path, { credentials: "same-origin", ...options,
      headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Request failed. Please try again.");
    return data;
  };
  const feedback = (id, message) => { const el = $(id); if (el) el.textContent = message || ""; };
  const formData = form => Object.fromEntries(new FormData(form).entries());

  function showSignedOut() {
    $("authForms").hidden = false; $("signedInPanel").hidden = true;
    $("accountStatus").textContent = "SIGNED OUT";
    $("accountHeading").textContent = "Student account";
    $("accountMessage").textContent = "Login or create an account to keep your preparation connected to your profile.";
  }
  async function showSignedIn(user) {
    const active = localStorage.getItem("tp-active-user");
    if (active !== user.id) { localStorage.setItem("tp-active-user", user.id); try { const remote = await api("/api/progress/state", { method: "GET" }); if (remote.snapshot) { const snapshot = remote.snapshot; snapshot.adaptive = snapshot.adaptive || {}; ["si","constable"].forEach(track => { const stageNumbers = (remote.unlocks || []).filter(x => x.exam_track === track).map(x => Number(String(x.stage_id).replace("stage-",""))).filter(Number.isFinite); const maxStage = stageNumbers.length ? Math.max(...stageNumbers) : 1; const key = track + "|number-system"; const oldProgress = snapshot.adaptive[key] || {}; snapshot.adaptive[key] = { ...oldProgress, level: maxStage, selectedLevel: maxStage, unlocked: maxStage }; const topicUnlocks = remote.topicUnlocks || []; const topicIds = [...new Set(topicUnlocks.filter(x => x.exam_track === track).map(x => x.topic_id))]; topicIds.forEach(topicId => { const nums = topicUnlocks.filter(x => x.exam_track === track && x.topic_id === topicId).map(x => Number(String(x.stage_id).replace("stage-",""))).filter(Number.isFinite); const max = nums.length ? Math.max(...nums) : 1; const k = track + "|" + topicId; const old = snapshot.adaptive[k] || {}; snapshot.adaptive[k] = { ...old, level: max, selectedLevel: max, unlocked: max }; }); }); localStorage.setItem("tp-command-v1:" + user.id, JSON.stringify(snapshot)); } } catch {} window.location.reload(); return; }
    $("authForms").hidden = true; $("signedInPanel").hidden = false;
    $("accountStatus").textContent = user.role === "admin" ? "ADMIN" : "APPROVED STUDENT";
    $("accountHeading").textContent = "Your study profile";
    $("accountMessage").textContent = "Your account is active. Your preparation profile is ready.";
    $("accountEmail").textContent = user.email;
    $("accountRole").textContent = user.role.toUpperCase();
    $("studentAccountInfo").hidden = user.role === "admin";
    $("adminPanel").hidden = user.role !== "admin";
    $("accountDifficulty").value = user.difficulty || "intermediate";
    try { const settings = await api("/api/account/settings", { method: "GET" }); localStorage.setItem("tp-difficulty", settings.difficulty); $("accountDifficulty").value = settings.difficulty; } catch {}
    if (user.role === "admin") { await loadAdminUsers(); await loadAllStageRules(); }
  }
  async function refresh() {
    try {
      const data = await api("/api/auth/me", { method: "GET" });
      if (data.user) await showSignedIn(data.user); else { if (localStorage.getItem("tp-active-user")) { localStorage.removeItem("tp-active-user"); window.location.reload(); return; } showSignedOut(); }
    } catch (error) {
      showSignedOut(); feedback("loginFeedback", error.message);
    }
  }
  async function loadAdminUsers() {
    const target = $("adminUsers"); target.textContent = "Loading accounts…";
    try {
      const data = await api("/api/admin/users", { method: "GET" });
      if (!data.users.length) { target.textContent = "No registrations yet."; return; }
      target.innerHTML = data.users.map(user => {
        const actions = user.role === "admin" ? "" :
          (user.status === "pending" ? '<button data-status="approved">Approve</button><button data-status="rejected">Reject</button>' :
          user.status === "approved" ? '<button data-status="revoked">Revoke access</button>' :
          '<button data-status="approved">Approve</button>');
        return '<article class="admin-user" data-user="' + encodeURIComponent(user.id) + '"><div><strong>' + escapeHtml(user.email) +
          '</strong><small>' + escapeHtml(user.status.toUpperCase()) + ' · ' + escapeHtml(user.created_at) + '</small></div><div class="admin-actions">' + actions + '</div></article>';
      }).join("");
      target.querySelectorAll("[data-status]").forEach(button => button.addEventListener("click", async () => {
        const card = button.closest("[data-user]"); const id = decodeURIComponent(card.dataset.user);
        button.disabled = true;
        try {
          await api("/api/admin/users", { method: "POST", body: JSON.stringify({ userId: id, status: button.dataset.status }) });
          await loadAdminUsers();
        } catch (error) { alert(error.message); button.disabled = false; }
      }));
    } catch (error) { target.textContent = error.message; }
  }
  async function loadAllStageRules() {
    const list = $("stageRulesList");
    try {
      const [data, topicData] = await Promise.all([
        api("/api/admin/stage-rules", { method: "GET" }),
        api("/api/admin/topic-stage-rules", { method: "GET" })
      ]);
      const stageRows = data.rules.map(rule => '<p>' + escapeHtml("NUMBER SYSTEM · " + rule.exam_track.toUpperCase() + ' · ' + rule.stage_id.toUpperCase() + ' · MIN ' + rule.minimum_difficulty.toUpperCase()) + '</p>');
      const topicRows = topicData.rules.map(rule => '<p>' + escapeHtml(rule.topic_id + " · " + rule.exam_track.toUpperCase() + ' · ' + rule.stage_id.toUpperCase() + ' · MIN ' + rule.minimum_difficulty.toUpperCase()) + '</p>');
      list.innerHTML = [...stageRows, ...topicRows].join("") || "<p>No custom minimums. All stages default to Beginner minimum.</p>";
    } catch (error) { list.textContent = error.message; }
  }
  $("saveStageRule").addEventListener("click", async () => {
    feedback("stageRuleFeedback", "Saving stage rule…");
    try {
      await api("/api/admin/stage-rules", { method: "POST", body: JSON.stringify({
        examTrack: $("ruleTrack").value, stageId: $("ruleStage").value,
        minimumDifficulty: $("ruleDifficulty").value
      }) });
      feedback("stageRuleFeedback", "Stage minimum difficulty saved.");
      await loadAllStageRules();
    } catch (error) { feedback("stageRuleFeedback", error.message); }
  }
  $("saveTopicStageRule").addEventListener("click", async () => {
    feedback("stageRuleFeedback", "Saving topic stage rule…");
    try {
      await api("/api/admin/topic-stage-rules", { method: "POST", body: JSON.stringify({ topicId: $("ruleTopic").value, examTrack: $("ruleTrack").value, stageId: $("ruleStage").value, minimumDifficulty: $("ruleDifficulty").value }) });
      feedback("stageRuleFeedback", "Topic stage minimum difficulty saved.");
      await loadAllStageRules();
    } catch (error) { feedback("stageRuleFeedback", error.message); }
  });
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[char]);
  }

  $("registerForm").elements.email.addEventListener("input", event => {
    $("bootstrapWrap").hidden = event.target.value.trim().toLowerCase() !== ADMIN_EMAIL;
  });
  $("registerForm").addEventListener("submit", async event => {
    event.preventDefault(); const button = event.submitter; button.disabled = true;
    feedback("registerFeedback", "Submitting registration…");
    const data = formData(event.currentTarget);
    try {
      const result = await api("/api/auth/register", { method: "POST", body: JSON.stringify(data) });
      event.currentTarget.reset(); $("bootstrapWrap").hidden = true;
      feedback("registerFeedback", result.message || "Admin account created. You are signed in.");
      await refresh();
    } catch (error) { feedback("registerFeedback", error.message); }
    finally { button.disabled = false; }
  });
  $("loginForm").addEventListener("submit", async event => {
    event.preventDefault(); const button = event.submitter; button.disabled = true;
    feedback("loginFeedback", "Signing in…");
    try {
      const result = await api("/api/auth/login", { method: "POST", body: JSON.stringify(formData(event.currentTarget)) });
      event.currentTarget.reset(); feedback("loginFeedback", "Login successful.");
      await showSignedIn(result.user);
    } catch (error) { feedback("loginFeedback", error.message); }
    finally { button.disabled = false; }
  });
  $("logoutButton").addEventListener("click", async () => {
    try { await api("/api/auth/logout", { method: "POST", body: "{}" }); localStorage.removeItem("tp-active-user"); window.location.reload(); }
    catch (error) { alert(error.message); }
  });
  $("accountDifficulty").addEventListener("change", async event => {
    feedback("difficultyFeedback", "Saving preference…");
    try {
      await api("/api/account/settings", { method: "POST", body: JSON.stringify({ difficulty: event.target.value }) });
      localStorage.setItem("tp-difficulty", event.target.value);
      feedback("difficultyFeedback", "Difficulty preference saved.");
    } catch (error) { feedback("difficultyFeedback", error.message); }
  });
  refresh();
})();