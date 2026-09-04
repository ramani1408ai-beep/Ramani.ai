/* ============================================================================
   DASHBOARD
   ============================================================================ */

function renderDashboard() {
  const totalBank = DEMO.banks.reduce((s, b) => s + (b.currency === "AED" ? b.balance : b.balance * 3.6725), 0);
  const propertyValue = DEMO.properties.reduce((s, p) => s + p.value, 0);
  const commodityValue = DEMO.commodities.reduce((s, c) => s + c.qty * c.price, 0);
  const netWorth = totalBank + propertyValue + commodityValue;
  const pendingRecon = AppState.transactions.filter(t => t.status === "Pending").length;
  const dueCheques = DEMO.cheques.filter(c => c.status === "Pending" && daysUntil(c.due) <= 7 && daysUntil(c.due) >= 0);
  const aiTaggedCount = AppState.transactions.filter(t => t.aiTagged).length;
  const avgConf = Math.round(AppState.transactions.filter(t => t.aiTagged).reduce((s, t) => s + t.aiConfidence, 0) / (aiTaggedCount || 1));
  const suggestedMatches = AppState.bankLines.filter(b => reconSuggestion(b)).length;
  const readyToPost = AppState.pendingCaptures.length;

  const netWorthChart = Charts.lineChart({
    values: DEMO.netWorthTrend, labels: DEMO.months12, color: "#378ADD", width: 640, height: 190,
  });

  const incExpChart = Charts.barChart({
    series1: DEMO.incomeExpenseTrend.map(x => x.income),
    series2: DEMO.incomeExpenseTrend.map(x => x.expense),
    labels: DEMO.incomeExpenseTrend.map(x => x.month),
    width: 520, height: 200,
  });

  const donut = Charts.donutChart({
    segments: DEMO.banks.map(b => ({ value: Math.abs(b.currency === "AED" ? b.balance : b.balance * 3.6725), color: b.color })),
    width: 168, height: 168,
  });

  return `
  <div class="page-header">
    <div>
      <h1>Welcome back, ${esc(DEMO.company.demoUser.name.split(" ")[0])} 👋</h1>
      <p>${esc(DEMO.company.name)} — portfolio snapshot as of 02 Sep 2026</p>
    </div>
    <div class="page-actions">
      <button class="btn" onclick="openTab('capture')">${icon("bolt", { size: 15 })} New Capture</button>
      <button class="btn primary" onclick="openTab('cashflow-forecast')">${icon("chartLine", { size: 15 })} View Forecast</button>
    </div>
  </div>

  ${dueCheques.length ? `
  <div class="alert-banner amber">
    ${icon("alertTriangle", { size: 18 })}
    <div><strong>${dueCheques.length} cheque${dueCheques.length > 1 ? "s" : ""} due within 7 days</strong> — ${dueCheques.map(c => `${esc(c.payee)} (${fmtMoney(c.amount)})`).join(", ")}.
    <a href="#" onclick="openTab('cheques');return false;" style="color:#8A5A00;font-weight:700;text-decoration:underline;">Review cheques →</a></div>
  </div>` : ""}

  ${pendingRecon ? `
  <div class="alert-banner red">
    ${icon("checkDouble", { size: 18 })}
    <div><strong>${pendingRecon} transaction${pendingRecon > 1 ? "s" : ""} awaiting reconciliation.</strong>
    <a href="#" onclick="openTab('reconciliation');return false;" style="color:#9A2A20;font-weight:700;text-decoration:underline;">Open reconciliation →</a></div>
  </div>` : ""}

  <div class="insight-scroll">
    <div class="insight-card" onclick="openTab('transactions')">
      <div class="row">
        <div class="ic ok">${icon("sparkles", { size: 14 })}</div>
        <div class="txt">AI auto-categorized <b>${aiTaggedCount} of ${AppState.transactions.length}</b> transactions this month, averaging ${avgConf}% confidence.</div>
      </div>
      <div class="cta">Review in Transactions ${icon("arrowRight", { size: 10 })}</div>
    </div>
    <div class="insight-card" onclick="openTab('reconciliation')">
      <div class="row">
        <div class="ic">${icon("checkDouble", { size: 14 })}</div>
        <div class="txt"><b>${suggestedMatches} likely match${suggestedMatches === 1 ? "" : "es"}</b> found between your bank feed and books — ready to accept in one click.</div>
      </div>
      <div class="cta">Open Reconcile ${icon("arrowRight", { size: 10 })}</div>
    </div>
    <div class="insight-card" onclick="openTab('capture')">
      <div class="row">
        <div class="ic">${icon("bolt", { size: 14 })}</div>
        <div class="txt"><b>${readyToPost} document${readyToPost === 1 ? "" : "s"}</b> waiting in the Capture queue — process them all automatically with one click.</div>
      </div>
      <div class="cta">Open Capture ${icon("arrowRight", { size: 10 })}</div>
    </div>
    <div class="insight-card" onclick="openTab('reconciliation')">
      <div class="row">
        <div class="ic warn">${icon("alertTriangle", { size: 14 })}</div>
        <div class="txt">Anomaly flagged: <b>Mollak service charge</b> is 18% above its 3-month trend for Marina Heights.</div>
      </div>
      <div class="cta">Investigate ${icon("arrowRight", { size: 10 })}</div>
    </div>
    <div class="insight-card" onclick="openTab('cashflow-forecast')">
      <div class="row">
        <div class="ic ok">${icon("chartLine", { size: 14 })}</div>
        <div class="txt">Cashflow forecast holds at <b>92% confidence</b> — no shortfall projected through November.</div>
      </div>
      <div class="cta">View Forecast ${icon("arrowRight", { size: 10 })}</div>
    </div>
  </div>

  <div class="grid grid-4 mb-16">
    <div class="card kpi-card">
      <div class="kpi-top">
        <span class="kpi-label">Net Worth</span>
        <div class="kpi-icon" style="background:#EAF3FD;color:#378ADD;">${icon("wallet", { size: 17 })}</div>
      </div>
      <div class="kpi-value">${fmtMoney(netWorth, "AED", 0)}</div>
      <span class="kpi-delta up">${icon("chartLine", { size: 12 })} +2.4% this month</span>
    </div>
    <div class="card kpi-card">
      <div class="kpi-top">
        <span class="kpi-label">Bank Balances</span>
        <div class="kpi-icon" style="background:#E6F7EF;color:#1AB573;">${icon("bank", { size: 17 })}</div>
      </div>
      <div class="kpi-value">${fmtMoney(totalBank, "AED", 0)}</div>
      <span class="kpi-delta up">${icon("chartLine", { size: 12 })} across ${DEMO.banks.length} accounts</span>
    </div>
    <div class="card kpi-card">
      <div class="kpi-top">
        <span class="kpi-label">Property Value</span>
        <div class="kpi-icon" style="background:#FFF6E5;color:#B4780A;">${icon("building", { size: 17 })}</div>
      </div>
      <div class="kpi-value">${fmtMoney(propertyValue, "AED", 0)}</div>
      <span class="kpi-delta up">${icon("home", { size: 12 })} ${DEMO.properties.length} properties</span>
    </div>
    <div class="card kpi-card">
      <div class="kpi-top">
        <span class="kpi-label">Commodities</span>
        <div class="kpi-icon" style="background:#F3EEFF;color:#8B5CF6;">${icon("coins", { size: 17 })}</div>
      </div>
      <div class="kpi-value">${fmtMoney(commodityValue, "AED", 0)}</div>
      <span class="kpi-delta up">${icon("chartLine", { size: 12 })} +6.1% YTD</span>
    </div>
  </div>

  <div class="grid grid-12 mb-16" style="align-items:stretch;">
    <div class="card" style="grid-column: span 8;">
      <div class="card-head">
        <div><h3>Net worth trend</h3><div class="sub">Last 12 months · AED millions</div></div>
        <span class="pill green">+2.62M YTD</span>
      </div>
      <div class="card-pad" style="padding-top:6px;">${netWorthChart}</div>
    </div>
    <div class="card" style="grid-column: span 4;">
      <div class="card-head"><div><h3>Cash by bank</h3><div class="sub">Live balances</div></div></div>
      <div class="card-pad flex items-center gap-16" style="flex-wrap:wrap;justify-content:center;">
        ${donut}
        <div class="legend" style="flex-direction:column;gap:8px;">
          ${DEMO.banks.map(b => `
            <div class="legend-item"><span class="legend-dot" style="background:${b.color}"></span>${esc(b.bank)} <span class="muted">${fmtShort(b.currency === "AED" ? b.balance : b.balance * 3.6725)}</span></div>
          `).join("")}
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-12 mb-16">
    <div class="card" style="grid-column: span 7;">
      <div class="card-head">
        <div><h3>Income vs Expense</h3><div class="sub">Last 6 months</div></div>
        <div class="legend"><div class="legend-item"><span class="legend-dot" style="background:#1AB573"></span>Income</div><div class="legend-item"><span class="legend-dot" style="background:#EF4444"></span>Expense</div></div>
      </div>
      <div class="card-pad">${incExpChart}</div>
    </div>
    <div class="card" style="grid-column: span 5;">
      <div class="card-head"><div><h3>Upcoming payments</h3><div class="sub">Next 30 days</div></div></div>
      <div class="card-pad" style="padding-top:8px;">
        ${DEMO.scheduledEvents.slice(0, 5).map(e => `
          <div class="flex items-center justify-between" style="padding:9px 0;border-bottom:1px solid var(--border-soft);">
            <div class="flex items-center gap-10">
              <div style="width:30px;height:30px;border-radius:8px;background:${e.type === "Income" ? "#E6F7EF" : "#FDECEA"};color:${e.type === "Income" ? "#0F9D63" : "#C0362C"};display:flex;align-items:center;justify-content:center;">${icon(e.type === "Income" ? "arrowRight" : "calendar", { size: 14 })}</div>
              <div>
                <div class="text-sm fw-600">${esc(e.desc)}</div>
                <div class="text-xs muted">${fmtDate(e.date)}</div>
              </div>
            </div>
            <div class="text-sm fw-700" style="color:${e.type === "Income" ? "#0F9D63" : "#C0362C"}">${e.type === "Income" ? "+" : "-"}${fmtMoney(e.amount, "", 0)}</div>
          </div>
        `).join("")}
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-head">
      <div><h3>Recent transactions</h3><div class="sub">Latest ledger activity</div></div>
      <button class="btn sm ghost" onclick="openTab('transactions')">View all ${icon("arrowRight", { size: 12 })}</button>
    </div>
    <div class="table-wrap card-pad" style="padding-top:10px;">
      <table class="tbl">
        <thead><tr><th>Date</th><th>Description</th><th>Account</th><th>Bank</th><th class="num">Amount</th><th>Status</th></tr></thead>
        <tbody>
          ${AppState.transactions.slice(0, 6).map(t => `
            <tr>
              <td class="muted">${fmtDateShort(t.date)}</td>
              <td class="fw-600">${esc(t.description)} ${t.aiTagged ? `<span class="ai-pill ghost" style="margin-left:4px;">${icon("sparkles",{size:9})}${t.aiConfidence}%</span>` : ""}</td>
              <td>${esc(t.account)}</td>
              <td class="muted">${esc(t.bank)}</td>
              <td class="num ${t.credit ? "text-green" : ""}">${t.credit ? "+" + fmtMoney(t.credit, "", 0) : "-" + fmtMoney(t.debit, "", 0)}</td>
              <td>${statusPill(t.status)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  </div>
  `;
}

function statusPill(status) {
  const map = { Reconciled: "green", Pending: "amber", Cleared: "green", Bounced: "red", Issued: "blue", Received: "blue" };
  return `<span class="pill ${map[status] || "slate"}">${esc(status)}</span>`;
}
