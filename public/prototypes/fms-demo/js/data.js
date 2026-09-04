/* ============================================================================
   FMS PROTOTYPE — MOCK DATA
   Every number on this screen is fictional demo data generated for the
   purpose of walking stakeholders through the product workflow. Nothing
   here is wired to a real bank, document, or backend.
   ============================================================================ */

const DEMO = (() => {

  const AED = (n) => Number(n || 0);

  /* ---------------------------------------------------------------------- */
  /* Bank accounts                                                          */
  /* ---------------------------------------------------------------------- */
  const banks = [
    { id: "acc-1", bank: "Emirates NBD", label: "Business Current", number: "•• 4471", currency: "AED", type: "Current",  balance: 6842310.55, color: "#378ADD" },
    { id: "acc-2", bank: "ADCB",         label: "Operating Account", number: "•• 8820", currency: "AED", type: "Current",  balance: 3120044.10, color: "#1AB573" },
    { id: "acc-3", bank: "Mashreq",      label: "Reserve Savings",  number: "•• 1129", currency: "AED", type: "Savings",  balance: 5410500.00, color: "#F59E0B" },
    { id: "acc-4", bank: "HSBC",         label: "USD Trade Account", number: "•• 7743", currency: "USD", type: "Current",  balance: 812430.75,  color: "#8B5CF6" },
    { id: "acc-5", bank: "FAB",          label: "Corporate Credit Card", number: "•• 2290", currency: "AED", type: "Credit Card", balance: -184220.40, color: "#EF4444" },
  ];

  /* ---------------------------------------------------------------------- */
  /* Properties                                                             */
  /* ---------------------------------------------------------------------- */
  const properties = [
    { id: "p-1", name: "Marina Heights — Unit 2104", location: "Dubai Marina", value: 3450000, status: "Leased",   yield: 6.2 },
    { id: "p-2", name: "Emaar Beachfront Villa 12",  location: "Dubai Harbour", value: 8900000, status: "Owner-occupied", yield: 0 },
    { id: "p-3", name: "Business Bay Tower — 1502",  location: "Business Bay", value: 2100000, status: "Leased",   yield: 7.1 },
    { id: "p-4", name: "JVC Cluster F — Office 6",   location: "Jumeirah Village Circle", value: 1250000, status: "Vacant", yield: 0 },
  ];

  /* ---------------------------------------------------------------------- */
  /* Commodities                                                            */
  /* ---------------------------------------------------------------------- */
  function series(base, points, vol) {
    let v = base, out = [];
    for (let i = 0; i < points; i++) {
      v = v + (Math.sin(i / 2.3) * vol) + (((i * 37) % 7) - 3) * (vol * 0.18);
      out.push(Math.max(0, +v.toFixed(2)));
    }
    return out;
  }
  const commodities = [
    { id: "c-1", symbol: "XAU", name: "Gold",        unit: "oz",  qty: 42.5,  avgCost: 2185.30, price: 2412.60, color: "#D4AF37", history: series(2200, 24, 26) },
    { id: "c-2", symbol: "XAG", name: "Silver",       unit: "oz",  qty: 310,   avgCost: 27.10,   price: 29.85,   color: "#B9C1CC", history: series(27, 24, 1.1) },
    { id: "c-3", symbol: "WTI", name: "Crude Oil",    unit: "bbl", qty: 180,   avgCost: 74.20,   price: 79.65,   color: "#3B4252", history: series(75, 24, 2.4) },
    { id: "c-4", symbol: "XPT", name: "Platinum",     unit: "oz",  qty: 65,    avgCost: 945.00,  price: 1012.40, color: "#8FA1B3", history: series(950, 24, 14) },
  ];

  /* ---------------------------------------------------------------------- */
  /* Chart of Accounts                                                      */
  /* ---------------------------------------------------------------------- */
  const coa = [
    { code: "1000", name: "Cash & Bank Accounts",        type: "Asset",     balance: 15990865.00 },
    { code: "1100", name: "Accounts Receivable",         type: "Asset",     balance: 428900.00 },
    { code: "1200", name: "Investment — Commodities",    type: "Asset",     balance: 292180.00 },
    { code: "1300", name: "Investment Properties",       type: "Asset",     balance: 15700000.00 },
    { code: "2000", name: "Accounts Payable",            type: "Liability", balance: 214300.00 },
    { code: "2100", name: "Credit Card Payable",         type: "Liability", balance: 184220.40 },
    { code: "2200", name: "Mortgage Payable",             type: "Liability", balance: 6120000.00 },
    { code: "3000", name: "Owner's Equity",               type: "Equity",    balance: 24500000.00 },
    { code: "4000", name: "Rental Income",                type: "Income",    balance: 892400.00 },
    { code: "4100", name: "Commodity Gains",              type: "Income",    balance: 118650.00 },
    { code: "5000", name: "Service Charges",              type: "Expense",   balance: 186420.00 },
    { code: "5100", name: "School Fees",                  type: "Expense",   balance: 94800.00 },
    { code: "5200", name: "Insurance Premiums",           type: "Expense",   balance: 61200.00 },
    { code: "5300", name: "Mortgage Interest",            type: "Expense",   balance: 210400.00 },
    { code: "5400", name: "Credit Card Charges",          type: "Expense",   balance: 38900.00 },
  ];

  /* ---------------------------------------------------------------------- */
  /* Transactions (mutable — Capture demo appends to this array)           */
  /* ---------------------------------------------------------------------- */
  const transactions = [
    { id: "tx-1001", date: "2026-08-29", description: "DEWA — Marina Heights 2104", account: "Service Charges", bank: "Emirates NBD", debit: 1240.00, credit: 0, status: "Reconciled", aiTagged: true, aiConfidence: 97 },
    { id: "tx-1002", date: "2026-08-28", description: "Rent received — Business Bay 1502", account: "Rental Income", bank: "ADCB", debit: 0, credit: 18500.00, status: "Reconciled", aiTagged: true, aiConfidence: 91 },
    { id: "tx-1003", date: "2026-08-27", description: "GEMS School — Term 1 fees", account: "School Fees", bank: "Mashreq", debit: 24800.00, credit: 0, status: "Pending", aiTagged: true, aiConfidence: 99 },
    { id: "tx-1004", date: "2026-08-26", description: "FAB Credit Card settlement", account: "Credit Card Charges", bank: "FAB", debit: 18420.40, credit: 0, status: "Reconciled", aiTagged: true, aiConfidence: 93 },
    { id: "tx-1005", date: "2026-08-25", description: "Mollak — Marina Heights Q3", account: "Service Charges", bank: "Emirates NBD", debit: 6180.00, credit: 0, status: "Pending", aiTagged: true, aiConfidence: 94 },
    { id: "tx-1006", date: "2026-08-24", description: "AXA Gulf — Property Insurance", account: "Insurance Premiums", bank: "ADCB", debit: 15300.00, credit: 0, status: "Reconciled", aiTagged: true, aiConfidence: 96 },
    { id: "tx-1007", date: "2026-08-22", description: "Gold purchase — 5oz", account: "Investment — Commodities", bank: "Mashreq", debit: 12063.00, credit: 0, status: "Reconciled", aiTagged: false },
    { id: "tx-1008", date: "2026-08-20", description: "Mortgage installment — Aug", account: "Mortgage Payable", bank: "HSBC", debit: 42100.00, credit: 0, status: "Reconciled", aiTagged: false },
    { id: "tx-1009", date: "2026-08-18", description: "Rent received — Marina Heights 2104", account: "Rental Income", bank: "Emirates NBD", debit: 0, credit: 21200.00, status: "Reconciled", aiTagged: true, aiConfidence: 90 },
    { id: "tx-1010", date: "2026-08-15", description: "Emaar — Villa maintenance plan", account: "Service Charges", bank: "ADCB", debit: 4400.00, credit: 0, status: "Pending", aiTagged: false },
    { id: "tx-1011", date: "2026-08-12", description: "Silver purchase — 30oz", account: "Investment — Commodities", bank: "Mashreq", debit: 813.00, credit: 0, status: "Reconciled", aiTagged: false },
    { id: "tx-1012", date: "2026-08-10", description: "Cheque #445210 cleared — RTA", account: "Service Charges", bank: "ADCB", debit: 3200.00, credit: 0, status: "Reconciled", aiTagged: true, aiConfidence: 92 },
  ];

  /* ---------------------------------------------------------------------- */
  /* Reconciliation                                                         */
  /* ---------------------------------------------------------------------- */
  const bankLines = [
    { id: "b-1", date: "2026-08-29", desc: "DEWA POS DXB",              amount: -1240.00, matched: true },
    { id: "b-2", date: "2026-08-28", desc: "INWARD TRF - BBAY TENANT",  amount: 18500.00, matched: true },
    { id: "b-3", date: "2026-08-27", desc: "GEMS EDU SVC LLC",           amount: -24800.00, matched: false },
    { id: "b-4", date: "2026-08-25", desc: "MOLLAK PAYMENT GATEWAY",     amount: -6180.00, matched: false },
    { id: "b-5", date: "2026-08-23", desc: "POS PURCHASE — CARREFOUR",   amount: -512.30, matched: false },
    { id: "b-6", date: "2026-08-15", desc: "EMAAR COMMUNITY MGMT",       amount: -4400.00, matched: false },
  ];
  const bookLines = [
    { id: "k-1", date: "2026-08-29", desc: "DEWA — Marina Heights 2104", amount: -1240.00, matched: true },
    { id: "k-2", date: "2026-08-28", desc: "Rent received — Business Bay 1502", amount: 18500.00, matched: true },
    { id: "k-3", date: "2026-08-27", desc: "GEMS School — Term 1 fees", amount: -24800.00, matched: false },
    { id: "k-4", date: "2026-08-25", desc: "Mollak — Marina Heights Q3", amount: -6180.00, matched: false },
    { id: "k-5", date: "2026-08-15", desc: "Emaar — Villa maintenance plan", amount: -4400.00, matched: false },
  ];

  /* ---------------------------------------------------------------------- */
  /* Cheques                                                                */
  /* ---------------------------------------------------------------------- */
  const cheques = [
    { id: "ch-1", number: "445210", type: "Issued",   payee: "RTA — Parking Renewal", amount: 3200.00,  due: "2026-08-10", status: "Cleared" },
    { id: "ch-2", number: "445211", type: "Issued",   payee: "Al Futtaim Insurance",  amount: 15300.00, due: "2026-09-05", status: "Pending" },
    { id: "ch-3", number: "PDC-118", type: "Received", payee: "Tenant — Marina 2104", amount: 21200.00, due: "2026-09-01", status: "Pending" },
    { id: "ch-4", number: "445212", type: "Issued",   payee: "GEMS Education",        amount: 24800.00, due: "2026-09-12", status: "Pending" },
    { id: "ch-5", number: "PDC-119", type: "Received", payee: "Tenant — Business Bay", amount: 18500.00, due: "2026-08-01", status: "Bounced" },
  ];

  /* ---------------------------------------------------------------------- */
  /* Cashflow forecast — scheduled events                                  */
  /* ---------------------------------------------------------------------- */
  const scheduledEvents = [
    { id: "e-1", date: "2026-09-01", desc: "Rent — Marina Heights 2104",  type: "Income",  amount: 21200.00, confidence: 96 },
    { id: "e-2", date: "2026-09-01", desc: "Rent — Business Bay 1502",    type: "Income",  amount: 18500.00, confidence: 94 },
    { id: "e-3", date: "2026-09-05", desc: "AXA Insurance premium",       type: "Expense", amount: 15300.00, confidence: 99 },
    { id: "e-4", date: "2026-09-12", desc: "GEMS School — Term 2 fees",   type: "Expense", amount: 24800.00, confidence: 90 },
    { id: "e-5", date: "2026-09-20", desc: "Mortgage installment",        type: "Expense", amount: 42100.00, confidence: 99 },
    { id: "e-6", date: "2026-09-25", desc: "Mollak service charge Q4",    type: "Expense", amount: 6180.00,  confidence: 85 },
    { id: "e-7", date: "2026-10-01", desc: "Rent — Marina Heights 2104",  type: "Income",  amount: 21200.00, confidence: 92 },
    { id: "e-8", date: "2026-10-01", desc: "Rent — Business Bay 1502",    type: "Income",  amount: 18500.00, confidence: 92 },
  ];

  const forecastBalance = series(15100000, 8, 900000).map((v, i) => 15100000 + i * 380000 + (i % 2 === 0 ? 60000 : -40000));

  /* ---------------------------------------------------------------------- */
  /* Live transactions / SMS tracker                                       */
  /* ---------------------------------------------------------------------- */
  const smsFeed = [
    { id: "s-1", time: "09:41", bank: "Emirates NBD", text: "AED 1,240.00 debited at DEWA DXB. Avl Bal AED 6,842,310.55", parsed: { merchant: "DEWA", amount: -1240 } },
    { id: "s-2", time: "08:55", bank: "ADCB",          text: "AED 18,500.00 credited - INWARD TRANSFER. Avl Bal AED 3,120,044.10", parsed: { merchant: "Inward Transfer", amount: 18500 } },
    { id: "s-3", time: "Yesterday", bank: "FAB",       text: "AED 512.30 spent at CARREFOUR MARINA using card ••2290", parsed: { merchant: "Carrefour", amount: -512.30 } },
    { id: "s-4", time: "Yesterday", bank: "Mashreq",   text: "AED 12,063.00 debited - GOLD PURCHASE ORDER #GX4471", parsed: { merchant: "Gold Purchase", amount: -12063 } },
    { id: "s-5", time: "2 days ago", bank: "HSBC",     text: "USD 8,420.00 debited - MORTGAGE INSTALLMENT AUG", parsed: { merchant: "Mortgage", amount: -8420 } },
  ];

  /* ---------------------------------------------------------------------- */
  /* Audit log                                                              */
  /* ---------------------------------------------------------------------- */
  const auditLogs = [
    { id: "a-1", time: "2026-09-02 09:12", user: "A. Rahman", action: "Posted capture", detail: "DEWA bill → Service Charges (AED 1,240.00)" },
    { id: "a-2", time: "2026-09-01 18:04", user: "S. Khan",   action: "Matched reconciliation", detail: "2 bank lines matched to book entries" },
    { id: "a-3", time: "2026-09-01 14:37", user: "A. Rahman", action: "Updated Chart of Accounts", detail: "Renamed 5400 → Credit Card Charges" },
    { id: "a-4", time: "2026-08-31 11:02", user: "System",    action: "Cheque status changed", detail: "PDC-119 → Bounced" },
    { id: "a-5", time: "2026-08-30 16:45", user: "S. Khan",   action: "Logged in", detail: "Session started from 10.20.4.12" },
  ];

  /* ---------------------------------------------------------------------- */
  /* Trend series                                                           */
  /* ---------------------------------------------------------------------- */
  const months12 = ["Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"];
  const netWorthTrend = [20.1,20.4,20.3,20.9,21.2,21.0,21.6,21.9,22.0,22.3,22.5,22.62];

  const months6 = ["Mar","Apr","May","Jun","Jul","Aug"];
  const incomeExpenseTrend = [
    { month: "Mar", income: 152000, expense: 98000 },
    { month: "Apr", income: 168000, expense: 112000 },
    { month: "May", income: 149000, expense: 121000 },
    { month: "Jun", income: 181000, expense: 104000 },
    { month: "Jul", income: 176000, expense: 118000 },
    { month: "Aug", income: 192500, expense: 109500 },
  ];

  /* ---------------------------------------------------------------------- */
  /* Capture — sample documents for the AI capture workflow demo           */
  /* ---------------------------------------------------------------------- */
  const captureSamples = [
    {
      id: "doc-1",
      file: "DEWA_Utility_Bill_Aug2026.pdf",
      kind: "Utility Bill",
      category: "SERVICE_CHARGE",
      vendor: "Dubai Electricity & Water Authority",
      amount: 1240.00,
      date: "2026-08-29",
      property: "Marina Heights — Unit 2104",
      confidence: 97,
      debitAccount: "5000 · Service Charges",
      creditAccount: "1000 · Emirates NBD — Business Current",
      qa: [
        { q: "What period does this bill cover?", a: "This DEWA bill covers 27 Jul – 26 Aug 2026, billed to Marina Heights Unit 2104." },
        { q: "Is this consistent with prior months?", a: "Yes — average of the last 3 months is AED 1,180.00, so this AED 1,240.00 charge is within 5% of trend." },
      ],
    },
    {
      id: "doc-2",
      file: "Mollak_ServiceCharge_Q3.pdf",
      kind: "Service Charge Invoice",
      category: "SERVICE_CHARGE",
      vendor: "Mollak Payment Gateway",
      amount: 6180.00,
      date: "2026-08-25",
      property: "Marina Heights — Unit 2104",
      confidence: 94,
      debitAccount: "5000 · Service Charges",
      creditAccount: "1000 · Emirates NBD — Business Current",
      qa: [
        { q: "Which owners association issued this?", a: "Emaar Community Management, on behalf of the Marina Heights Owners Association." },
        { q: "Any late fee included?", a: "No late fee detected — payment is dated ahead of the 05 Sep due date." },
      ],
    },
    {
      id: "doc-3",
      file: "GEMS_SchoolFee_Term1.pdf",
      kind: "School Fee Receipt",
      category: "SCHOOL_FEE",
      vendor: "GEMS Education",
      amount: 24800.00,
      date: "2026-08-27",
      property: null,
      confidence: 99,
      debitAccount: "5100 · School Fees",
      creditAccount: "1000 · Mashreq — Reserve Savings",
      qa: [
        { q: "Which term is this for?", a: "Term 1, Academic Year 2026/2027." },
        { q: "Is a KHDA fee protection reference included?", a: "Yes — DFA reference KHDA-TF-88213 is printed on the receipt footer." },
      ],
    },
    {
      id: "doc-4",
      file: "Tenant_RentCheque_BusinessBay.jpg",
      kind: "Rent Cheque",
      category: "RENTAL_INCOME",
      vendor: "Tenant — Business Bay 1502",
      amount: 18500.00,
      date: "2026-08-28",
      property: "Business Bay Tower — 1502",
      confidence: 91,
      debitAccount: "1000 · ADCB — Operating Account",
      creditAccount: "4000 · Rental Income",
      qa: [
        { q: "Which lease does this cheque settle?", a: "Monthly rent for the lease running 01 Jan 2026 – 31 Dec 2026, cheque 3 of 12." },
        { q: "Is the tenant's cheque pre-dated correctly?", a: "Yes, dated 28 Aug 2026 and already cleared per the bank feed." },
      ],
    },
    {
      id: "doc-5",
      file: "AXA_Insurance_Premium.pdf",
      kind: "Insurance Invoice",
      category: "INSURANCE",
      vendor: "AXA Gulf",
      amount: 15300.00,
      date: "2026-08-24",
      property: "Portfolio-wide",
      confidence: 96,
      debitAccount: "5200 · Insurance Premiums",
      creditAccount: "1000 · ADCB — Operating Account",
      qa: [
        { q: "What does this policy cover?", a: "Building & contents cover across all 4 properties, annual policy renewed 24 Aug 2026." },
        { q: "When is the next renewal due?", a: "24 Aug 2027 — a reminder has been scheduled 30 days prior." },
      ],
    },
    {
      id: "doc-6",
      file: "FAB_CreditCard_Statement.pdf",
      kind: "Credit Card Statement",
      category: "CREDIT_CARD",
      vendor: "First Abu Dhabi Bank",
      amount: 18420.40,
      date: "2026-08-26",
      property: null,
      confidence: 93,
      debitAccount: "5400 · Credit Card Charges",
      creditAccount: "1000 · FAB — Corporate Credit Card",
      qa: [
        { q: "What's the largest single charge?", a: "AED 6,240.00 at Jumeirah Group Hotels on 14 Aug 2026." },
        { q: "Is this the full statement balance or minimum due?", a: "This posts the full statement balance of AED 18,420.40, not the minimum due." },
      ],
    },
  ];

  return {
    AED, banks, properties, commodities, coa, transactions, bankLines, bookLines,
    cheques, scheduledEvents, forecastBalance, smsFeed, auditLogs,
    months12, netWorthTrend, months6, incomeExpenseTrend, captureSamples,
    company: { name: "Alazzam Family Office", demoUser: { name: "Ahmed Al Rahman", role: "Admin", initials: "AR" } },
  };
})();
