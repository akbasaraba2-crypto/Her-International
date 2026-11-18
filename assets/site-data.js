/* ==========================================================================
   HER INTERNATIONAL — SITE CONTENT
   Every number on the site comes from this file, so the board can update
   figures without touching the page layout.

   IMPORTANT: The figures below are EXAMPLE ESTIMATES. Replace them with
   real program costs and audited financial figures before launch, then set
   draftMode to false so the "draft figures" notices go away.
   ========================================================================== */
window.HER_DATA = {
  draftMode: true,

  donateUrl: "https://www.canadahelps.org/en/charities/HerInternational/",
  email: "info@herinternational.org",
  charityNumber: "XXXXX XXXX RR0001", // CRA registration number goes here
  fiscalYear: "2025",

  // "Your gift at work": one tile per donation amount.
  gifts: [
    { amount: 30,  icon: "backpack", title: "A school backpack",
      text: "A backpack filled with notebooks, pens and a geometry set for one girl's school year in rural Nepal.", program: "nepal" },
    { amount: 50,  icon: "shirt",    title: "Uniform & shoes",
      text: "A school uniform and a pair of shoes. Without them, many girls can't attend class.", program: "nepal" },
    { amount: 75,  icon: "chat",     title: "A month of language classes",
      text: "Four weeks of English conversation circles for a newcomer woman in the Okanagan.", program: "canada" },
    { amount: 150, icon: "book",     title: "Textbooks & exam fees",
      text: "A full year of textbooks plus national exam registration, so she can sit the exams that open doors.", program: "nepal" },
    { amount: 300, icon: "people",   title: "A mentorship season",
      text: "One woman matched with a mentor for a season, plus life-skills workshops on budgeting, résumés and job interviews.", program: "canada" },
    { amount: 600, icon: "cap",      title: "A full-year scholarship",
      text: "Tuition, supplies, uniform and follow-up from our local partners for one girl, for a whole school year.", program: "nepal", featured: true }
  ],

  // Where each dollar goes. Percentages must add up to 100.
  allocation: [
    { label: "Nepal girls' scholarships",        pct: 62, color: "var(--c1)" },
    { label: "Canadian women's programs",        pct: 24, color: "var(--c2)" },
    { label: "Administration & accounting",      pct: 8,  color: "var(--c3)" },
    { label: "Fundraising & donor communication", pct: 6,  color: "var(--c4)" }
  ],

  stats: [
    { value: "2005", label: "Funding girls' education since" },
    { value: "100%", label: "Volunteer board, with no paid directors" },
    { value: "86¢",  label: "of every dollar goes straight to programs" },
    { value: "2",    label: "Countries: Nepal and Canada" }
  ]
};
