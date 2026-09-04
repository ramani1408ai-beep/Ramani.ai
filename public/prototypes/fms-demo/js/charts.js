/* ============================================================================
   Tiny dependency-free SVG chart helpers. Everything returns an HTML string.
   ============================================================================ */

const Charts = (() => {

  function scale(values, size, pad = 0) {
    const min = Math.min(...values), max = Math.max(...values);
    const range = (max - min) || 1;
    return (v) => pad + (1 - (v - min) / range) * (size - pad * 2);
  }

  /* Line / area chart with optional gradient fill --------------------------*/
  function lineChart({ values, labels, width = 560, height = 200, color = "#378ADD", fill = true, formatY }) {
    const padL = 8, padR = 8, padT = 16, padB = 24;
    const y = scale(values, height - padT - padB);
    const stepX = (width - padL - padR) / (values.length - 1);
    const pts = values.map((v, i) => [padL + i * stepX, padT + y(v)]);
    const line = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${height - padB} L${pts[0][0].toFixed(1)} ${height - padB} Z`;
    const gid = "grad" + Math.random().toString(36).slice(2, 8);
    const last = values[values.length - 1];
    return `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="none" class="chart-svg">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.30"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${fill ? `<path d="${area}" fill="url(#${gid})" stroke="none"/>` : ""}
      <path d="${line}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${pts[pts.length - 1][0].toFixed(1)}" cy="${pts[pts.length - 1][1].toFixed(1)}" r="4" fill="${color}" stroke="#fff" stroke-width="2"/>
      ${labels ? labels.map((l, i) => i % Math.ceil(labels.length / 6) === 0 ? `<text x="${(padL + i * stepX).toFixed(1)}" y="${height - 6}" font-size="10" fill="var(--text-muted)" text-anchor="middle">${l}</text>` : "").join("") : ""}
    </svg>`;
  }

  /* Grouped bar chart (income vs expense style) -----------------------------*/
  function barChart({ series1, series2, labels, width = 560, height = 220, color1 = "#1AB573", color2 = "#EF4444", label1 = "", label2 = "" }) {
    const padL = 8, padR = 8, padT = 12, padB = 24;
    const all = [...series1, ...series2];
    const max = Math.max(...all) * 1.1;
    const innerH = height - padT - padB;
    const groupW = (width - padL - padR) / labels.length;
    const barW = groupW * 0.30;
    let bars = "";
    labels.forEach((l, i) => {
      const gx = padL + i * groupW + groupW * 0.15;
      const h1 = (series1[i] / max) * innerH;
      const h2 = (series2[i] / max) * innerH;
      bars += `<rect x="${gx.toFixed(1)}" y="${(padT + innerH - h1).toFixed(1)}" width="${barW.toFixed(1)}" height="${h1.toFixed(1)}" rx="3" fill="${color1}"/>`;
      bars += `<rect x="${(gx + barW + 4).toFixed(1)}" y="${(padT + innerH - h2).toFixed(1)}" width="${barW.toFixed(1)}" height="${h2.toFixed(1)}" rx="3" fill="${color2}"/>`;
      bars += `<text x="${(gx + barW).toFixed(1)}" y="${height - 6}" font-size="10" fill="var(--text-muted)" text-anchor="middle">${l}</text>`;
    });
    return `<svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="none" class="chart-svg">${bars}</svg>`;
  }

  /* Donut chart --------------------------------------------------------------*/
  function donutChart({ segments, width = 200, height = 200, thickness = 26 }) {
    const cx = width / 2, cy = height / 2, r = Math.min(width, height) / 2 - thickness / 2 - 4;
    const total = segments.reduce((s, x) => s + x.value, 0) || 1;
    let angle = -90;
    const arcs = segments.map(seg => {
      const frac = seg.value / total;
      const start = angle;
      const end = angle + frac * 360;
      angle = end;
      const large = (end - start) > 180 ? 1 : 0;
      const toXY = (a) => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
      const [x1, y1] = toXY(start), [x2, y2] = toXY(end);
      return `<path d="M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}"
                fill="none" stroke="${seg.color}" stroke-width="${thickness}" />`;
    }).join("");
    return `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${arcs}</svg>`;
  }

  /* Sparkline ------------------------------------------------------------- */
  function sparkline({ values, width = 100, height = 32, color = "#1AB573" }) {
    const y = scale(values, height, 2);
    const stepX = width / (values.length - 1);
    const line = values.map((v, i) => (i === 0 ? "M" : "L") + (i * stepX).toFixed(1) + " " + y(v).toFixed(1)).join(" ");
    return `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><path d="${line}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  return { lineChart, barChart, donutChart, sparkline };
})();
