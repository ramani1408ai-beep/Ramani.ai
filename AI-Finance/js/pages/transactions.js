/* ============================================================================
   TRANSACTIONS
   ============================================================================ */

function renderTransactions() {
  const f = AppState.txFilters;
  let rows = AppState.transactions.slice();
  if (f.status !== "all") rows = rows.filter(t => t.status === f.status);
  if (f.q) {
    const q = f.q.toLowerCase();
    rows = rows.filter(t => t.description.toLowerCase().includes(q) || t.account.toLowerCase().includes(q) || t.bank.toLowerCase().includes(q));
  }

  const totalDebit = rows.reduce((s, t) => s + (t.debit || 0), 0);
  const totalCredit = rows.reduce((s, t) => s + (t.credit || 0), 0);
  const aiTaggedCount = AppState.transactions.filter(t => t.aiTagged).length;
  const avgConf = Math.round(AppState.transactions.filter(t => t.aiTagged).reduce((s, t) => s + t.aiConfidence, 0) / (aiTaggedCount || 1));

  return `
  <div class="page-header">
    <div><h1>Transactions</h1><p>General ledger activity across every linked account</p></div>
    <div class="page-actions">
      <button class="btn" onclick="openTab('capture')">${icon("bolt", { size: 14 })} Capture new</button>
      <button class="btn primary" onclick="showToast('Export queued — demo only')">${icon("download", { size: 14 })} Export</button>
    </div>
  </div>

  <div class="grid grid-4 mb-16">
    <div class="card kpi-card">
      <span class="kpi-label">Total Debits</span>
      <div class="kpi-value text-red">${fmtMoney(totalDebit, "", 0)}</div>
    </div>
    <div class="card kpi-card">
      <span class="kpi-label">Total Credits</span>
      <div class="kpi-value text-green">${fmtMoney(totalCredit, "", 0)}</div>
    </div>
    <div class="card kpi-card">
      <span class="kpi-label">Awaiting Reconciliation</span>
      <div class="kpi-value">${AppState.transactions.filter(t => t.status === "Pending").length}</div>
    </div>
    <div class="card kpi-card">
      <span class="kpi-label">AI-Categorized</span>
      <div class="kpi-value">${aiTaggedCount}<span class="text-sm muted fw-600"> / ${AppState.transactions.length}</span></div>
      <span class="ai-pill ghost" style="width:fit-content;">${icon("sparkles",{size:10})}${avgConf}% avg confidence</span>
    </div>
  </div>

  <div class="card">
    <div class="toolbar">
      <div class="search-box">
        ${icon("search", { size: 14 })}
        <input type="text" placeholder="Search description, account, bank…" value="${esc(f.q)}" oninput="txSetFilter('q', this.value)" />
      </div>
      <select class="select-mini" onchange="txSetFilter('status', this.value)">
        <option value="all" ${f.status === "all" ? "selected" : ""}>All statuses</option>
        <option value="Reconciled" ${f.status === "Reconciled" ? "selected" : ""}>Reconciled</option>
        <option value="Pending" ${f.status === "Pending" ? "selected" : ""}>Pending</option>
      </select>
      <span class="text-xs muted" style="margin-left:auto;">${rows.length} of ${AppState.transactions.length} transactions</span>
    </div>
    <div class="table-wrap">
      <table class="tbl">
        <thead><tr><th>Date</th><th>Description</th><th>Account</th><th>Source</th><th>Bank</th><th class="num">Debit</th><th class="num">Credit</th><th>Status</th></tr></thead>
        <tbody>
          ${rows.length ? rows.map(t => `
            <tr>
              <td class="muted">${fmtDateShort(t.date)}</td>
              <td class="fw-600">${esc(t.description)}</td>
              <td>${esc(t.account)}</td>
              <td>${t.aiTagged ? `<span class="ai-pill" title="Categorized automatically by AI">${icon("sparkles",{size:10})}${t.aiConfidence}%</span>` : `<span class="pill slate">Manual</span>`}</td>
              <td class="muted">${esc(t.bank)}</td>
              <td class="num">${t.debit ? fmtMoney(t.debit, "", 2) : ""}</td>
              <td class="num text-green">${t.credit ? fmtMoney(t.credit, "", 2) : ""}</td>
              <td>${statusPill(t.status)}</td>
            </tr>
          `).join("") : `<tr><td colspan="8"><div class="empty-state"><div class="icon-wrap">${icon("search",{size:22})}</div><h3>No matching transactions</h3><p>Try clearing the search or filters.</p></div></td></tr>`}
        </tbody>
      </table>
    </div>
  </div>
  `;
}

function txSetFilter(key, value) {
  AppState.txFilters[key] = value;
  rerenderActivePage();
  if (key === "q") {
    setTimeout(() => { const el = document.querySelector('.search-box input'); if (el) { el.focus(); el.selectionStart = el.selectionEnd = el.value.length; } }, 0);
  }
}
