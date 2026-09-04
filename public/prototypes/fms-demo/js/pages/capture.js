/* ============================================================================
   CAPTURE — AI document capture workflow (flagship feature demo)
   Flow: pick a sample document -> simulated AI extraction -> review &
   chat with the AI about the document -> confirm & post to the ledger.
   ============================================================================ */

function renderCapture() {
  const cap = AppState.capture;

  if (cap.autoRun) return renderCaptureAutoPage();

  const stepOrder = ["select", "processing", "review", "done"];
  const idx = stepOrder.indexOf(cap.step);

  const stepMeta = [
    { key: "select", label: "Capture", sub: "Upload or pick a document" },
    { key: "processing", label: "Extract", sub: "AI reads the document" },
    { key: "review", label: "Review", sub: "Confirm fields & journal" },
    { key: "done", label: "Posted", sub: "Booked to the ledger" },
  ];

  const stepsHtml = stepMeta.map((s, i) => {
    const cls = i < idx ? "done" : i === idx ? "active" : "";
    return `
      <div class="capture-step ${cls}">
        <div class="num">${i < idx ? icon("check", { size: 16 }) : i + 1}</div>
        <div class="lbl">${s.label}</div>
        <div class="sub">${s.sub}</div>
      </div>
      ${i < stepMeta.length - 1 ? `<div class="capture-step-line"></div>` : ""}
    `;
  }).join("");

  let body = "";
  if (cap.step === "select") body = renderCaptureSelect();
  else if (cap.step === "processing") body = renderCaptureProcessing();
  else if (cap.step === "review") body = renderCaptureReview();
  else body = renderCaptureDone();

  return `
  <div class="page-header">
    <div>
      <h1>${icon("bolt", { size: 19, cls: "mt-8" })} AI Capture</h1>
      <p>Point it at any bill, invoice, or cheque — it reads, categorizes, and drafts the journal entry for you.</p>
    </div>
    <div class="page-actions">
      <button class="btn ghost sm" onclick="captureReset()">${icon("refresh", { size: 13 })} Start over</button>
    </div>
  </div>

  <div class="capture-steps">${stepsHtml}</div>

  ${body}

  ${captureColumnsHtml()}
  `;
}

function captureColumnsHtml() {
  return `
  <div class="captures-columns">
    <div class="card">
      <div class="card-head"><div><h3>Pending captures</h3><div class="sub">Awaiting review</div></div><span class="pill amber">${AppState.pendingCaptures.length}</span></div>
      <div class="card-pad" style="padding-top:10px;">
        ${AppState.pendingCaptures.length ? AppState.pendingCaptures.map(c => `
          <div class="capture-row" style="cursor:pointer;" onclick="captureReviewDoc('${c.id}')">
            <div class="ic">${icon("file", { size: 16 })}</div>
            <div class="info"><div class="t">${esc(c.vendor)}</div><div class="s">${esc(c.kind)} · ${fmtDateShort(c.date)} · ${c.confidence}% confidence</div></div>
            <div class="amt">${fmtMoney(c.amount, "", 0)}</div>
          </div>
        `).join("") : `<div class="text-sm muted" style="padding:10px 0;">Nothing pending — every capture has been reviewed.</div>`}
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div><h3>Recently booked</h3><div class="sub">Posted to the general ledger</div></div><span class="pill green">${AppState.bookedCaptures.length}</span></div>
      <div class="card-pad" style="padding-top:10px;">
        ${AppState.bookedCaptures.length ? AppState.bookedCaptures.slice().reverse().map(c => `
          <div class="capture-row booked">
            <div class="ic">${icon("check", { size: 16 })}</div>
            <div class="info"><div class="t">${esc(c.vendor)}</div><div class="s">${esc(c.debitAccount)}</div></div>
            <div class="amt">${fmtMoney(c.amount, "", 0)}</div>
          </div>
        `).join("") : `<div class="text-sm muted" style="padding:10px 0;">Nothing booked yet — try the sample documents above.</div>`}
      </div>
    </div>
  </div>
  `;
}

