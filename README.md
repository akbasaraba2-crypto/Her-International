# Her International website

A static website for Her International, built to show donors exactly where their money goes. It needs no build step: open `index.html` in a browser, or host the folder on any static host (GitHub Pages, Netlify and so on).

## Page sections
- **Hero**: the mission plus a "$30 = a backpack" example
- **About**: where the funds go (three places) and who you support (girls in Nepal, women in Canada)
- **Programs**: the Nepal scholarships and the Canadian women's program
- **Your gift at work**: donation tiers, a Nepal/Canada filter and an impact calculator
- **Transparency**: a chart of how each dollar is spent, plus trust commitments and report links
- **FAQ**, **Donate** (goes to CanadaHelps) and a footer

## Editing content
Every amount, percentage and statistic lives in `assets/site-data.js`.

## Sources
The figures come from the **2025–2026 Impact Report** (herinternational.org/s/2026-Annual-Report.pdf) and from pages on herinternational.org (Nepal Programs, Support a Student, Membership, Reports, Nepal Build). Update `assets/site-data.js` each year when the new report comes out.

## Before launch
- [ ] Ask the treasurer to confirm the two **estimated** gift amounts: ≈$120 for a teen's year of We Create ($10,000 ÷ 86 youth) and ≈$225 for a Mothers' Group for a year ($14,700 ÷ 66 groups)
- [ ] The program lines in the report add up to $182,600, while total program spending is listed as $182,568. Confirm which figure is correct
- [ ] Decide whether to explain the 21% administration figure (for example, if it includes partner coordination in Nepal)
- [ ] Add real photos of students and participants (with consent)
- [ ] Optional: link each gift to a donation form that pre-fills the amount
