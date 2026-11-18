/* ==========================================================================
   HER INTERNATIONAL: SITE CONTENT
   Every number on the site comes from this file, so the board can update
   figures each year without touching the page layout.

   Sources (fetched November 2026):
   - 2025–2026 Impact Report: herinternational.org/s/2026-Annual-Report.pdf
   - herinternational.org: Nepal Programs, Support a Student, Membership,
     Nepal Build, Reports ("At a glance") and the footer pages

   Gifts marked basis: "estimate" are DERIVED by dividing a 2025–26 program
   budget by the number of people it served. Ask the treasurer to confirm
   them, or change them to "stated" once the board publishes a figure.
   ========================================================================== */
window.HER_DATA = {
  draftMode: false,

  links: {
    donate: "https://herinternational.org/donate",
    donateUS: "https://herinternational.org/donate-us",
    bricks: "https://give-can.keela.co/bricks-2027",
    membership: "https://herinternational.org/membership",
    walk: "https://walk-for-her.raiselysite.com/",
    build: "https://herinternational.org/build",
    reportsPage: "https://herinternational.org/annual-report-reports",
    latestReport: "https://herinternational.org/s/2026-Annual-Report.pdf",
    partner: "https://www.creatingpnepal.com/",
    instagram: "http://instagram.com/herinternational",
    facebook: "https://www.facebook.com/HerInternational.org/"
  },
  email: "info@herinternational.org",
  mail: "Her International, PO Box 30034 RPO Glenpark, Kelowna, BC, Canada, V1V 2M4",
  charityNumber: "89745-2405",
  usNote: "US donations are powered by The Safe Harbor Foundation, registered 501(c)(3) EIN: 81-4487960",
  fiscalYear: "2025–2026",

  // "What your gift does": one card per donation amount.
  // basis: "stated" = a cost Her International publishes; "estimate" = derived from the report
  gifts: [
    { amount: 35, icon: "people", title: "Become a voting member",
      text: "Your annual membership funds programs and lets you vote on the board and on major decisions. You'll also get the annual report and an invitation to the AGM.",
      tag: "Membership", basis: "stated", link: "membership" },
    { amount: 100, icon: "bike", title: "A bicycle for a student",
      text: "Committed students get a bike in Grades 7 to 9. It saves hours of walking, gives her a safer trip to school and is a visible sign that she's a student.",
      tag: "Nepal", basis: "stated" },
    { amount: 100, icon: "brick", title: "A brick at Unako House",
      text: "A personalized brick at Unako (\"her\") House, the community centre in Dang where students get supplies and tutoring and mothers' groups meet. Includes a gift certificate.",
      tag: "Nepal", basis: "stated", link: "bricks" },
    { amount: 120, icon: "spark", title: "A teen's year of leadership",
      text: "About what it costs to put one teen (ages 13 to 18) through a year of weekly We Create sessions on leadership, financial literacy and goal-setting.",
      tag: "Nepal", basis: "estimate", calc: "$10,000 ÷ 86 youth" },
    { amount: 225, icon: "group", title: "A mothers' group for a year",
      text: "About what it costs to run one Mothers' Group of roughly 30 women for a year: savings and microcredit, financial literacy and leadership.",
      tag: "Nepal", basis: "estimate", calc: "$14,700 ÷ 66 groups" },
    { amount: 396, monthly: 33, icon: "cap", title: "A full year of school for one girl",
      text: "Admission and exam fees, group tutoring, uniform, shoes, school bag, books and supplies, and hygiene products for a whole year. Eligible students also get a bicycle.",
      tag: "Nepal", basis: "stated", featured: true }
  ],

  // 2025–26 spending (Impact Report, Financial Overview)
  spending: [
    { label: "Programs",       amount: 182568, color: "var(--c1)" },
    { label: "Administration", amount: 48513,  color: "var(--c3)" },
    { label: "Fundraising",    amount: 4595,   color: "var(--c4)" }
  ],

  // 2025–26 program investments (Impact Report)
  programs: [
    { label: "She Learns scholarships", amount: 121400, note: "255 students, 125 of them new this year" },
    { label: "UBC health programs",     amount: 25000,  note: "Adolescent and reproductive health education" },
    { label: "Mothers' Groups",         amount: 14700,  note: "1,965 women in 66 groups" },
    { label: "We Create youth leadership", amount: 10000, note: "86 teens, ages 13 to 18" },
    { label: "Her Health (menstrual health)", amount: 4500, note: "339 menstrual cups, donated by Saalt" },
    { label: "Computer lab",            amount: 4000,   note: "" },
    { label: "Kelowna community resources", amount: 3000, note: "Supporting women and girls at home in Canada" }
  ],

  // 2025–26 income (Impact Report)
  income: [
    { label: "Donations",          amount: 156556 },
    { label: "Fundraising events", amount: 74588 },
    { label: "Other",              amount: 3723 }
  ],

  // Hero stats (2025–26 Impact Report and the site's "At a glance")
  stats: [
    { value: "255",   label: "students in school this year" },
    { value: "1,965", label: "women in 66 Mothers' Groups" },
    { value: "3,194", label: "scholarships provided since 2005" },
    { value: "$2M+",  label: "invested in programs over 20 years" }
  ],

  // All-time impact (Reports page, "Her International at a glance")
  glance: [
    { value: "3,194", label: "annual scholarships provided" },
    { value: "313",   label: "bicycles given to girls" },
    { value: "187",   label: "girls reunited with their families after bonded labour" },
    { value: "578",   label: "girls in the She Creates leadership program" },
    { value: "7",     label: "build projects, reaching 23,000 people a year" }
  ]
};