function renderCaptureSelect() {
  const queueCount = DEMO.captureSamples.filter(d => !AppState.bookedCaptures.some(b => b.id === d.id)).length;
  return `
  <div class="card mb-16" style="background:linear-gradient(135deg, #0F1B2D 0%, #16233A 55%, #1c2e4a 100%); border: none; overflow:hidden; position:relative;">
    <div style="position:absolute;inset:0;background-image:radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);background-size:22px 22px;"></div>
    <div class="card-pad flex items-center gap-16" style="position:relative;flex-wrap:wrap;">
      <div style="width:48px;height:48px;border-radius:14px;background:var(--ai-grad);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 10px 24px -6px rgba(139,92,246,0.55);">${icon("sparkles", { size: 22, cls: "" })}</div>
      <div style="flex:1;min-width:220px;color:#fff;">
        <div class="fw-700" style="font-size:15px;">Let AI process the whole queue</div>
        <div class="text-sm" style="color:rgba(255,255,255,0.6);margin-top:2px;">${queueCount} document${queueCount === 1 ? "" : "s"} waiting. High-confidence documents post automatically — anything uncertain is flagged for your review.</div>
      </div>
      <button class="btn success" style="flex-shrink:0;" onclick="captureAutoProcessAll()" ${queueCount === 0 ? "disabled" : ""}>${icon("bolt", { size: 15 })} Auto-process all with AI</button>
    </div>
  </div>

  <div class="dropzone">
    <div class="icon-wrap">${icon("upload", { size: 24 })}</div>
    <h3>Or drag &amp; drop a document, or pick one sample to walk through it manually</h3>
    <p>PDF, JPG, PNG, or forwarded email attachments — this prototype ships with 6 realistic samples.</p>
  </div>
  <div class="sample-grid mb-16">
    ${DEMO.captureSamples.map(d => {
      const booked = AppState.bookedCaptures.some(b => b.id === d.id);
      return `
      <button class="sample-card" onclick="captureSelectSample('${d.id}')" ${booked ? "disabled" : ""} style="${booked ? "opacity:.5;" : ""}">
        <div class="file-icon">${icon(booked ? "check" : "file", { size: 18 })}</div>
        <div>
          <div class="file-name">${esc(d.file)}</div>
          <div class="file-meta">${esc(d.kind)} · ${fmtMoney(d.amount, "", 0)}</div>
          <div class="mt-8 flex items-center gap-6" style="flex-wrap:wrap;">
            <span class="pill blue">${esc(d.category.replace(/_/g, " "))}</span>
            ${booked ? `<span class="pill green">Booked</span>` : `<span class="ai-pill ghost">${icon("sparkles", { size: 10 })}${d.confidence}%</span>`}
          </div>
        </div>
      </button>
    `;
    }).join("")}
  </div>
  `;
}

function renderCaptureAutoPage() {
  const ar = AppState.capture.autoRun;
  const total = ar.queue.length;
  const processed = ar.index;
  const pct = Math.round((processed / total) * 100);

  return `
  <div class="card mb-16">
    <div class="card-pad">
      ${!ar.done ? `
        <div class="flex items-center gap-12 mb-16">
          <div class="spinner" style="width:26px;height:26px;border-width:2.5px;"></div>
          <div>
            <div class="fw-700" style="color:var(--navy);">AI is processing ${total} document${total === 1 ? "" : "s"}…</div>
            <div class="text-xs muted">${processed} of ${total} complete</div>
          </div>
        </div>
        <div class="progress mb-16"><div style="width:${pct}%;background:var(--ai-grad);transition:width .4s;"></div></div>
      ` : `
        <div class="flex items-center gap-10 mb-16">
          <div style="width:34px;height:34px;border-radius:10px;background:#E6F7EF;color:#0F9D63;display:flex;align-items:center;justify-content:center;">${icon("checkDouble", { size: 18 })}</div>
          <div>
            <div class="fw-700" style="color:var(--navy);">Done — processed ${total} document${total === 1 ? "" : "s"} in ${(ar.elapsedMs / 1000).toFixed(1)}s</div>
            <div class="text-xs muted">AI reads faster than it takes to click through them manually</div>
          </div>
        </div>
        <div class="grid grid-3 mb-16">
          <div class="card auto-stat"><div class="n text-green">${ar.stats.posted}</div><div class="l">Auto-posted</div></div>
          <div class="card auto-stat"><div class="n" style="color:#B4780A">${ar.stats.flagged}</div><div class="l">Flagged for review</div></div>
          <div class="card auto-stat"><div class="n">${(ar.elapsedMs / 1000).toFixed(1)}s</div><div class="l">Total time</div></div>
        </div>
      `}

      <div class="proc-feed">
        ${ar.log.slice().reverse().map(l => `
          <div class="proc-line ${l.status}">
            <div class="pic">${icon(l.status === "ok" ? "check" : l.status === "flag" ? "alertTriangle" : "clock", { size: 13 })}</div>
            <div class="t">${l.status === "busy" ? esc(l.text) : `<b>${esc(l.doc.vendor)}</b> — ${esc(l.text)}`}</div>
            ${l.status !== "busy" ? `<div class="conf">${l.doc.confidence}%</div>` : ""}
          </div>
        `).join("")}
      </div>

      ${ar.done ? `
        <div class="flex gap-10 mt-16">
          <button class="btn" onclick="captureExitAutoRun()">${icon("arrowRight", { size: 14 })} Back to Capture</button>
          ${ar.stats.flagged ? `<button class="btn primary" onclick="captureReviewFirstFlagged()">${icon("sparkles", { size: 14 })} Review flagged documents</button>` : `<button class="btn primary" onclick="openTab('transactions')">${icon("exchange", { size: 14 })} View in Transactions</button>`}
        </div>
      ` : ""}
    </div>
  </div>

  ${captureColumnsHtml()}
  `;
}

