/* ============================================================================
   APP SHELL — state, routing (tabs), sidebar, login, boot
   ============================================================================ */

/* ---------------------------------------------------------------------- */
/* Navigation registry                                                    */
/* ---------------------------------------------------------------------- */
const NAV = [
  { id: "dashboard", label: "DASHBOARD", icon: "home" },
  {
    id: "banking", label: "BANKING", icon: "bank", dropdown: true,
    items: [
      { id: "reconciliation", label: "RECONCILE", icon: "checkDouble" },
      { id: "cheques", label: "CHEQUES", icon: "cheque" },
    ],
  },
  { id: "market-watch", label: "MARKET WATCH", icon: "chartLine" },
  { id: "transactions", label: "TRANSACTIONS", icon: "exchange" },
  {
    id: "reporting", label: "REPORTING", icon: "pieChart", dropdown: true,
    items: [
      { id: "coa", label: "Chart of Accounts", icon: "list" },
      { id: "trial-balance", label: "Trial Balance", icon: "clipboard" },
      { id: "balance-sheet", label: "Balance Sheet", icon: "briefcase" },
      { id: "income-statement", label: "Income Statement", icon: "chart" },
      { id: "cashflow", label: "Cashflow", icon: "wallet" },
      { id: "cashflow-forecast", label: "Cashflow Forecast", icon: "chartLine" },
    ],
  },
  { id: "live-transactions", label: "LIVE TXNS", icon: "sms" },
  { id: "capture", label: "CAPTURE", icon: "bolt" },
  { id: "commodities", label: "COMMODITIES", icon: "coins" },
  { id: "properties", label: "PROPERTIES", icon: "building" },
  { id: "audit-logs", label: "AUDIT LOGS", icon: "clipboard" },
  { id: "workspace", label: "WORKSPACES", icon: "building" },
];

/* ---------------------------------------------------------------------- */
/* Page registry — id -> { title, render }                               */
/* ---------------------------------------------------------------------- */
const PAGES = {
  "dashboard":          { title: "Dashboard",          render: renderDashboard,        pinned: true },
  "reconciliation":     { title: "Reconcile",           render: renderReconciliation },
  "cheques":            { title: "Cheques",             render: renderCheques },
  "market-watch":       { title: "Market Watch",        render: renderMarketWatch },
  "transactions":       { title: "Transactions",        render: renderTransactions },
  "coa":                { title: "Chart of Accounts",   render: renderCOA },
  "trial-balance":      { title: "Trial Balance",       render: renderTrialBalance },
  "balance-sheet":      { title: "Balance Sheet",       render: renderBalanceSheet },
  "income-statement":   { title: "Income Statement",    render: renderIncomeStatement },
  "cashflow":           { title: "Cashflow",             render: renderCashflowReport },
  "cashflow-forecast":  { title: "Cashflow Forecast",   render: renderForecast },
  "live-transactions":  { title: "Live Transactions",   render: renderLiveTransactions },
  "capture":            { title: "Capture",             render: renderCapture },
  "commodities":        { title: "Commodities",         render: renderCommodities },
  "properties":         { title: "Properties",          render: renderProperties },
  "audit-logs":         { title: "Audit Logs",          render: renderAuditLogs },
  "workspace":          { title: "Workspaces",          render: renderWorkspace },
};

/* ---------------------------------------------------------------------- */
/* App state (deep-cloned from mock data so it can be mutated safely)    */
/* ---------------------------------------------------------------------- */
const AppState = {
  tabs: ["dashboard"],
  activeTab: "dashboard",
  openDropdown: null,

  transactions: JSON.parse(JSON.stringify(DEMO.transactions)),
  bankLines: JSON.parse(JSON.stringify(DEMO.bankLines)),
  bookLines: JSON.parse(JSON.stringify(DEMO.bookLines)),
  reconSelection: { bank: null, book: null },
  txFilters: { q: "", status: "all" },

  pendingCaptures: [DEMO.captureSamples[1], DEMO.captureSamples[5]],
  bookedCaptures: [DEMO.captureSamples[0], DEMO.captureSamples[3]],
  capture: { step: "select", doc: null, chat: [], autoRun: null },

  copilot: { open: false, typing: false, messages: [
    { role: "ai", text: "Hi, I'm the FMS Copilot — I can see your live balances, ledger, and documents. Ask me anything, or try a suggestion below." },
  ] },
  commandPalette: { open: false, query: "", activeIndex: 0 },
  presenter: { active: false, index: 0, paused: false, timerId: null, remaining: 0, startedAt: 0 },
};

