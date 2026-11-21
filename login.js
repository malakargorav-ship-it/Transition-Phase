(() => {
  const $ = id => document.getElementById(id);
  const ADMIN_EMAIL = "malakargorav@gmail.com";
  const params = new URLSearchParams(location.search);
  const requested = params.get("next") || "/command.html";
  const next = requested.startsWith("/") && !requested.startsWith("//") &&
    !requested.startsWith("/login") && !requested.startsWith("/api/") ? requested : "/command.html";
  const message = (id, value) => { $(id).textContent = value || ""; };
  const values = form => Object.fromEntries(new FormData(form).entries());
  async function api(path, body) {
    const response = await fetch(path, { method: "POST", credentials: "same-origin",
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Request failed. Please try again.");
    return data;
  }
  async function checkSession() {
    try {
      const response = await fetch("/api/auth/me", { credentials: "same-origin" });
      const data = await response.json();
      if (data.user) location.replace(next);
    } catch {}
  }
  $("registerForm").elements.email.addEventListener("input", event => {
    $("bootstrapWrap").hidden = event.target.value.trim().toLowerCase() !== ADMIN_EMAIL;
  });
  $("loginForm").addEventListener("submit", async event => {
    event.preventDefault();
    const button = event.submitter; button.disabled = true;
    message("loginMessage", "Checking your account…");
    try {
      await api("/api/auth/login", values(event.currentTarget));
      location.replace(next);
    } catch (error) { message("loginMessage", error.message); button.disabled = false; }
  });
  $("registerForm").addEventListener("submit", async event => {
    event.preventDefault();
    const button = event.submitter; button.disabled = true;
    message("registerMessage", "Submitting your registration…");
    try {
      const result = await api("/api/auth/register", values(event.currentTarget));
      event.currentTarget.reset(); $("bootstrapWrap").hidden = true;
      message("registerMessage", result.message || "Registration received. Admin approval ke baad login kar paoge.");
      if (result.status === "approved") location.replace(next);
    } catch (error) { message("registerMessage", error.message); }
    finally { button.disabled = false; }
  });
  checkSession();
})();