function renderCaptureProcessing() {
  return `
  <div class="card mb-16">
    <div class="ai-processing">
      <div class="spinner"></div>
      <div class="step-text">Analyzing “${esc(AppState.capture.doc.file)}”…</div>
      <div class="step-list" id="ai-steps">
        <div>${icon("check", { size: 12 })} Document uploaded</div>
        <div>${icon("check", { size: 12 })} OCR text extracted</div>
        <div class="pulse">${icon("clock", { size: 12 })} Matching vendor & Chart of Accounts…</div>
        <div>${icon("clock", { size: 12 })} Drafting journal entry…</div>
      </div>
    </div>
  </div>
  `;
}

function renderCaptureReview() {
  const d = AppState.capture.doc;
  const msgs = AppState.capture.chat;
  return `
  <div class="extract-grid mb-16">
    <div class="doc-preview">
      <div class="doc-page">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span class="text-xs fw-700" style="color:var(--navy)">${esc(d.file)}</span>
          <span class="pill blue">${Math.round(d.confidence)}% confidence</span>
        </div>
        <div class="doc-line hl" style="width:60%;height:14px;"></div>
        <div class="doc-line" style="width:90%"></div>
        <div class="doc-line" style="width:75%"></div>
        <div class="doc-line" style="width:82%"></div>
        <div style="height:10px"></div>
        <div class="doc-line hl" style="width:40%;height:12px;"></div>
        <div class="doc-line" style="width:95%"></div>
        <div class="doc-line" style="width:60%"></div>
        <div style="height:10px"></div>
        <div class="doc-line" style="width:88%"></div>
        <div class="doc-line" style="width:70%"></div>
        <div class="doc-line hl" style="width:50%;height:12px;margin-top:auto;"></div>
      </div>
    </div>

    <div>
      <div class="card mb-16">
        <div class="card-head"><div><h3>Extracted fields</h3><div class="sub">Editable before posting</div></div><span class="pill green">${esc(d.category.replace(/_/g," "))}</span></div>
        <div class="card-pad" style="padding-top:8px;">
          <div class="field-row"><span class="k">Vendor</span><span class="v">${esc(d.vendor)}</span></div>
          <div class="field-row"><span class="k">Document type</span><span class="v">${esc(d.kind)}</span></div>
          <div class="field-row"><span class="k">Amount</span><span class="v">${fmtMoney(d.amount)}</span></div>
          <div class="field-row"><span class="k">Date</span><span class="v">${fmtDate(d.date)}</span></div>
          ${d.property ? `<div class="field-row"><span class="k">Property</span><span class="v">${esc(d.property)}</span></div>` : ""}
          <div class="confidence-bar"><div style="width:${d.confidence}%"></div></div>
        </div>
      </div>

      <div class="card">
        <div class="card-head"><div><h3>Draft journal entry</h3><div class="sub">Double-entry, ready to post</div></div></div>
        <div class="card-pad" style="padding-top:8px;">
          <div class="journal-line">
            <span class="acct">${esc(d.debitAccount)}</span>
            <span class="tag dr">DR</span>
            <span class="mono fw-700">${fmtMoney(d.amount, "", 2)}</span>
          </div>
          <div class="journal-line">
            <span class="acct">${esc(d.creditAccount)}</span>
            <span class="tag cr">CR</span>
            <span class="mono fw-700">${fmtMoney(d.amount, "", 2)}</span>
          </div>

          <div class="chat-panel">
            <div class="flex items-center gap-8 mb-12"><span style="color:var(--blue)">${icon("sparkles", { size: 15 })}</span><span class="text-sm fw-700">Ask the AI about this document</span></div>
            <div id="chat-messages">
              ${msgs.map(m => `
                <div class="chat-msg ${m.role}">
                  <div class="avatar">${m.role === "ai" ? icon("robot", { size: 13 }) : initials(DEMO.company.demoUser.name)}</div>
                  <div class="bubble">${esc(m.text)}</div>
                </div>
              `).join("")}
            </div>
            ${d.qa.filter(qa => !msgs.some(m => m.text === qa.q)).length ? `
            <div class="chat-suggest">
              ${d.qa.filter(qa => !msgs.some(m => m.text === qa.q)).map(qa => `<button onclick='captureAsk(${JSON.stringify(qa.q)})'>${esc(qa.q)}</button>`).join("")}
            </div>` : ""}
            <div class="chat-input-row">
              <input id="chat-input" type="text" placeholder="Type a question about this document…" onkeydown="if(event.key==='Enter'){captureAskFromInput();}" />
              <button onclick="captureAskFromInput()">${icon("send", { size: 15 })}</button>
            </div>
          </div>

          <div class="flex gap-10 mt-16">
            <button class="btn ghost" style="flex:1;" onclick="captureReset()">Discard</button>
            <button class="btn success" style="flex:2;" onclick="captureConfirmPost()">${icon("check", { size: 15 })} Confirm &amp; Post to Ledger</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function renderCaptureDone() {
  const d = AppState.capture.doc;
  return `
  <div class="card mb-16">
    <div class="empty-state" style="padding:46px 30px;">
      <div class="icon-wrap" style="background:#E6F7EF;color:#0F9D63;">${icon("checkDouble", { size: 26 })}</div>
      <h3>Posted to the general ledger</h3>
      <p>${esc(d.vendor)} — ${fmtMoney(d.amount)} booked to <b>${esc(d.debitAccount)}</b>. It now appears in Transactions and is queued for the next reconciliation run.</p>
      <div class="flex gap-10 mt-16">
        <button class="btn" onclick="openTab('transactions')">${icon("exchange", { size: 14 })} View in Transactions</button>
        <button class="btn primary" onclick="captureReset()">${icon("plus", { size: 14 })} Capture another document</button>
      </div>
    </div>
  </div>
  `;
}

/* ---------------------------------------------------------------------- */
/* Behaviour                                                              */
/* ---------------------------------------------------------------------- */

function captureSelectSample(id) {
  const doc = DEMO.captureSamples.find(d => d.id === id);
  AppState.capture = { step: "processing", doc, chat: [
    { role: "ai", text: `I've read “${doc.file}”. It looks like a ${doc.kind.toLowerCase()} from ${doc.vendor} for ${fmtMoney(doc.amount)}, dated ${fmtDate(doc.date)}. Ask me anything about it, or confirm the entry below.` },
  ] };
  rerenderActivePage();
  setTimeout(() => {
    if (AppState.capture.step === "processing") {
      AppState.capture.step = "review";
      rerenderActivePage();
    }
  }, 1400);
}

