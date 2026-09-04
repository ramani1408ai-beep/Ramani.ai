/* ============================================================================
   SECONDARY PAGES — Cheques, Live Transactions (SMS), Audit Logs,
   Workspace Management, Market Watch, Properties
   ============================================================================ */

function renderCheques() {
  const cheques = DEMO.cheques;
  return `
  <div class="page-header">
    <div><h1>Cheque Management</h1><p>Issued & received cheques, tracked to clearance</p></div>
    <div class="page-actions"><button class="btn primary" onclick="showToast('New cheque — demo only')">${icon("plus",{size:14})} Register cheque</button></div>
  </div>
  <div class="card">
    <div class="table-wrap">
      <table class="tbl">
        <thead><tr><th>Cheque #</th><th>Type</th><th>Payee</th><th class="num">Amount</th><th>Due date</th><th>Status</th></tr></thead>
        <tbody>
          ${cheques.map(c => {
            const d = daysUntil(c.due);
            return `<tr>
              <td class="mono fw-600">${esc(c.number)}</td>
              <td><span class="pill ${c.type === "Issued" ? "amber" : "blue"}">${c.type}</span></td>
              <td class="fw-600">${esc(c.payee)}</td>
              <td class="num mono">${fmtMoney(c.amount,"",2)}</td>
              <td>${fmtDate(c.due)} ${c.status === "Pending" && d >= 0 && d <= 7 ? `<span class="pill red" style="margin-left:6px;">${d}d</span>` : ""}</td>
              <td>${statusPill(c.status)}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  </div>
  `;
}

function renderLiveTransactions() {
  return `
  <div class="page-header">
    <div><h1>Live Transactions</h1><p>Bank SMS alerts, parsed into transactions in real time</p></div>
    <div class="page-actions"><span class="topbar-pill"><span class="dot"></span>Live feed connected</span></div>
  </div>
  <div class="card">
    <div class="card-head"><div><h3>Incoming SMS feed</h3><div class="sub">Auto-parsed by the AI engine</div></div></div>
    <div class="card-pad" style="padding-top:8px;">
      ${DEMO.smsFeed.map(s => `
        <div class="flex items-center gap-12" style="padding:12px 0;border-bottom:1px solid var(--border-soft);">
          <div style="width:36px;height:36px;border-radius:10px;background:#EAF3FD;color:#378ADD;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${icon("sms",{size:16})}</div>
          <div style="flex:1;min-width:0;">
            <div class="flex justify-between"><span class="text-sm fw-700">${esc(s.bank)}</span><span class="text-xs muted">${esc(s.time)}</span></div>
            <div class="text-xs muted mt-8" style="line-height:1.5;">${esc(s.text)}</div>
          </div>
          <div class="text-sm fw-700 ${s.parsed.amount < 0 ? "text-red" : "text-green"}" style="flex-shrink:0;">${s.parsed.amount < 0 ? "-" : "+"}${fmtMoney(Math.abs(s.parsed.amount),"",2)}</div>
        </div>
      `).join("")}
    </div>
  </div>
  `;
}

function renderAuditLogs() {
  return `
  <div class="page-header"><div><h1>Audit Logs</h1><p>Every action taken across the workspace</p></div></div>
  <div class="card">
    <div class="table-wrap">
      <table class="tbl">
        <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Detail</th></tr></thead>
        <tbody>
          ${DEMO.auditLogs.map(a => `<tr><td class="mono muted">${esc(a.time)}</td><td class="fw-600">${esc(a.user)}</td><td><span class="pill slate">${esc(a.action)}</span></td><td class="muted">${esc(a.detail)}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
  </div>
  `;
}

function renderWorkspace() {
  return `
  <div class="page-header"><div><h1>Workspace Management</h1><p>Admin-only — manage entities and team access</p></div></div>
  <div class="grid grid-2">
    <div class="card">
      <div class="card-head"><h3>Entities</h3></div>
      <div class="card-pad" style="padding-top:8px;">
        <div class="flex items-center gap-10" style="padding:10px 0;border-bottom:1px solid var(--border-soft);">
          <div style="width:32px;height:32px;border-radius:9px;background:#EAF3FD;color:#378ADD;display:flex;align-items:center;justify-content:center;">${icon("building",{size:15})}</div>
          <div><div class="text-sm fw-700">${esc(DEMO.company.name)}</div><div class="text-xs muted">Primary workspace · UAE</div></div>
          <span class="pill green" style="margin-left:auto;">Active</span>
        </div>
        <div class="flex items-center gap-10" style="padding:10px 0;">
          <div style="width:32px;height:32px;border-radius:9px;background:#F3EEFF;color:#8B5CF6;display:flex;align-items:center;justify-content:center;">${icon("briefcase",{size:15})}</div>
          <div><div class="text-sm fw-700">Overseas Holdings LLC</div><div class="text-xs muted">Secondary workspace · UK</div></div>
          <span class="pill slate" style="margin-left:auto;">Invited</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><h3>Team access</h3></div>
      <div class="card-pad" style="padding-top:8px;">
        ${[["Ahmed Al Rahman","Admin","AR","#378ADD"],["Sara Khan","Accountant","SK","#1AB573"],["Yousef Nasser","Viewer","YN","#F59E0B"]].map(([name,role,init,color]) => `
          <div class="flex items-center gap-10" style="padding:9px 0;">
            <div style="width:30px;height:30px;border-radius:50%;background:${color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;">${init}</div>
            <div class="text-sm fw-600">${name}</div>
            <span class="pill slate" style="margin-left:auto;">${role}</span>
          </div>
        `).join("")}
      </div>
    </div>
  </div>
  `;
}

function renderMarketWatch() {
  return `
  <div class="page-header"><div><h1>Market Watch</h1><p>Reference prices across commodities the portfolio is exposed to</p></div></div>
  <div class="card">
    <div class="table-wrap">
      <table class="tbl">
        <thead><tr><th>Instrument</th><th class="num">Last Price</th><th>7-day trend</th><th class="num">Your Position</th></tr></thead>
        <tbody>
          ${DEMO.commodities.map(c => `
            <tr>
              <td class="flex items-center gap-10" style="border-bottom:none;">
                <div style="width:28px;height:28px;border-radius:8px;background:${c.color}22;color:${c.color};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:9.5px;">${c.symbol}</div>
                <div><div class="fw-700 text-sm">${esc(c.name)}</div><div class="text-xs muted">per ${c.unit}</div></div>
              </td>
              <td class="num mono fw-700">${fmtMoney(c.price,"",2)}</td>
              <td>${Charts.sparkline({ values: c.history.slice(-10), color: c.color, width: 90, height: 28 })}</td>
              <td class="num mono">${c.qty} ${c.unit}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  </div>
  `;
}

function renderProperties() {
  return `
  <div class="page-header">
    <div><h1>Properties</h1><p>Real estate portfolio across the UAE</p></div>
    <div class="page-actions"><button class="btn primary" onclick="showToast('Add property — demo only')">${icon("plus",{size:14})} Add property</button></div>
  </div>
  <div class="grid grid-2">
    ${DEMO.properties.map(p => `
      <div class="card mb-16">
        <div class="card-pad">
          <div class="flex justify-between items-center mb-8">
            <div class="fw-700">${esc(p.name)}</div>
            <span class="pill ${p.status === "Leased" ? "green" : p.status === "Vacant" ? "red" : "blue"}">${p.status}</span>
          </div>
          <div class="text-xs muted mb-16">${esc(p.location)}</div>
          <div class="flex justify-between">
            <div><div class="text-xs muted">Market value</div><div class="text-sm fw-700">${fmtMoney(p.value,"",0)}</div></div>
            <div><div class="text-xs muted">Gross yield</div><div class="text-sm fw-700">${p.yield ? p.yield + "%" : "—"}</div></div>
          </div>
        </div>
      </div>
    `).join("")}
  </div>
  `;
}
