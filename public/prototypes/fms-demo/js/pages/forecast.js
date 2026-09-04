/* ============================================================================
   CASHFLOW FORECAST
   ============================================================================ */

function renderForecast() {
  const events = DEMO.scheduledEvents;
  const chart = Charts.lineChart({
    values: DEMO.forecastBalance,
    labels: ["Sep","","Oct","","Nov","","Dec",""],
    color: "#1AB573", width: 900, height: 220,
  });
  const inflow = events.filter(e => e.type === "Income").reduce((s, e) => s + e.amount, 0);
  const outflow = events.filter(e => e.type === "Expense").reduce((s, e) => s + e.amount, 0);

  return `
  <div class="page-header">
    <div><h1>Cashflow Forecast</h1><p>AI-projected balance based on recurring income, bills, and scheduled events</p></div>
    <div class="page-actions"><button class="btn primary" onclick="showToast('Scenario builder — demo only')">${icon("sparkles",{size:14})} Run what-if scenario</button></div>
  </div>

  <div class="grid grid-3 mb-16">
    <div class="card kpi-card"><span class="kpi-label">Projected 90-day inflow</span><div class="kpi-value text-green">${fmtMoney(inflow,"",0)}</div></div>
    <div class="card kpi-card"><span class="kpi-label">Projected 90-day outflow</span><div class="kpi-value text-red">${fmtMoney(outflow,"",0)}</div></div>
    <div class="card kpi-card"><span class="kpi-label">Forecast confidence</span><div class="kpi-value">92%</div></div>
  </div>

  <div class="card mb-16">
    <div class="card-head"><div><h3>Projected cash balance</h3><div class="sub">Next 4 months, AED</div></div><span class="pill green">Trending up</span></div>
    <div class="card-pad">${chart}</div>
  </div>

  <div class="grid grid-12">
    <div class="card" style="grid-column: span 7;">
      <div class="card-head"><div><h3>Scheduled events</h3><div class="sub">Detected recurring & one-off items</div></div></div>
      <div class="table-wrap card-pad" style="padding-top:8px;">
        <table class="tbl">
          <thead><tr><th>Date</th><th>Description</th><th>Type</th><th class="num">Amount</th><th>Confidence</th></tr></thead>
          <tbody>
            ${events.map(e => `
              <tr>
                <td class="muted">${fmtDateShort(e.date)}</td>
                <td class="fw-600">${esc(e.desc)}</td>
                <td><span class="pill ${e.type === "Income" ? "green" : "amber"}">${e.type}</span></td>
                <td class="num ${e.type === "Income" ? "text-green" : "text-red"}">${e.type === "Income" ? "+" : "-"}${fmtMoney(e.amount, "", 0)}</td>
                <td><span class="text-xs muted">${e.confidence}%</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
    <div class="card" style="grid-column: span 5;">
      <div class="card-head"><div><h3>Timeline</h3><div class="sub">September</div></div></div>
      <div class="card-pad">
        <div class="timeline">
          ${events.filter(e => e.date.startsWith("2026-09")).map(e => `
            <div class="timeline-item ${e.type.toLowerCase()}">
              <div class="text-xs muted">${fmtDate(e.date)}</div>
              <div class="text-sm fw-600">${esc(e.desc)}</div>
              <div class="text-sm fw-700" style="color:${e.type === "Income" ? "#0F9D63" : "#C0362C"}">${e.type === "Income" ? "+" : "-"}${fmtMoney(e.amount, "", 0)}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  </div>
  `;
}
