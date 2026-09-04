/* ============================================================================
   COMMAND PALETTE — Ctrl/Cmd+K quick navigation + actions
   ============================================================================ */

function commandPaletteItems() {
  const navItems = [];
  NAV.forEach(item => {
    if (item.dropdown) {
      item.items.forEach(sub => navItems.push({ id: sub.id, label: sub.label, icon: sub.icon, group: "Go to page", action: () => openTab(sub.id) }));
    } else {
      navItems.push({ id: item.id, label: PAGES[item.id] ? PAGES[item.id].title : item.label, icon: item.icon, group: "Go to page", action: () => openTab(item.id) });
    }
  });

  const actions = [
    { id: "act-copilot", label: "Ask the AI Copilot", icon: "sparkles", group: "Actions", action: () => { AppState.copilot.open = true; renderCopilotUI(); } },
    { id: "act-auto-capture", label: "Auto-process all captures with AI", icon: "bolt", group: "Actions", action: () => { openTab("capture"); setTimeout(() => captureAutoProcessAll(), 200); } },
    { id: "act-auto-match", label: "Auto-match all reconciliations with AI", icon: "checkDouble", group: "Actions", action: () => { openTab("reconciliation"); setTimeout(() => reconAutoMatch(), 200); } },
    { id: "act-presenter", label: "Start guided tour", icon: "sparkles", group: "Actions", action: () => startPresenter() },
  ];

  return [...actions, ...navItems];
}

function openCommandPalette() {
  AppState.commandPalette = { open: true, query: "", activeIndex: 0 };
  renderCommandPalette();
  setTimeout(() => { const el = document.getElementById("cmdk-input"); if (el) el.focus(); }, 30);
}

function closeCommandPalette() {
  AppState.commandPalette.open = false;
  renderCommandPalette();
}

function commandPaletteFiltered() {
  const q = AppState.commandPalette.query.trim().toLowerCase();
  const items = commandPaletteItems();
  if (!q) return items;
  return items.filter(i => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q));
}

function commandPaletteInput(value) {
  AppState.commandPalette.query = value;
  AppState.commandPalette.activeIndex = 0;
  renderCommandPalette();
  // Re-rendering swaps in a fresh <input>, which drops DOM focus — restore
  // it (and the caret position) so typing and Enter/arrow keys keep working.
  refocusCmdkInput();
}

function commandPaletteRun(index) {
  const items = commandPaletteFiltered();
  const item = items[index];
  if (!item) return;
  closeCommandPalette();
  item.action();
}

function commandPaletteKeydown(e) {
  const items = commandPaletteFiltered();
  if (e.key === "ArrowDown") {
    e.preventDefault();
    AppState.commandPalette.activeIndex = Math.min(items.length - 1, AppState.commandPalette.activeIndex + 1);
    renderCommandPalette();
    refocusCmdkInput();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    AppState.commandPalette.activeIndex = Math.max(0, AppState.commandPalette.activeIndex - 1);
    renderCommandPalette();
    refocusCmdkInput();
  } else if (e.key === "Enter") {
    e.preventDefault();
    commandPaletteRun(AppState.commandPalette.activeIndex);
  } else if (e.key === "Escape") {
    closeCommandPalette();
  }
}

function refocusCmdkInput() {
  const el = document.getElementById("cmdk-input");
  if (el) { el.focus(); el.selectionStart = el.selectionEnd = el.value.length; }
}

function renderCommandPalette() {
  const root = document.getElementById("command-palette-root");
  if (!root) return;
  const cp = AppState.commandPalette;
  if (!cp || !cp.open) { root.innerHTML = ""; return; }

  const items = commandPaletteFiltered();
  const groups = {};
  items.forEach((it, idx) => { (groups[it.group] = groups[it.group] || []).push({ ...it, idx }); });

  root.innerHTML = `
    <div class="cmdk-backdrop" onclick="if(event.target===this) closeCommandPalette()">
      <div class="cmdk-box">
        <div class="cmdk-input-row">
          ${icon("search", { size: 16 })}
          <input id="cmdk-input" type="text" placeholder="Search pages, ask the AI, or run an action…" value="${esc(cp.query)}"
            oninput="commandPaletteInput(this.value)" onkeydown="commandPaletteKeydown(event)" />
          <kbd>ESC</kbd>
        </div>
        <div class="cmdk-list">
          ${items.length === 0 ? `<div class="empty-state" style="padding:34px 20px;"><p>No matches for "${esc(cp.query)}"</p></div>` : Object.entries(groups).map(([group, list]) => `
            <div class="cmdk-group-label">${esc(group)}</div>
            ${list.map(it => `
              <button class="cmdk-item ${it.idx === cp.activeIndex ? "active" : ""}" onmouseenter="AppState.commandPalette.activeIndex=${it.idx};renderCommandPalette();" onclick="commandPaletteRun(${it.idx})">
                <span class="ic">${icon(it.icon, { size: 15 })}</span>
                <span>${esc(it.label)}</span>
                ${it.group === "Go to page" ? `<span class="sub">Open</span>` : `<span class="sub">${icon("sparkles",{size:11})}</span>`}
              </button>
            `).join("")}
          `).join("")}
        </div>
      </div>
    </div>
  `;
}
