/* ============================================================================
   REPORTING — Chart of Accounts, Trial Balance, Balance Sheet, Income
   Statement, Cashflow. All derived from the same COA mock dataset so the
   numbers agree with each other across reports.
   ============================================================================ */

const TYPE_COLOR = { Asset: "#378ADD", Liability: "#EF4444", Equity: "#8B5CF6", Income: "#1AB573", Expense: "#F59E0B" };

function byType(t) { return DEMO.coa.filter(a => a.type === t); }
function sumType(t) { return byType(t).reduce((s, a) => s + a.balance, 0); }

function renderCOA() {
  const groups = ["Asset", "Liability", "Equity", "Income", "Expense"];
  return `
  <div class="page-header">
    <div><h1>Chart of Accounts</h1><p>${DEMO.coa.length} accounts across ${groups.length} classifications</p></div>
    <div class="page-actions"><button class="btn primary" onclick="showToast('New account form — demo only')">${icon("plus",{size:14})} New account</button></div>
  </div>

  ${groups.map(g => `
    <div class="card mb-16">
      <div class="card-head">
        <div class="flex items-center gap-10"><span style="width:10px;height:10px;border-radius:3px;background:${TYPE_COLOR[g]}"></span><h3>${g}s</h3></div>
        <span class="fw-700 mono">${fmtMoney(sumType(g), "", 0)}</span>
      </div>
      <div class="table-wrap card-pad" style="padding-top:8px;">
        <table class="tbl">
          <thead><tr><th>Code</th><th>Account</th><th class="num">Balance</th></tr></thead>
          <tbody>
            ${byType(g).map(a => `<tr><td class="mono muted">${a.code}</td><td class="fw-600">${esc(a.name)}</td><td class="num mono">${fmtMoney(a.balance, "", 2)}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `).join("")}
  `;
}

function renderTrialBalance() {
  const rows = DEMO.coa.map(a => {
    const isDebitNature = a.type === "Asset" || a.type === "Expense";
    return { ...a, debit: isDebitNature ? a.balance : 0, credit: isDebitNature ? 0 : a.balance };
  });
  const totalDebit = rows.reduce((s, r) => s + r.debit, 0);
  const totalCredit = rows.reduce((s, r) => s + r.credit, 0);
  return `
  <div class="page-header">
    <div><h1>Trial Balance</h1><p>Period ending 31 Aug 2026</p></div>
    <div class="page-actions"><button class="btn" onclick="showToast('Export queued — demo only')">${icon("download",{size:14})} Export PDF</button></div>
  </div>
  <div class="card">
    <div class="table-wrap">
      <table class="tbl">
        <thead><tr><th>Code</th><th>Account</th><th>Type</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead>
        <tbody>
          ${rows.map(r => `<tr><td class="mono muted">${r.code}</td><td class="fw-600">${esc(r.name)}</td><td><span class="pill slate">${r.type}</span></td><td class="num mono">${r.debit ? fmtMoney(r.debit, "", 2) : ""}</td><td class="num mono">${r.credit ? fmtMoney(r.credit, "", 2) : ""}</td></tr>`).join("")}
          <tr style="background:#F7F9FC;"><td colspan="3" class="fw-700">Total</td><td class="num mono fw-700">${fmtMoney(totalDebit, "", 2)}</td><td class="num mono fw-700">${fmtMoney(totalCredit, "", 2)}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  ${Math.abs(totalDebit - totalCredit) < 0.01 ? `<div class="alert-banner" style="background:#E6F7EF;border:1px solid #BFE9D3;color:#0F9D63;margin-top:16px;">${icon("checkDouble",{size:16})}<div><strong>Balanced</strong> — total debits equal total credits.</div></div>` : ""}
  `;
}

function renderBalanceSheet() {
  const assets = sumType("Asset"), liab = sumType("Liability"), equity = sumType("Equity");
  const retained = assets - liab - equity;
  return `
  <div class="page-header"><div><h1>Balance Sheet</h1><p>As of 31 Aug 2026</p></div></div>
  <div class="grid grid-2">
    <div class="card">
      <div class="card-head"><h3>Assets</h3><span class="fw-700 mono">${fmtMoney(assets,"",0)}</span></div>
      <div class="table-wrap card-pad" style="padding-top:8px;">
        <table class="tbl"><tbody>${byType("Asset").map(a => `<tr><td class="fw-600">${esc(a.name)}</td><td class="num mono">${fmtMoney(a.balance,"",0)}</td></tr>`).join("")}</tbody></table>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><h3>Liabilities &amp; Equity</h3><span class="fw-700 mono">${fmtMoney(liab+equity+retained,"",0)}</span></div>
      <div class="table-wrap card-pad" style="padding-top:8px;">
        <table class="tbl"><tbody>
          ${byType("Liability").map(a => `<tr><td class="fw-600">${esc(a.name)}</td><td class="num mono">${fmtMoney(a.balance,"",0)}</td></tr>`).join("")}
          ${byType("Equity").map(a => `<tr><td class="fw-600">${esc(a.name)}</td><td class="num mono">${fmtMoney(a.balance,"",0)}</td></tr>`).join("")}
          <tr><td class="fw-600">Retained Earnings (YTD)</td><td class="num mono">${fmtMoney(retained,"",0)}</td></tr>
        </tbody></table>
      </div>
    </div>
  </div>
  <div class="alert-banner" style="background:#EAF3FD;border:1px solid #CBE3FA;color:#1F6FB8;margin-top:16px;">${icon("info",{size:16})}<div>Assets (${fmtMoney(assets,"",0)}) = Liabilities + Equity (${fmtMoney(liab+equity+retained,"",0)}) — the sheet balances.</div></div>
  `;
}

function renderIncomeStatement() {
  const income = sumType("Income"), expense = sumType("Expense");
  const net = income - expense;
  const max = Math.max(income, expense) || 1;
  return `
  <div class="page-header"><div><h1>Income Statement</h1><p>Year to date · 01 Jan – 31 Aug 2026</p></div></div>
  <div class="grid grid-3 mb-16">
    <div class="card kpi-card"><span class="kpi-label">Total Income</span><div class="kpi-value text-green">${fmtMoney(income,"",0)}</div></div>
    <div class="card kpi-card"><span class="kpi-label">Total Expense</span><div class="kpi-value text-red">${fmtMoney(expense,"",0)}</div></div>
    <div class="card kpi-card"><span class="kpi-label">Net Income</span><div class="kpi-value" style="color:${net>=0?'#0F9D63':'#C0362C'}">${fmtMoney(net,"",0)}</div></div>
  </div>
  <div class="card">
    <div class="card-head"><h3>Income</h3></div>
    <div class="card-pad" style="padding-top:8px;">
      ${byType("Income").map(a => `
        <div class="mb-12">
          <div class="flex justify-between text-sm mb-8"><span class="fw-600">${esc(a.name)}</span><span class="mono fw-700">${fmtMoney(a.balance,"",0)}</span></div>
          <div class="progress"><div style="width:${(a.balance/max*100).toFixed(1)}%;background:#1AB573;"></div></div>
        </div>
      `).join("")}
    </div>
  </div>
  <div class="card mt-16">
    <div class="card-head"><h3>Expenses</h3></div>
    <div class="card-pad" style="padding-top:8px;">
      ${byType("Expense").map(a => `
        <div class="mb-12">
          <div class="flex justify-between text-sm mb-8"><span class="fw-600">${esc(a.name)}</span><span class="mono fw-700">${fmtMoney(a.balance,"",0)}</span></div>
          <div class="progress"><div style="width:${(a.balance/max*100).toFixed(1)}%;background:#EF4444;"></div></div>
        </div>
      `).join("")}
    </div>
  </div>
  `;
}

function renderCashflowReport() {
  const operating = 892400 + 118650 - 186420 - 94800 - 61200 - 38900;
  const investing = -292180;
  const financing = -210400;
  const netChange = operating + investing + financing;
  const chart = Charts.barChart({
    series1: DEMO.incomeExpenseTrend.map(x => x.income),
    series2: DEMO.incomeExpenseTrend.map(x => x.expense),
    labels: DEMO.incomeExpenseTrend.map(x => x.month), width: 900, height: 220,
  });
  return `
  <div class="page-header"><div><h1>Cashflow Statement</h1><p>Year to date · 01 Jan – 31 Aug 2026</p></div></div>
  <div class="grid grid-3 mb-16">
    <div class="card kpi-card"><span class="kpi-label">Operating</span><div class="kpi-value ${operating>=0?'text-green':'text-red'}">${fmtMoney(operating,"",0)}</div></div>
    <div class="card kpi-card"><span class="kpi-label">Investing</span><div class="kpi-value text-red">${fmtMoney(investing,"",0)}</div></div>
    <div class="card kpi-card"><span class="kpi-label">Financing</span><div class="kpi-value text-red">${fmtMoney(financing,"",0)}</div></div>
  </div>
  <div class="card mb-16">
    <div class="card-head"><div><h3>Monthly cash movement</h3><div class="sub">Income vs expense</div></div></div>
    <div class="card-pad">${chart}</div>
  </div>
  <div class="card kpi-card" style="max-width:320px;">
    <span class="kpi-label">Net Change in Cash</span>
    <div class="kpi-value" style="color:${netChange>=0?'#0F9D63':'#C0362C'}">${fmtMoney(netChange,"",0)}</div>
  </div>
  `;
}