/* ---------------------------------------------------------------------- */
/* Tabs                                                                    */
/* ---------------------------------------------------------------------- */
function openTab(id) {
  if (!PAGES[id]) return;
  if (!AppState.tabs.includes(id)) AppState.tabs.push(id);
  AppState.activeTab = id;
  renderTabBar();
  renderPage();
}

function closeTab(id, evt) {
  if (evt) evt.stopPropagation();
  if (id === "dashboard") return;
  const idx = AppState.tabs.indexOf(id);
  if (idx === -1) return;
  AppState.tabs.splice(idx, 1);
  if (AppState.activeTab === id) {
    AppState.activeTab = AppState.tabs[Math.max(0, idx - 1)] || "dashboard";
  }
  renderTabBar();
  renderPage();
}

function rerenderActivePage() { renderPage(); }

/* ---------------------------------------------------------------------- */
/* Rendering                                                              */
/* ---------------------------------------------------------------------- */
function renderPage() {
  const page = PAGES[AppState.activeTab];
  const el = document.getElementById("page-content");
  if (!page || !el) return;
  el.innerHTML = page.render();
}

function renderTabBar() {
  const el = document.getElementById("tab-bar");
  if (!el) return;
  el.innerHTML = AppState.tabs.map(id => {
    const page = PAGES[id];
    const active = id === AppState.activeTab ? "active" : "";
    const closable = id !== "dashboard";
    return `
      <button class="tab ${active}" onclick="openTab('${id}')">
        <span>${esc(page.title)}</span>
        ${closable ? `<span class="tab-close" onclick="closeTab('${id}', event)">${icon("x", { size: 11 })}</span>` : ""}
      </button>
    `;
  }).join("") + `
    <div class="topbar-right">
      <button class="topbar-btn" onclick="openCommandPalette()">${icon("search", { size: 12 })} Search <kbd>Ctrl K</kbd></button>
      <button class="topbar-btn" onclick="startPresenter()">${icon("sparkles", { size: 12 })} Guided tour</button>
      <span class="topbar-pill"><span class="dot"></span>Demo data</span>
    </div>
  `;
}

function renderSidebar() {
  const el = document.getElementById("sidebar");
  if (!el) return;
  el.innerHTML = `
    <div>
      <div class="sidebar-logo"><div class="badge">${icon("wallet", { size: 18 })}</div></div>
      <nav class="sidebar-nav">
        ${NAV.map(item => {
          if (item.dropdown) {
            const isChildActive = item.items.some(sub => sub.id === AppState.activeTab);
            const open = AppState.openDropdown === item.id;
            return `
              <div class="nav-group ${open ? "open" : ""}">
                <button class="nav-item has-children ${isChildActive ? "active" : ""} ${open ? "open" : ""}" onclick="toggleDropdown('${item.id}')">
                  ${icon(item.icon, { size: 19 })}
                  <span>${item.label}</span>
                  <span class="chev">${icon("chevronRight", { size: 10 })}</span>
                </button>
                <div class="nav-flyout">
                  <div class="nav-flyout-title">${item.label} OPTIONS</div>
                  ${item.items.map(sub => `
                    <button class="${sub.id === AppState.activeTab ? "active" : ""}" onclick="openTab('${sub.id}'); toggleDropdown(null);">
                      ${icon(sub.icon, { size: 14 })}<span>${sub.label}</span>
                    </button>
                  `).join("")}
                </div>
              </div>
            `;
          }
          return `
            <button class="nav-item ${item.id === AppState.activeTab ? "active" : ""}" onclick="openTab('${item.id}')">
              ${icon(item.icon, { size: 19 })}
              <span>${item.label}</span>
            </button>
          `;
        }).join("")}
      </nav>
    </div>
    <div class="sidebar-footer">
      <div class="sidebar-avatar" title="${esc(DEMO.company.demoUser.name)}">${initials(DEMO.company.demoUser.name)}</div>
      <button class="logout-btn" title="Log out" onclick="doLogout()">${icon("logout", { size: 17 })}</button>
    </div>
  `;
}

