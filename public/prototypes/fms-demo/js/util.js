/* ============================================================================
   Shared formatting helpers
   ============================================================================ */

function fmtMoney(v, ccy = "AED", decimals = 2) {
  const n = Number(v || 0);
  const sign = n < 0 ? "-" : "";
  return `${sign}${ccy} ${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

function fmtShort(v) {
  const n = Number(v || 0);
  const sign = n < 0 ? "-" : "";
  const a = Math.abs(n);
  if (a >= 1_000_000) return sign + (a / 1_000_000).toFixed(2) + "M";
  if (a >= 1_000) return sign + (a / 1_000).toFixed(1) + "K";
  return sign + a.toFixed(0);
}

function fmtDate(d) {
  const dt = new Date(d + "T00:00:00");
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtDateShort(d) {
  const dt = new Date(d + "T00:00:00");
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function initials(name) {
  return String(name || "").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function daysUntil(dateStr) {
  const today = new Date("2026-09-02T00:00:00");
  const d = new Date(dateStr + "T00:00:00");
  return Math.round((d - today) / 86400000);
}
