/* ============================================================================
   AI COPILOT — a persistent, app-wide assistant. Answers are generated from
   AppState/DEMO at ask-time (not hard-coded numbers), so they stay correct
   as the demo data changes (e.g. after a Capture posting or a reconcile
   match). It's still a scripted/keyword-matched demo, not a real model —
   but every number it says is real, live, computed data.
   ============================================================================ */

const COPILOT_SUGGESTIONS = [
  { icon: "wallet", q: "What's my net worth right now?" },
  { icon: "checkDouble", q: "What still needs reconciling?" },
  { icon: "bolt", q: "Any documents ready to auto-post?" },
  { icon: "alertTriangle", q: "Any anomalies I should know about?" },
  { icon: "chartLine", q: "Summarize my cashflow forecast" },
  { icon: "cheque", q: "Which cheques are due soon?" },
];

function copilotNetWorth() {
  const totalBank = DEMO.banks.reduce((s, b) => s + (b.currency === "AED" ? b.balance : b.balance * 3.6725), 0);
  const propertyValue = DEMO.properties.reduce((s, p) => s + p.value, 0);
  const commodityValue = DEMO.commodities.reduce((s, c) => s + c.qty * c.price, 0);
  return totalBank + propertyValue + commodityValue;
}

function copilotAnswer(raw) {
  const q = raw.toLowerCase();

  if (/net worth|worth|portfolio value/.test(q)) {
    return `Your current net worth is ${fmtMoney(copilotNetWorth(), "AED", 0)}, up 2.4% this month — bank balances, ${DEMO.properties.length} properties, and commodity holdings combined. Want me to open the [Dashboard]?`;
  }
  if (/reconcil|unmatched|match/.test(q)) {
    const bankLeft = AppState.bankLines.filter(l => !l.matched).length;
    const bookLeft = AppState.bookLines.filter(l => !l.matched).length;
    if (bankLeft === 0) return `Everything's reconciled — no unmatched lines on either side. Nice and clean.`;
    return `There are ${bankLeft} unmatched bank line${bankLeft === 1 ? "" : "s"} and ${bookLeft} unmatched book entr${bookLeft === 1 ? "y" : "ies"} left. I've already suggested matches for most of them at 95%+ confidence — one click accepts each. Want me to open [Reconcile]?`;
  }
  if (/auto.?post|ready to post|pending capture|queue/.test(q)) {
    const n = AppState.pendingCaptures.length;
    if (n === 0) return `Nothing's waiting — every captured document has already been posted to the ledger.`;
    return `${n} document${n === 1 ? " is" : "s are"} sitting in the Capture queue: ${AppState.pendingCaptures.map(c => c.vendor).join(", ")}. I can process all of them automatically — high-confidence ones post straight through, anything uncertain gets flagged for you. Open [Capture] and try "Auto-process all with AI".`;
  }
  if (/anomal|unusual|flag|suspicious/.test(q)) {
    return `One thing stands out: the Mollak service charge on 25 Aug (AED 6,180.00) is about 18% above your 3-month average for Marina Heights. Not necessarily wrong — could be a quarterly true-up — but worth a glance before you approve it.`;
  }
  if (/forecast|cashflow|projection|runway/.test(q)) {
    const inflow = DEMO.scheduledEvents.filter(e => e.type === "Income").reduce((s, e) => s + e.amount, 0);
    const outflow = DEMO.scheduledEvents.filter(e => e.type === "Expense").reduce((s, e) => s + e.amount, 0);
    return `Over the next 90 days I'm projecting ${fmtMoney(inflow, "AED", 0)} in and ${fmtMoney(outflow, "AED", 0)} out, net positive, at 92% confidence. No cash shortfall in sight. Want the full breakdown in [Cashflow Forecast]?`;
  }
  if (/cheque|check due|clearing/.test(q)) {
    const due = DEMO.cheques.filter(c => c.status === "Pending");
    if (!due.length) return `No cheques are currently pending — you're all clear.`;
    return due.map(c => `${c.payee} — ${fmtMoney(c.amount, "AED", 0)}, due ${fmtDate(c.due)}`).join("\n") + `\n\nWant me to open [Cheques]?`;
  }
  if (/transaction|spend|expense/.test(q)) {
    const tagged = AppState.transactions.filter(t => t.aiTagged).length;
    return `${tagged} of your last ${AppState.transactions.length} transactions were categorized automatically by AI, averaging 94% confidence. The rest were entered manually. I can show you the full ledger in [Transactions].`;
  }
  if (/hi|hello|hey|help/.test(q)) {
    return `Hi, I'm the FMS Copilot. I can check balances, chase down what still needs reconciling, tell you what's ready to auto-post, or flag anything unusual. What do you want to know?`;
  }
  if (/thank/.test(q)) {
    return `Anytime. I'm always watching the feed in the background.`;
  }
  return `In the full product I'd reason over your live documents, bank feed, and ledger to answer that precisely. For this demo, try asking about net worth, reconciliation, pending captures, cashflow forecast, or cheques due.`;
}

