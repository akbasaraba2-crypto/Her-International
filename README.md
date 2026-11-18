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

## Before launch
- [ ] Replace the gift amounts and descriptions with real program costs
- [ ] Replace the `allocation` percentages with figures from the audited financial statements
- [ ] Fill in `charityNumber` (the CRA registration number) and `fiscalYear`
- [ ] Check the stats (founding year, the "cents per dollar" figure)
- [ ] Link the Annual Report and Financial Statements PDFs in `index.html` (search for `href="#"`)
- [ ] Add real photos of students and participants (with consent)
- [ ] Set `draftMode: false` to remove the draft banner and notes
