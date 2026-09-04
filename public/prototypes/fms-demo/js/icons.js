/* ============================================================================
   Minimal hand-rolled icon set (feather-style outline icons, 24x24 viewbox).
   Usage: icon('home', {size:18, cls:'ic'})
   ============================================================================ */

const ICONS = {
  home: "M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  bank: "M3 21h18M4 21V10M20 21V10M2 10l10-6 10 6M6 10v11M10 10v11M14 10v11M18 10v11",
  exchange: "M4 7h13l-3-3M20 17H7l3 3",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  chartLine: "M3 17l5-6 4 3 8-9M3 21h18",
  wallet: "M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM16 12h3",
  coins: "M8 8a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM16 6a5 5 0 1 1-4.9 6M16 6a5 5 0 0 1 0 10",
  bolt: "M13 2 4 14h6l-1 8 9-12h-6z",
  upload: "M12 16V4M7 9l5-5 5 5M4 20h16",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
  sms: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z",
  link: "M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8",
  cheque: "M2 6h20v12H2zM2 10h20M6 15h4",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  clipboard: "M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1zM6 6h12v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z",
  building: "M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17M15 21h5v-9l-5-4M8 7h1M8 11h1M8 15h1",
  chevronRight: "m9 6 6 6-6 6",
  chevronDown: "m6 9 6 6 6-6",
  chevronLeft: "m15 6-6 6 6 6",
  checkDouble: "M2 12l5 5L18 6M8 15l2 2L20 6",
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l18 18",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  filter: "M4 4h16l-6 8v6l-4 2v-8z",
  mic: "M12 1a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM5 10v1a7 7 0 0 0 14 0v-1M12 18v4M8 22h8",
  send: "m22 2-11 11M22 2 15 22l-4-9-9-4z",
  calendar: "M8 2v4M16 2v4M3 10h18M4 4h16a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z",
  shield: "M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z",
  sparkles: "m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  mail: "M4 4h16v16H4zM22 6l-10 7L2 6",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  eyeOff: "M3 3l18 18M10.6 10.6a3 3 0 0 0 4.24 4.24M9.9 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a13.2 13.2 0 0 1-3.2 4M6.6 6.6C4 8.3 2 12 2 12s3.5 7 10 7c1.3 0 2.5-.24 3.6-.66",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9zM13.7 21a2 2 0 0 1-3.4 0",
  alertTriangle: "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  download: "M12 3v12M7 10l5 5 5-5M4 21h16",
  refresh: "M21 12a9 9 0 1 1-2.6-6.4M21 4v6h-6",
  robot: "M9 2h6v3H9zM4 9h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM9 15h.01M15 15h.01",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  trash: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z",
  maximize: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M16 21h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3",
  layers: "m12 2 9 5-9 5-9-5zM3 12l9 5 9-5M3 17l9 5 9-5",
  pieChart: "M21.2 15a9 9 0 1 1-9.2-13v9.2z",
  briefcase: "M20 7h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM8 7V4h8v3",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01",
  message: "M21 11.5a8.4 8.4 0 0 1-3.8 7 8.5 8.5 0 0 1-9-.5L3 20l1.3-3.9a8.4 8.4 0 0 1-1.2-4.4 8.5 8.5 0 0 1 8.5-8.5h.3a8.5 8.5 0 0 1 8.1 8.3z",
};

function icon(name, opts = {}) {
  const { size = 18, cls = "", strokeWidth = 2 } = opts;
  const d = ICONS[name] || ICONS.info;
  return `<svg class="icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
}