function captureAsk(question) {
  const d = AppState.capture.doc;
  const qa = d.qa.find(x => x.q === question);
  AppState.capture.chat.push({ role: "user", text: question });
  rerenderActivePage();
  setTimeout(() => {
    AppState.capture.chat.push({ role: "ai", text: qa ? qa.a : "I don't have more detail on that in this demo, but in the full product this would query the source document and linked records." });
    rerenderActivePage();
  }, 550);
}

function captureAskFromInput() {
  const input = document.getElementById("chat-input");
  if (!input || !input.value.trim()) return;
  const text = input.value.trim();
  input.value = "";
  const d = AppState.capture.doc;
  AppState.capture.chat.push({ role: "user", text });
  rerenderActivePage();
  setTimeout(() => {
    AppState.capture.chat.push({ role: "ai", text: `Based on ${d.file}, here's what I can tell you: this is a ${fmtMoney(d.amount)} ${d.kind.toLowerCase()} from ${d.vendor}. In the live product, I'd cross-reference the source PDF and your transaction history to answer that precisely.` });
    rerenderActivePage();
  }, 650);
}

function captureDocToTransaction(d) {
  return {
    id: "tx-" + d.id + "-" + Math.random().toString(36).slice(2, 7),
    date: d.date,
    description: `${d.vendor} — ${d.kind}`,
    account: d.debitAccount.split(" · ")[1] || d.debitAccount,
    bank: d.creditAccount.includes("·") ? d.creditAccount.split("·")[1].split("—")[0].trim() : "Emirates NBD",
    debit: d.category === "RENTAL_INCOME" ? 0 : d.amount,
    credit: d.category === "RENTAL_INCOME" ? d.amount : 0,
    status: "Pending",
    aiTagged: true,
    aiConfidence: d.confidence,
  };
}