function toggleDropdown(id) {
  AppState.openDropdown = AppState.openDropdown === id ? null : id;
  renderSidebar();
}

document.addEventListener("click", (e) => {
  if (AppState.openDropdown && !e.target.closest(".nav-group")) {
    AppState.openDropdown = null;
    renderSidebar();
  }
  if (AppState.copilot.open && !e.target.closest(".copilot-panel") && !e.target.closest(".copilot-fab")) {
    AppState.copilot.open = false;
    renderCopilotUI();
  }
});

/* ---------------------------------------------------------------------- */
/* Global keyboard shortcuts — Ctrl/Cmd+K command palette, Esc to close  */
/* ---------------------------------------------------------------------- */
document.addEventListener("keydown", (e) => {
  const shell = document.getElementById("app-shell");
  if (!shell || shell.classList.contains("hidden")) return;

  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    if (AppState.commandPalette.open) closeCommandPalette(); else openCommandPalette();
    return;
  }
  if (e.key === "Escape") {
    if (AppState.commandPalette.open) { closeCommandPalette(); return; }
    if (AppState.copilot.open) { AppState.copilot.open = false; renderCopilotUI(); return; }
  }
});

/* ---------------------------------------------------------------------- */
/* Toasts                                                                 */
/* ---------------------------------------------------------------------- */
function showToast(text) {
  const root = document.getElementById("toast-root");
  if (!root) return;
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `${icon("checkDouble", { size: 15 })}<span>${esc(text)}</span>`;
  root.appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .3s"; setTimeout(() => t.remove(), 300); }, 3200);
}

/* ---------------------------------------------------------------------- */
/* Login                                                                   */
/* ---------------------------------------------------------------------- */
function initLogin() {
  document.getElementById("icon-mail").innerHTML = icon("mail", { size: 14 });
  document.getElementById("icon-lock").innerHTML = icon("lock", { size: 14 });
  document.getElementById("icon-arrow").innerHTML = icon("arrowRight", { size: 15 });
  document.getElementById("login-badge").innerHTML = icon("wallet", { size: 18 });
  document.getElementById("login-card-icon").innerHTML = icon("building", { size: 22 });

  let showPw = false;
  const pwInput = document.getElementById("login-password");
  const toggleBtn = document.getElementById("toggle-password");
  toggleBtn.innerHTML = icon("eye", { size: 15 });
  toggleBtn.addEventListener("click", () => {
    showPw = !showPw;
    pwInput.type = showPw ? "text" : "password";
    toggleBtn.innerHTML = icon(showPw ? "eyeOff" : "eye", { size: 15 });
  });

  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = document.getElementById("login-submit");
    btn.disabled = true;
    btn.innerHTML = `<span>Signing in…</span>`;
    setTimeout(() => {
      document.getElementById("login-screen").classList.add("hidden");
      document.getElementById("app-shell").classList.remove("hidden");
      boot();
    }, 550);
  });
}

function doLogout() {
  if (AppState.presenter.active) stopPresenter();
  AppState.copilot.open = false;
  AppState.commandPalette.open = false;
  document.getElementById("copilot-root").innerHTML = "";
  document.getElementById("command-palette-root").innerHTML = "";
  document.getElementById("app-shell").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
  const btn = document.getElementById("login-submit");
  btn.disabled = false;
  btn.innerHTML = `<span>Sign in to demo</span>${icon("arrowRight", { size: 15 })}`;
}

/* ---------------------------------------------------------------------- */
/* Boot                                                                    */
/* ---------------------------------------------------------------------- */
function boot() {
  // Deep-link support: ?page=reconciliation lands the demo straight on that
  // tab after login (used when arriving from the portfolio's project cards).
  const requestedPage = new URLSearchParams(location.search).get("page");
  if (requestedPage && PAGES[requestedPage]) {
    AppState.tabs = ["dashboard"];
    openTab(requestedPage);
  }

  renderSidebar();
  renderTabBar();
  renderPage();
  renderCopilotUI();
}

document.addEventListener("DOMContentLoaded", initLogin);
