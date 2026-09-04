/* ============================================================================
   PRESENTER — one-click guided tour that auto-navigates the app, so you can
   hand this to someone (or a room) and let it drive itself.
   ============================================================================ */

const PRESENTER_STEPS = [
  { tab: "dashboard", title: "Dashboard", caption: "Everything starts here — live net worth, <b>AI-generated insights</b>, and what actually needs your attention today.", duration: 5500 },
  { tab: "capture", title: "AI Capture", caption: "Drop in any bill, invoice, or cheque. The AI reads it, categorizes it, and drafts the double-entry journal — or process the whole queue automatically in one click.", duration: 6500 },
  { tab: "reconciliation", title: "Reconcile", caption: "The AI proactively matches bank lines to book entries and shows its confidence — accept a suggested match with a single click.", duration: 5500 },
  { tab: "transactions", title: "Transactions", caption: "Every posted entry is tagged with how it got there — <b>AI-categorized</b> at a confidence score, or entered manually.", duration: 4500 },
  { tab: "cashflow-forecast", title: "Cashflow Forecast", caption: "A rolling forecast built from recurring income and bills the AI has already detected, with a confidence score attached.", duration: 5500 },
  { tab: "commodities", title: "Commodities", caption: "Live-marked holdings across gold, silver, oil, and platinum — all in one portfolio view.", duration: 4500 },
];

function startPresenter() {
  if (AppState.copilot.open) { AppState.copilot.open = false; }
  AppState.presenter = { active: true, index: 0, paused: false, timerId: null, remaining: 0, startedAt: 0 };
  openTab(PRESENTER_STEPS[0].tab);
  presenterScheduleNext();
  renderPresenterBar();
}

function presenterScheduleNext() {
  clearTimeout(AppState.presenter.timerId);
  AppState.presenter.startedAt = Date.now();
  const step = PRESENTER_STEPS[AppState.presenter.index];
  const ms = AppState.presenter.remaining || step.duration;
  AppState.presenter.remaining = ms;
  AppState.presenter.timerId = setTimeout(presenterAdvance, ms);
}

function presenterAdvance() {
  const p = AppState.presenter;
  if (!p.active) return;
  if (p.index >= PRESENTER_STEPS.length - 1) { stopPresenter(); return; }
  p.index += 1;
  p.remaining = 0;
  openTab(PRESENTER_STEPS[p.index].tab);
  presenterScheduleNext();
  renderPresenterBar();
}

function presenterPrev() {
  const p = AppState.presenter;
  if (p.index === 0) return;
  p.index -= 1;
  p.remaining = 0;
  openTab(PRESENTER_STEPS[p.index].tab);
  if (!p.paused) presenterScheduleNext();
  renderPresenterBar();
}

function presenterSkip() {
  presenterAdvance();
}

function presenterTogglePause() {
  const p = AppState.presenter;
  if (p.paused) {
    p.paused = false;
    presenterScheduleNext();
  } else {
    p.paused = true;
    clearTimeout(p.timerId);
    p.remaining = Math.max(400, p.remaining - (Date.now() - p.startedAt));
  }
  renderPresenterBar();
}

function stopPresenter() {
  clearTimeout(AppState.presenter.timerId);
  AppState.presenter = { active: false, index: 0, paused: false, timerId: null, remaining: 0, startedAt: 0 };
  renderPresenterBar();
}

function renderPresenterBar() {
  const root = document.getElementById("presenter-root");
  if (!root) return;
  const p = AppState.presenter;
  if (!p || !p.active) { root.innerHTML = ""; return; }
  const step = PRESENTER_STEPS[p.index];

  root.innerHTML = `
    <div class="presenter-bar">
      <div class="presenter-top">
        <div class="presenter-dots">
          ${PRESENTER_STEPS.map((s, i) => `<span class="${i < p.index ? "done" : i === p.index ? "active" : ""}"></span>`).join("")}
        </div>
        <button class="presenter-btn" onclick="presenterPrev()" title="Previous">${icon("chevronLeft", { size: 14 })}</button>
        <button class="presenter-btn" onclick="presenterTogglePause()" title="${p.paused ? "Resume" : "Pause"}">${icon(p.paused ? "arrowRight" : "minus", { size: 14 })}</button>
        <button class="presenter-btn" onclick="presenterSkip()" title="Next">${icon("chevronRight", { size: 14 })}</button>
        <button class="presenter-btn" onclick="stopPresenter()" title="Exit tour">${icon("x", { size: 14 })}</button>
      </div>
      <div class="presenter-step-label">${icon("sparkles", { size: 11 })}&nbsp; Guided tour · Step ${p.index + 1} of ${PRESENTER_STEPS.length} · ${esc(step.title)}${p.paused ? " · Paused" : ""}</div>
      <div class="presenter-caption">${step.caption}</div>
    </div>
  `;
}
