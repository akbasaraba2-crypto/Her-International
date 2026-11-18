(function () {
  const D = window.HER_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = n => "$" + Math.round(n).toLocaleString("en-CA");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const sum = arr => arr.reduce((s, x) => s + x.amount, 0);

  // Shared text and links
  $$("[data-email]").forEach(a => { a.href = "mailto:" + D.email; a.textContent = D.email; });
  $$("[data-charity]").forEach(el => (el.textContent = D.charityNumber));
  $$("[data-fy]").forEach(el => (el.textContent = D.fiscalYear));
  $$("[data-mail]").forEach(el => (el.textContent = D.mail));
  $$("[data-us]").forEach(el => (el.textContent = D.usNote));
  $$("[data-link]").forEach(a => (a.href = D.links[a.dataset.link]));
  $("#year").textContent = new Date().getFullYear();
  if (D.draftMode) $("#draftBanner").hidden = false;

  // Stats
  $("#stats").innerHTML = D.stats.map(s => `<li><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></li>`).join("");
  $("#glance").innerHTML = D.glance.map(s => `<li><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></li>`).join("");

  // Gift cards
  const gifts = [...D.gifts].sort((a, b) => a.amount - b.amount);
  const priceLabel = g => g.monthly
    ? `${money(g.monthly)}<small>/month</small>`
    : `${g.basis === "estimate" ? "≈" : ""}${money(g.amount)}`;
  $("#gifts").innerHTML = gifts.map((g, i) => `
    <article class="gift${g.featured ? " featured" : ""}">
      ${g.featured ? '<span class="ribbon">Sponsor a girl</span>' : ""}
      <div class="gift-top">
        <span class="gift-amt">${priceLabel(g)}</span>
        <span class="gift-ico"><svg class="icon" aria-hidden="true"><use href="#i-${g.icon}"/></svg></span>
      </div>
      ${g.monthly ? `<p class="gift-alt">or ${money(g.amount)} once</p>` : ""}
      <h3>${esc(g.title)}</h3>
      <p>${esc(g.text)}</p>
      ${g.basis === "estimate" ? `<p class="basis basis-estimate" title="Worked out from 2025–26 program spending">≈ estimate: ${esc(g.calc)}</p>` : ""}
      <div class="gift-foot">
        <span class="pill">${esc(g.tag)}</span>
        <a ${g.link ? `href="${D.links[g.link]}" target="_blank" rel="noopener"` : `href="#donate" data-pick="${i}"`} class="gift-link">Give ${g.monthly ? money(g.monthly) + "/mo" : money(g.amount)} →</a>
      </div>
    </article>`).join("");

  // Donate box quick picks
  const donateBtn = $("#donateBtn");
  const picks = [
    { amount: 33, monthly: true, label: "a girl's school year" },
    { amount: 100, label: "a bicycle" },
    { amount: 225, label: "a mothers' group" },
    { amount: 396, label: "a full scholarship" }
  ];
  $("#quickAmounts").innerHTML = picks.map((p, i) =>
    `<button type="button" data-i="${i}"><strong>${money(p.amount)}${p.monthly ? "<small>/mo</small>" : ""}</strong><span>${esc(p.label)}</span></button>`).join("");
  function choose(amount, monthly) {
    $$("#quickAmounts button").forEach(b => {
      const p = picks[b.dataset.i];
      b.setAttribute("aria-pressed", String(p.amount === +amount && !!p.monthly === !!monthly));
    });
    donateBtn.textContent = `Donate ${money(amount)}${monthly ? "/month" : ""} ↗`;
  }
  $$("#quickAmounts button").forEach(b => b.addEventListener("click", () => { const p = picks[b.dataset.i]; choose(p.amount, p.monthly); }));
  $$("[data-pick]").forEach(a => a.addEventListener("click", () => {
    const g = gifts[a.dataset.pick]; g.monthly ? choose(g.monthly, true) : choose(g.amount, false);
  }));
  choose(33, true);

  // Impact calculator: fills the yearly budget with outcomes, largest first
  const outcomes = [
    { cost: 396, one: "full year of school for a girl", many: "full years of school for girls" },
    { cost: 225, one: "Mothers' Group running for a year", many: "Mothers' Groups running for a year" },
    { cost: 120, one: "teen through a year of leadership training", many: "teens through a year of leadership training" },
    { cost: 100, one: "bicycle for a student", many: "bicycles for students" }
  ];
  const range = $("#calcRange"), out = $("#calcOut"), result = $("#calcResult"), calcBtn = $("#calcDonate");
  const isMonthly = () => $("input[name=freq]:checked").value === "monthly";
  function updateCalc() {
    const v = +range.value, monthly = isMonthly(), total = monthly ? v * 12 : v;
    out.textContent = v.toLocaleString("en-CA");
    let left = total; const parts = [];
    for (const o of outcomes) {
      const n = Math.floor(left / o.cost);
      if (n > 0) { parts.push(`${n} ${n === 1 ? o.one : o.many}`); left -= n * o.cost; }
    }
    const lead = monthly ? `Over a year (${money(total)}), you could fund` : "You could fund";
    result.innerHTML = parts.length
      ? `${lead} <strong>${parts.map(esc).join("</strong> + <strong>")}</strong>.`
      : `${monthly ? `Over a year that's ${money(total)}, which` : "Your gift"} goes toward a girl's school fees, books and supplies.`;
    calcBtn.textContent = `Give ${money(v)}${monthly ? "/month" : ""}`;
    range.style.setProperty("--p", ((v - range.min) / (range.max - range.min)) * 100 + "%");
  }
  range.addEventListener("input", updateCalc);
  $$("input[name=freq]").forEach(r => r.addEventListener("change", updateCalc));
  calcBtn.addEventListener("click", () => choose(range.value, isMonthly()));
  updateCalc();

  // Spending donut
  const spendTotal = sum(D.spending);
  const pct = a => (a / spendTotal) * 100;
  const svg = $("#donut"); let offset = 25;
  D.spending.forEach(s => {
    const p = pct(s.amount);
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const attrs = { cx: 21, cy: 21, r: 15.915, fill: "none", "stroke-width": 6,
      "stroke-dasharray": `${p} ${100 - p}`, "stroke-dashoffset": offset };
    Object.entries(attrs).forEach(([k, v]) => c.setAttribute(k, v));
    c.style.stroke = s.color; svg.appendChild(c); offset -= p;
  });
  const programs = D.spending.find(s => s.label === "Programs");
  $("#donutPct").textContent = Math.round(pct(programs.amount)) + "¢";
  $("#spendTotal").textContent = money(spendTotal);
  $("#legend").innerHTML = D.spending.map(s => `
    <li><span class="swatch" style="background:${s.color}"></span>
      <span class="legend-label">${esc(s.label)} <span class="legend-amt">${money(s.amount)}</span></span>
      <span class="legend-pct">${Math.round(pct(s.amount))}%</span>
      <span class="bar"><span style="width:${pct(s.amount)}%;background:${s.color}"></span></span></li>`).join("");
  $$("[data-spend]").forEach(el => {
    const s = D.spending.find(x => x.label === el.dataset.spend);
    if (s) el.textContent = `${money(s.amount)} (${Math.round(pct(s.amount))}%)`;
  });

  // Program breakdown bars
  const progMax = Math.max(...D.programs.map(p => p.amount));
  $("#progTotal").textContent = money(sum(D.programs));
  $("#hbars").innerHTML = D.programs.map(p => `
    <li>
      <div class="hbar-head"><span class="hbar-label">${esc(p.label)}</span><span class="hbar-amt">${money(p.amount)}</span></div>
      <div class="hbar"><span style="width:${(p.amount / progMax) * 100}%"></span></div>
      ${p.note ? `<div class="hbar-note">${esc(p.note)}</div>` : ""}
    </li>`).join("");

  // Income stacked bar
  const incTotal = sum(D.income);
  const incColors = ["var(--c1)", "var(--c2)", "var(--c3)"];
  const stack = $("#incomeStack");
  stack.setAttribute("aria-label", "Income: " + D.income.map(i => `${i.label} ${money(i.amount)}`).join(", "));
  stack.innerHTML = D.income.map((i, k) => `<span style="flex:${i.amount};background:${incColors[k % 3]}"></span>`).join("");
  $("#incomeLegend").innerHTML = D.income.map((i, k) =>
    `<li><span class="swatch" style="background:${incColors[k % 3]}"></span>${esc(i.label)} <strong>${money(i.amount)}</strong> <span class="muted">${Math.round((i.amount / incTotal) * 100)}%</span></li>`).join("");

  // Mobile menu
  const menuBtn = $(".menu-btn"), links = $("#navLinks");
  const setMenu = open => { menuBtn.setAttribute("aria-expanded", String(open)); links.classList.toggle("open", open); };
  menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => setMenu(false)));
})();