function captureConfirmPost() {
  const d = AppState.capture.doc;
  AppState.bookedCaptures.push(d);
  AppState.pendingCaptures = AppState.pendingCaptures.filter(p => p.id !== d.id);
  AppState.transactions.unshift(captureDocToTransaction(d));
  AppState.capture.step = "done";
  rerenderActivePage();
  showToast(`Posted ${fmtMoney(d.amount)} to ${d.debitAccount}`);
}

function captureReset() {
  AppState.capture = { step: "select", doc: null, chat: [], autoRun: null };
  rerenderActivePage();
}

/* Jump straight into the review screen for an already-flagged pending
   document — skips the "processing" spinner since the AI already read it
   during the bulk run. */
function captureReviewDoc(id) {
  const doc = DEMO.captureSamples.find(d => d.id === id) || AppState.pendingCaptures.find(d => d.id === id);
  if (!doc) return;
  AppState.capture = { step: "review", doc, autoRun: null, chat: [
    { role: "ai", text: `This one needed a second look — confidence came in at ${doc.confidence}%. Here's what I found in “${doc.file}”. Confirm the entry below, or ask me anything about it.` },
  ] };
  openTab("capture");
  rerenderActivePage();
}

/* ---------------------------------------------------------------------- */
/* Bulk "Auto-process all with AI" — the automation showcase             */
/* ---------------------------------------------------------------------- */
const CAPTURE_AUTO_THRESHOLD = 95;

function captureAutoProcessAll() {
  const queue = DEMO.captureSamples.filter(d => !AppState.bookedCaptures.some(b => b.id === d.id));
  if (!queue.length) { showToast("Nothing left in the queue — it's all been processed."); return; }

  AppState.capture = {
    step: "select", doc: null, chat: [],
    autoRun: { queue, index: 0, done: false, log: [], stats: { posted: 0, flagged: 0 }, startedAt: Date.now(), elapsedMs: 0 },
  };
  rerenderActivePage();
  captureAutoStep();
}

function captureAutoStep() {
  const ar = AppState.capture.autoRun;
  if (!ar) return; // user navigated away / reset mid-run

  if (ar.index >= ar.queue.length) {
    ar.done = true;
    ar.elapsedMs = Date.now() - ar.startedAt;
    rerenderActivePage();
    showToast(`AI processed ${ar.queue.length} documents — ${ar.stats.posted} auto-posted, ${ar.stats.flagged} flagged for review`);
    return;
  }

  const doc = ar.queue[ar.index];
  ar.log.push({ status: "busy", doc, text: `Reading ${doc.file}…` });
  rerenderActivePage();

  setTimeout(() => {
    ar.log.pop();
    if (doc.confidence >= CAPTURE_AUTO_THRESHOLD) {
      AppState.bookedCaptures.push(doc);
      AppState.pendingCaptures = AppState.pendingCaptures.filter(p => p.id !== doc.id);
      AppState.transactions.unshift(captureDocToTransaction(doc));
      ar.stats.posted++;
      ar.log.push({ status: "ok", doc, text: `categorized ${doc.category.replace(/_/g, " ").toLowerCase()} and auto-posted to ${doc.debitAccount}` });
    } else {
      if (!AppState.pendingCaptures.some(p => p.id === doc.id)) AppState.pendingCaptures.push(doc);
      ar.stats.flagged++;
      ar.log.push({ status: "flag", doc, text: `confidence below ${CAPTURE_AUTO_THRESHOLD}% — flagged for your review` });
    }
    ar.index++;
    rerenderActivePage();
    setTimeout(captureAutoStep, 420);
  }, 520);
}

function captureExitAutoRun() {
  AppState.capture = { step: "select", doc: null, chat: [], autoRun: null };
  rerenderActivePage();
}

function captureReviewFirstFlagged() {
  const ar = AppState.capture.autoRun;
  const firstFlagged = ar ? ar.log.find(l => l.status === "flag") : null;
  if (firstFlagged) captureReviewDoc(firstFlagged.doc.id);
  else captureExitAutoRun();
}
