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
    $("authForms").hidden = true; $("signedInPanel").hidden = false;
    $("accountStatus").textContent = user.role === "admin" ? "ADMIN" : "APPROVED STUDENT";
    $("accountHeading").textContent = "Your study profile";
    $("accountMessage").textContent = "Your account is active. Your preparation profile is ready.";
    $("accountEmail").textContent = user.email;
    $("accountRole").textContent = user.role.toUpperCase();
    $("studentAccountInfo").hidden = user.role === "admin";
    $("adminPanel").hidden = user.role !== "admin";
    $("accountDifficulty").value = user.difficulty || "intermediate";
    if (user.role === "admin") await loadAdminUsers();
  }
  async function refresh() {
    try {
      const data = await api("/api/auth/me", { method: "GET" });
      if (data.user) await showSignedIn(data.user); else showSignedOut();
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
    try { await api("/api/auth/logout", { method: "POST", body: "{}" }); showSignedOut(); }
    catch (error) { alert(error.message); }
  });
  $("accountDifficulty").addEventListener("change", async event => {
    feedback("difficultyFeedback", "Saving preference…");
    try {
      await api("/api/account/settings", { method: "POST", body: JSON.stringify({ difficulty: event.target.value }) });
      feedback("difficultyFeedback", "Difficulty preference saved.");
    } catch (error) { feedback("difficultyFeedback", error.message); }
  });
  refresh();
})();