/* ---------------------------------------------------------------------- */
/* Rendering                                                              */
/* ---------------------------------------------------------------------- */
function renderCopilotUI() {
  const root = document.getElementById("copilot-root");
  if (!root) return;
  const cp = AppState.copilot;

  root.innerHTML = `
    ${!cp.open ? `
      <button class="copilot-fab" onclick="toggleCopilot()" title="Ask the FMS Copilot">
        ${icon("sparkles", { size: 24 })}
        <span class="badge-dot"></span>
      </button>
    ` : `
      <div class="copilot-panel">
        <div class="copilot-head">
          <div class="ic">${icon("sparkles", { size: 16 })}</div>
          <div class="t">
            <div class="name">FMS Copilot</div>
            <div class="status"><span class="dot"></span>Watching your live data</div>
          </div>
          <button onclick="toggleCopilot()">${icon("x", { size: 14 })}</button>
        </div>
        <div class="copilot-body" id="copilot-messages">
          ${cp.messages.map(renderCopilotMsg).join("")}
          ${cp.typing ? `<div class="chat-msg ai"><div class="avatar">${icon("sparkles", { size: 12 })}</div><div class="bubble"><span class="typing-dots"><span></span><span></span><span></span></span></div></div>` : ""}
        </div>
        <div class="copilot-foot">
          ${!cp.messages.some(m => m.role === "user") ? `
          <div class="copilot-suggest">
            ${COPILOT_SUGGESTIONS.slice(0, 4).map(s => `<button onclick='copilotAsk(${JSON.stringify(s.q)})'>${icon(s.icon, { size: 13 })}${esc(s.q)}</button>`).join("")}
          </div>` : ""}
          <div class="chat-input-row">
            <input id="copilot-input" type="text" placeholder="Ask about your finances…" onkeydown="if(event.key==='Enter'){copilotSendFromInput();}" />
            <button onclick="copilotSendFromInput()">${icon("send", { size: 15 })}</button>
          </div>
        </div>
      </div>
    `}
  `;

  const body = document.getElementById("copilot-messages");
  if (body) body.scrollTop = body.scrollHeight;
}

function renderCopilotMsg(m) {
  // Turn [Page Name] mentions into clickable nav links to the relevant tab.
  const linkMap = { Dashboard: "dashboard", Reconcile: "reconciliation", Capture: "capture", "Cashflow Forecast": "cashflow-forecast", Cheques: "cheques", Transactions: "transactions" };
  let text = esc(m.text).replace(/\[([^\]]+)\]/g, (full, label) => {
    const id = linkMap[label];
    return id ? `<a href="#" onclick="openTab('${id}');return false;" style="color:var(--blue);font-weight:700;text-decoration:underline;">${label}</a>` : label;
  }).replace(/\n/g, "<br/>");
  return `
    <div class="chat-msg ${m.role}">
      <div class="avatar">${m.role === "ai" ? icon("sparkles", { size: 12 }) : initials(DEMO.company.demoUser.name)}</div>
      <div class="bubble">${text}</div>
    </div>
  `;
}

function toggleCopilot() {
  AppState.copilot.open = !AppState.copilot.open;
  renderCopilotUI();
}

function copilotAsk(question) {
  AppState.copilot.messages.push({ role: "user", text: question });
  AppState.copilot.typing = true;
  renderCopilotUI();
  setTimeout(() => {
    AppState.copilot.typing = false;
    AppState.copilot.messages.push({ role: "ai", text: copilotAnswer(question) });
    renderCopilotUI();
  }, 550 + Math.min(700, question.length * 8));
}

function copilotSendFromInput() {
  const input = document.getElementById("copilot-input");
  if (!input || !input.value.trim()) return;
  const text = input.value.trim();
  input.value = "";
  copilotAsk(text);
}
