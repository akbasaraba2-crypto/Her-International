(function () {
  const D = window.HER_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = n => "$" + Number(n).toLocaleString("en-CA");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Shared text
  $$("[data-email]").forEach(a => { a.href = "mailto:" + D.email; a.textContent = D.email; });
  $$("[data-charity]").forEach(el => (el.textContent = D.charityNumber));
  $$("[data-fy]").forEach(el => (el.textContent = D.fiscalYear));
  $("#year").textContent = new Date().getFullYear();
  if (D.draftMode) { $("#draftBanner").hidden = false; $$("[data-draft]").forEach(el => (el.hidden = false)); }

  // Stats
  $("#stats").innerHTML = D.stats.map(s => `<li><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></li>`).join("");

  // Gift tiers
  const gifts = [...D.gifts].sort((a, b) => a.amount - b.amount);
  $("#gifts").innerHTML = gifts.map(g => `
    <article class="gift${g.featured ? " featured" : ""}" data-program="${g.program}">
      ${g.featured ? '<span class="ribbon">Biggest impact</span>' : ""}
      <div class="gift-top">
        <span class="gift-amt">${money(g.amount)}</span>
        <span class="gift-ico"><svg class="icon" aria-hidden="true"><use href="#i-${g.icon}"/></svg></span>
      </div>
      <h3>${esc(g.title)}</h3>
      <p>${esc(g.text)}</p>
      <div class="gift-foot">
        <span class="pill pill-${g.program}">${g.program === "nepal" ? "Nepal" : "Canada"}</span>
        <a href="#donate" class="gift-link" data-amount="${g.amount}">Give ${money(g.amount)} →</a>
      </div>
    </article>`).join("");

  $$(".filters button").forEach(btn => btn.addEventListener("click", () => {
    $$(".filters button").forEach(b => b.setAttribute("aria-selected", b === btn));
    const f = btn.dataset.filter;
    $$(".gift").forEach(c => (c.hidden = f !== "all" && c.dataset.program !== f));
  }));

  // Donate box
  const donateBtn = $("#donateBtn");
  donateBtn.href = D.donateUrl;
  const quick = gifts.slice(0, 4).concat(gifts.filter(g => g.featured)).filter((g, i, a) => a.indexOf(g) === i);
  $("#quickAmounts").innerHTML = quick.map(g =>
    `<button type="button" data-amt="${g.amount}"><strong>${money(g.amount)}</strong><span>${esc(g.title)}</span></button>`).join("");
  function choose(amount, monthly) {
    const a = +amount;
    $$("#quickAmounts button").forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.amt === a)));
    donateBtn.textContent = `Donate ${money(a)}${monthly ? "/month" : ""} on CanadaHelps ↗`;
  }
  $$("#quickAmounts button").forEach(b => b.addEventListener("click", () => choose(b.dataset.amt)));
  $$(".gift-link").forEach(a => a.addEventListener("click", () => choose(a.dataset.amount)));
  choose(gifts[0].amount);

  // Impact calculator: fills the chosen budget with gift items, largest first
  const range = $("#calcRange"), out = $("#calcOut"), result = $("#calcResult"), calcBtn = $("#calcDonate");
  const isMonthly = () => $("input[name=freq]:checked").value === "monthly";
  function describe(total) {
    let left = total; const parts = [];
    for (const g of [...gifts].reverse()) {
      const n = Math.floor(left / g.amount);
      if (n > 0) { parts.push(`${n} × ${g.title.toLowerCase()}`); left -= n * g.amount; }
    }
    return parts;
  }
  function updateCalc() {
    const v = +range.value, monthly = isMonthly(), total = monthly ? v * 12 : v;
    out.textContent = v.toLocaleString("en-CA");
    const parts = describe(total);
    result.innerHTML = parts.length
      ? `${monthly ? `Over a year (${money(total)}), your` : "Your"} gift could provide <strong>${parts.map(esc).join("</strong>, <strong>")}</strong>.`
      : "Every dollar counts. Small gifts are pooled to buy school supplies.";
    calcBtn.textContent = `Give ${money(v)}${monthly ? "/month" : ""}`;
    range.style.setProperty("--p", ((v - range.min) / (range.max - range.min)) * 100 + "%");
  }
  range.addEventListener("input", updateCalc);
  $$("input[name=freq]").forEach(r => r.addEventListener("change", updateCalc));
  calcBtn.addEventListener("click", () => choose(range.value, isMonthly()));
  updateCalc();

  // Donut chart
  const sum = D.allocation.reduce((s, a) => s + a.pct, 0);
  if (sum !== 100) console.warn(`Allocation percentages add to ${sum}, expected 100`);
  const svg = $("#donut"); let offset = 25;
  D.allocation.forEach(a => {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const attrs = { cx: 21, cy: 21, r: 15.915, fill: "none", "stroke-width": 6,
      "stroke-dasharray": `${a.pct} ${100 - a.pct}`, "stroke-dashoffset": offset };
    Object.entries(attrs).forEach(([k, v]) => c.setAttribute(k, v));
    c.style.stroke = a.color; svg.appendChild(c); offset -= a.pct;
  });
  const programPct = D.allocation.filter(a => /program|scholar/i.test(a.label)).reduce((s, a) => s + a.pct, 0);
  $("#donutPct").textContent = programPct + "¢";
  $("#legend").innerHTML = D.allocation.map(a => `
    <li><span class="swatch" style="background:${a.color}"></span>
      <span class="legend-label">${esc(a.label)}</span><span class="legend-pct">${a.pct}%</span>
      <span class="bar"><span style="width:${a.pct}%;background:${a.color}"></span></span></li>`).join("");

  // Mobile menu
  const menuBtn = $(".menu-btn"), links = $("#navLinks");
  const setMenu = open => { menuBtn.setAttribute("aria-expanded", String(open)); links.classList.toggle("open", open); };
  menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => setMenu(false)));
})();
