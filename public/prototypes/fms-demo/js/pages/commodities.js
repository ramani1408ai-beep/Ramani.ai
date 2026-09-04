/* ============================================================================
   COMMODITIES
   ============================================================================ */

function renderCommodities() {
  const totalValue = DEMO.commodities.reduce((s, c) => s + c.qty * c.price, 0);
  const totalCost = DEMO.commodities.reduce((s, c) => s + c.qty * c.avgCost, 0);
  const gain = totalValue - totalCost;

  return `
  <div class="page-header">
    <div><h1>Commodities</h1><p>Physical & paper holdings, marked to live-ish prices</p></div>
    <div class="page-actions"><button class="btn primary" onclick="showToast('Trade ticket — demo only')">${icon("plus",{size:14})} New position</button></div>
  </div>

  <div class="grid grid-3 mb-16">
    <div class="card kpi-card"><span class="kpi-label">Market Value</span><div class="kpi-value">${fmtMoney(totalValue,"",0)}</div></div>
    <div class="card kpi-card"><span class="kpi-label">Cost Basis</span><div class="kpi-value">${fmtMoney(totalCost,"",0)}</div></div>
    <div class="card kpi-card"><span class="kpi-label">Unrealized P&amp;L</span><div class="kpi-value ${gain>=0?'text-green':'text-red'}">${gain>=0?'+':''}${fmtMoney(gain,"",0)}</div></div>
  </div>

  <div class="grid grid-2">
    ${DEMO.commodities.map(c => {
      const value = c.qty * c.price;
      const cost = c.qty * c.avgCost;
      const pl = value - cost;
      const plPct = (pl / cost) * 100;
      return `
      <div class="card mb-16">
        <div class="card-head">
          <div class="flex items-center gap-10">
            <div style="width:34px;height:34px;border-radius:9px;background:${c.color}22;color:${c.color};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;">${c.symbol}</div>
            <div><h3>${esc(c.name)}</h3><div class="sub">${c.qty} ${c.unit} · avg cost ${fmtMoney(c.avgCost,"",2)}</div></div>
          </div>
          <span class="pill ${pl>=0?'green':'red'}">${pl>=0?'+':''}${plPct.toFixed(1)}%</span>
        </div>
        <div class="card-pad" style="padding-top:8px;">
          ${Charts.lineChart({ values: c.history, width: 480, height: 110, color: c.color, fill: true })}
          <div class="flex justify-between mt-12">
            <div><div class="text-xs muted">Price</div><div class="text-sm fw-700">${fmtMoney(c.price,"",2)}</div></div>
            <div><div class="text-xs muted">Market Value</div><div class="text-sm fw-700">${fmtMoney(value,"",0)}</div></div>
            <div><div class="text-xs muted">P&amp;L</div><div class="text-sm fw-700 ${pl>=0?'text-green':'text-red'}">${pl>=0?'+':''}${fmtMoney(pl,"",0)}</div></div>
          </div>
        </div>
      </div>
      `;
    }).join("")}
  </div>

  <div class="card">
    <div class="card-head"><h3>Holdings summary</h3></div>
    <div class="table-wrap card-pad" style="padding-top:8px;">
      <table class="tbl">
        <thead><tr><th>Commodity</th><th class="num">Qty</th><th class="num">Avg Cost</th><th class="num">Price</th><th class="num">Value</th><th class="num">P&amp;L</th></tr></thead>
        <tbody>
          ${DEMO.commodities.map(c => {
            const value = c.qty * c.price, cost = c.qty * c.avgCost, pl = value - cost;
            return `<tr>
              <td class="fw-600">${esc(c.name)} <span class="muted">(${c.symbol})</span></td>
              <td class="num mono">${c.qty} ${c.unit}</td>
              <td class="num mono">${fmtMoney(c.avgCost,"",2)}</td>
              <td class="num mono">${fmtMoney(c.price,"",2)}</td>
              <td class="num mono fw-700">${fmtMoney(value,"",0)}</td>
              <td class="num mono ${pl>=0?'text-green':'text-red'}">${pl>=0?'+':''}${fmtMoney(pl,"",0)}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  </div>
  `;
}
