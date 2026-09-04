/* ============================================================================
   RECONCILIATION — click a bank line then a book line to match them
   ============================================================================ */

/* Finds the unmatched book line the AI would pair with a given unmatched
   bank line — same logic reconAutoMatch() uses in bulk, exposed per-row so
   each side can show its suggestion inline. */
function reconSuggestion(bankLine) {
  if (bankLine.matched) return null;
  return AppState.bookLines.find(k => !k.matched && Math.abs(k.amount - bankLine.amount) < 0.01 && k.date === bankLine.date) || null;
}

function renderReconciliation() {
  const bankLines = AppState.bankLines;
  const bookLines = AppState.bookLines;
  const sel = AppState.reconSelection;
  const unmatchedBank = bankLines.filter(l => !l.matched).length;
  const unmatchedBook = bookLines.filter(l => !l.matched).length;
  const matchedCount = bankLines.filter(l => l.matched).length;
  const suggestions = bankLines.map(b => ({ bank: b, book: reconSuggestion(b) })).filter(s => s.book);

  return `
  <div class="page-header">
    <div><h1>Bank Reconciliation</h1><p>The AI proactively pairs bank lines with book entries — you just confirm</p></div>
    <div class="page-actions">
      <button class="btn primary" onclick="reconAutoMatch()">${icon("sparkles", { size: 14 })} Accept all suggested matches</button>
    </div>
  </div>

  <div class="grid grid-3 mb-16">
    <div class="card kpi-card"><span class="kpi-label">Matched</span><div class="kpi-value text-green">${matchedCount}</div></div>
    <div class="card kpi-card"><span class="kpi-label">Unmatched bank lines</span><div class="kpi-value">${unmatchedBank}</div></div>
    <div class="card kpi-card"><span class="kpi-label">Unmatched book lines</span><div class="kpi-value">${unmatchedBook}</div></div>
  </div>

  ${suggestions.length ? `
  <div class="alert-banner" style="background:#F1EEFE;border:1px solid #DCD0FB;color:#5B3BC4;">
    ${icon("sparkles", { size: 17 })}
    <div><strong>AI found ${suggestions.length} likely match${suggestions.length > 1 ? "es" : ""}</strong> at 99% confidence — look for the sparkle badge below, or accept them all at once.
    <button class="btn sm" style="margin-left:12px;background:#fff;" onclick="reconAutoMatch()">${icon("check",{size:12})} Accept all</button>
    </div>
  </div>` : ""}

  ${sel.bank || sel.book ? `
  <div class="alert-banner amber">
    ${icon("info", { size: 17 })}
    <div>${sel.bank && sel.book ? `Ready to match — click <b>Confirm match</b> below.` : `Select one line from each column to pair them manually.`}
    ${sel.bank && sel.book ? `<button class="btn sm success" style="margin-left:12px;" onclick="reconConfirmMatch()">${icon("check",{size:12})} Confirm match</button><button class="btn sm ghost" onclick="reconClearSelection()">Cancel</button>` : ""}
    </div>
  </div>` : ""}

  <div class="recon-columns">
    <div class="card">
      <div class="card-head"><div><h3>Bank statement</h3><div class="sub">Emirates NBD •• 4471 · Aug 2026</div></div>${icon("bank",{size:16})}</div>
      <div class="card-pad" style="padding-top:10px;">
        ${bankLines.map(l => {
          const suggestion = reconSuggestion(l);
          return `
          <div class="recon-row ${l.matched ? "matched" : ""} ${sel.bank === l.id ? "selected" : ""}" onclick="${l.matched ? "" : `reconSelect('bank','${l.id}')`}">
            <span class="d">${fmtDateShort(l.date)}</span>
            <span class="desc">${esc(l.desc)}${l.matched ? ` <span class="pill green" style="margin-left:6px;">Matched</span>` : suggestion ? ` <span class="ai-pill" style="margin-left:6px;">${icon("sparkles",{size:9})}99%</span>` : ""}</span>
            <span class="flex items-center gap-8">
              <span class="a ${l.amount < 0 ? "text-red" : "text-green"}">${l.amount < 0 ? "-" : "+"}${fmtMoney(Math.abs(l.amount), "", 2)}</span>
              ${suggestion ? `<button class="btn sm success" onclick="event.stopPropagation();reconAcceptSuggestion('${l.id}','${suggestion.id}')">${icon("check",{size:11})}</button>` : ""}
            </span>
          </div>
        `;
        }).join("")}
      </div>
    </div>

    <div class="card">
      <div class="card-head"><div><h3>Book entries</h3><div class="sub">General ledger · Aug 2026</div></div>${icon("list",{size:16})}</div>
      <div class="card-pad" style="padding-top:10px;">
        ${bookLines.map(l => `
          <div class="recon-row ${l.matched ? "matched" : ""} ${sel.book === l.id ? "selected" : ""}" onclick="${l.matched ? "" : `reconSelect('book','${l.id}')`}">
            <span class="d">${fmtDateShort(l.date)}</span>
            <span class="desc">${esc(l.desc)}${l.matched ? ` <span class="pill green" style="margin-left:6px;">Matched</span>` : ""}</span>
            <span class="a ${l.amount < 0 ? "text-red" : "text-green"}">${l.amount < 0 ? "-" : "+"}${fmtMoney(Math.abs(l.amount), "", 2)}</span>
          </div>
        `).join("")}
      </div>
    </div>
  </div>
  `;
}

function reconSelect(side, id) {
  AppState.reconSelection[side] = AppState.reconSelection[side] === id ? null : id;
  rerenderActivePage();
}

function reconClearSelection() {
  AppState.reconSelection = { bank: null, book: null };
  rerenderActivePage();
}

function reconConfirmMatch() {
  const { bank, book } = AppState.reconSelection;
  if (!bank || !book) return;
  const b = AppState.bankLines.find(l => l.id === bank);
  const k = AppState.bookLines.find(l => l.id === book);
  if (b) b.matched = true;
  if (k) k.matched = true;
  AppState.reconSelection = { bank: null, book: null };
  rerenderActivePage();
  showToast("Lines matched and reconciled");
}

function reconAcceptSuggestion(bankId, bookId) {
  const b = AppState.bankLines.find(l => l.id === bankId);
  const k = AppState.bookLines.find(l => l.id === bookId);
  if (b) b.matched = true;
  if (k) k.matched = true;
  AppState.reconSelection = { bank: null, book: null };
  rerenderActivePage();
  showToast("AI-suggested match accepted");
}

function reconAutoMatch() {
  let count = 0;
  AppState.bankLines.forEach(b => {
    if (b.matched) return;
    const k = AppState.bookLines.find(k2 => !k2.matched && Math.abs(k2.amount - b.amount) < 0.01 && k2.date === b.date);
    if (k) { b.matched = true; k.matched = true; count++; }
  });
  rerenderActivePage();
  showToast(count ? `AI matched ${count} more line${count > 1 ? "s" : ""}` : "No further high-confidence matches found");
}
