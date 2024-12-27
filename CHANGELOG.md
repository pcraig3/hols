# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.26.0] - 2024-12-27

### Added

- Added new years
  - 2014
  - 2032
  - 2033

### Changed

- API spec updated
  - Default year is 2025
  - New min/max years (2014/2033)
- Updated sitemap with new year
- ProvincePicker now shows 2 less dates
- Redirect "provinces/QB" to "provinces/QC"

### Fixed

- Update tests that relied on year being 2024


## [3.25.2] - 2024-12-20

### Fixed

- Fixed bug where my JS was breaking on pages without a region picker

## [3.25.1] - 2024-12-10

### Changed

- Speed up + simplify font loading
  - Don't use a version number for fonts (they _never_ get updated)
  - Preload fonts
  - Delete very old (outdated) font formats

## [3.25.0] - 2024-12-10

### Added

- Add build step that concats and minifies JS files
  - This is sad but it might make the site faster

### Changed

- Regatta Day is moved up a week because of the 2025 Canada Games! Go team!

## [3.24.1] - 2024-10-25

### Added

- Add partytown to save some pageload time with GTM

### Changed

- Longer cache time for static files (1 year, up from 3 months)
- Slightly more top padding so that the ads on mobile look better

## [3.24.0] - 2024-10-25

### Added

- Added a banner to the site with Adsense
  - Selling out? Yes.

### Updated

- Cache static files for longer (90 days, not 3 days)
- Defer body scripts since they are blocking

### Removed

- Get rid of CSP because it doesn't work with Adsense
- Get rid of workbox because it always causes weird console errors

## [3.23.2] - 2024-08-14

### Updated

- Use more efficient compression library
  - Also compress static files

### Fixed

- Add cloudflare to connectSrc to avoid csp error

## [3.23.1] - 2024-08-14

### Updated

- Updated documentation for API query parameters
  - Make it clear they accept one value at a time

## [3.23.0] - 2024-07-12

### Added

- Added optional holidays to Nova Scotia

### Updated

- Manitoba celebrates "orange shirt day", not "Truth and Reconcilitation Day"
  - Also, it is now required, not optional

### Fixed

- Some relative date conversions were 1 day early, but that is fixed

## [3.22.0] - 2023-12-26

### Added

- Added new years as options
  - 2015
  - 2030
  - 2031

### Updated

- API spec updated for new years again
- Updated sitemap with new days
- New tests for new years
- ProvincePicker now shows 1 less date

### Fixed

- Fixed a bug that was introduced by updating the ics lib

## [3.21.3] - 2023-10-28

### Updated

- Minor: updated the node version and my SQLite helper. Not user-facing but worth having a separate revision for this.

## [3.21.2] - 2023-10-02

### Updated

- Update the status of National Truth and Reconciliation Day for Nunavut
  - It is a public service holiday, not a day everyone gets

## [3.21.1] - 2023-08-22

### Updated

- NL's Discovery Day, when it falls on a Monday, should be on that Monday

## [3.21.0] - 2023-02-13

### Updated

- Update the status of National Truth and Reconciliation Day
  - BC changed it from optional to a provincial holiday
  - Yukon, NWT, and Nunavut all made it a provincial holiday
  - Alberta mentions it as an optional holiday now

## [3.20.2] - 2023-02-13

### Updated

- Change the Cross Origin Resource Policy to allow other origins to load stuff

## [3.20.1] - 2023-02-12

### Updated

- Remove API routes and ICS routes from google bot

## [3.20.0] - 2023-02-11

### Added

- Add optional holidays for New Brunswick

## [3.19.0] - 2022-12-27

### Added

- Added new years as options
  - 2016
  - 2027
  - 2028
  - 2029

### Updated

- API spec updated for new years again
- Added a bunch of tests for the new dates
- Updated sitemap with new days


## [3.18.3] - 2022-12-27

### Removed

- Remove previous implementation of GA, since the old one is working fine.

## [3.18.2] - 2022-12-06

### Updated

- Added GA4, since the other one is getting depped
  - Previous implementation is still there for now, but will be removed eventually

## [3.18.1] - 2022-12-06

### Updated

- Updated print styles for holidays pages
  - Added back in Holidays logo
  - Removed accent colours, "details" triangles, underlines, and bottom link
  - Real holidays are solid black, optiona holidays are grey

## [3.18.0] - 2022-11-23

### Added

- Added redirect if the URL path uses a lowercase provinceId (eg /provinces/ab redirects to /provinces/AB)

### Updated

- Reworked the h1, added the word "statutory"
  - Using CSS to reorder elements now instead of a visuallyHidden sentence

### Removed

- Took out the "dataset" rich results markup because someone de-listed me, so I don't think it's helping much.

## [3.17.5] - 2022-11-22

### Fixed

- Updated the API schema to remove a duplicated example
- Updated the sitemap, which was broken apparently

## [3.17.4] - 2022-09-30

### Fixed

- The little details/summary for Boxing Day 2022 claimed that it was observed on Monday, which is not the case.


## [3.17.3] - 2022-09-21

### Updated

- Add optional holidays to provinces listing for all years
- Allow About page to be crawled

### Fixed

- It was not working to return holidays for a province in another year than this year with optional=true
  - Now it is working though. 
  - This is a follow-up on `3.17.1` where I missed this part of the app.

## [3.17.2] - 2022-09-19

### Fixed

- Updated Day of Mourning to be an optional holiday for the provinces for which it is not a proper stat holiday (most of them)

## [3.17.1] - 2022-09-14

### Fixed

- Provinces with holidays that expire or haven't started yet would fail on those years due to some bad code I wrote.
  - Should be fixed now, added an extra IF check

## [3.17.0] - 2022-09-14

### Added

- Day of Mourning to Canadian provinces as a 1-time holiday
  - Participating provinces: PEI, NS, NL, NB, BC, YT, and the feds

- Also, I missed this yearlier, but PEI is going to observe Truth and Reconciliation Day from now on as a stat holiday.

## [3.16.0] - 2022-04-23

### Added

- Add optional holidays for Manitoba to the API
- Add optional holidays for Ontario to the API

### Updated

- Add optional holidays to UI for Manitoba
- Add optional holidays to UI for Ontario
- No longer return optional holidays with no provinces for the generic /holidays endpoint
  - This removes them from the home page, where they were just floating

### Fixed

- Corrected spelling for "Civic holiday" (the worst named for sure) in French
- Same for Heritage day, but that one was just lowercasing a letter
- Updated link for Alberta's public holidays page, as they've updated it slightly

## [3.15.0] - 2022-04-23

### Added

- Add optional holidays for BC to the API
  - Again, they don't show up by default unless you request them using a query parameter

### Updated

- Add optional holidays to UI for BC

## [3.14.0] - 2022-04-22

### Added

- Added new years as options
  - 2017
  - 2025
  - 2026

### Updated

- API spec updated for new years again
- Added a bunch of tests for the new dates
- Updated sitemap with new days

## [3.13.2] - 2022-02-15

### Fixed

- Minor layout glitch on open/close optional holiday rows

## [3.13.1] - 2022-02-15

### Removed

- Remove toast notification, votes are in:
  - Unique pageviews: 3681
  - Responses: 8
    - 1: No, I only want to see true statutory holidays
    - 7: Yes, it helps me to see the optional holidays
  - Verdict: let's keep them

## [3.13.0] - 2022-02-07

### Added

- Add page explaining Canada's optional holidays
  - Add new page to sitemap
- Added `Abbr` component with a nicer abbreviation experience
- Added a little toast notification soliciting feedback

### Updated

- Add optional holidays to Alberta (for current year)

## [3.12.1] - 2022-02-06

### Updated

- Add spacing to list elements
- Add top spacing to h1 on "provinces" page
- Remove some whitespace from the Summary Table titles

## [3.12.0] - 2022-02-03

### Added

- Add optional holidays for Alberta to the API
  - They don't show up by default unless you request them using a query parameter

## [3.11.2] - 2022-01-22

### Fixed

- Fix SQLite configuration 🤞

## [3.11.0] - 2022-01-18

### Fixed

- Migrate away from problematic sqlite lib, use a better-sqlite3 wrapper instead
  - This is huge: the old sqlite was breaking everything

## [3.10.2] - 2022-01-18

### Fixed

- Update default API year to 2022 (this is stored in the yaml file, not the code)
- Update the tests that were failing, mostly due to the date not properly being observed

## [3.10.1] - 2021-12-25

### Fixed

- ICS links on "Add holidays" page prepended with "https://"

## [3.10.0] - 2021-12-25

### Added

- Add instructions on "Add holidays" page for streaming holidays
- Can use /ics paths without an explicit year

### Updated

- Return /ics paths without "Content-disposition" header by default
- Don't include "download" attribute on "add to calendar" links
- Use CalButton on "Add holidays" page instead of custom button  

### Fixed

- Only add event listener to nextHolidayLink if found on page 

## [3.9.0] - 2021-12-05

### Updated

- Use literal date for the "Next holiday" box

## [3.8.0] - 2021-12-03

### Added

- Added a new holiday for Nunavut (Nunavut Day)

### Updated

- API spec updated for new max integer value (1 new holiday)
- Updated links to sources where they were broken

### Fixed

- Changed base container to node-slim because my build was failing.

## [3.7.1] - 2021-11-01

### Fixed

- Fixed a broken link in the README
- Updated the default node version in `.nvmrc`

## [3.7.0] - 2021-08-27

### Added

- Added 2024 as an option

### Updated

- API spec updated for new year
- Updated sitemap with new day

## [3.6.0] - 2021-07-30

### Updated

- bump node engine to 14
- add python to dockerfile for tempermental new macs

### Fixed

- update the date on the "download holidays to your calendar" page

## [3.5.0] - 2021-06-26

### Added

- Added notification drawer for important info

## [3.4.0] - 2021-06-26

### Added

- New holiday just dropped: National Day for Truth and Reconciliation

## [3.3.2] - 2021-06-12

### Updated

- Use the numbers for start and end dates in .ics files, otherwise they would fail to generate.

## [3.3.1] - 2021-04-12

### Updated

- Use the literal dates for holidays in the .ics files as well. Missed this earlier.

## [3.3.0] - 2021-01-01

### Updated

- Show the literal dates for holidays, and observed dates underneath

## [3.2.1] - 2021-01-01

### Updated

- Update sitemap with new pages

## [3.2.0] - 2020-12-31

### Added

- Added 2023 as an option

### Updated

- API spec updated for new year
  - Year range extended
  - Default year is 2021

## [3.1.1] - 2020-12-27

### Updated

- Date comparison adjusts for the end of the day (UTC) before deciding whether today is still a holiday

## [3.1.0] - 2020-12-26

### Added

- Remove redirects for "current year"
  - Adjust canonical tags though: we want current year pages to point to the yearless links

### Updated

- Calculate end of the year differently for different provinces (depends on boxing day)

## [3.0.0] - 2020-11-17

### Breaking change

- Moved all the `/province/*` URLs to `/provinces/*`
  - eg, `/province/MB/2021` is now `/provinces/MB/2021`
  - old URLs will 301 redirect to the new URLs
  - technically this is a breaking change, although I am more worried about search engines than actual users

### Added

- added a rel="canonical" link to the `<head>`

## [2.14.3] - 2020-11-16

### Fixed

- meta information for open graph is just one sentence — it gets cut off otherwise
- update open graph images for twitter

## [2.14.2] - 2020-11-16

### Fixed

- update open graph images to aspect ratio of 1.91:1 (1200 x 628)

## [2.14.1] - 2020-11-16

### Updated

- "download" icon looks nicer

## [2.14.0] - 2020-11-15

### Added

- added images for opengraph (eg, FB and Twitter)

### Fixed

- shortened descriptions for opengraph

## [2.13.1] - 2020-11-03

### Fixed

- fix the data-label for the next year link

## [2.13.0] - 2020-11-03

### Added

- add link to next year's holidays to all years but the current max (2022)
  - not putting "past holidays" because nobody wants them

## [2.12.1] - 2020-10-26

### Fixed

- rel="noopener" for target=_blank links offsite
- add cloudflare beacon script to CSP
- a11y: no tabbed focus on the date in the header

## [2.12.0] - 2020-10-26

### Added

- Rich results for datasets. Added metadata to pages for all provincial, federal, and national holidays.

### Updated

- Added holidays count to the meta string for each region.

## [2.11.1] - 2020-10-21

### Fixed

- Removed duplicate `<meta>` description
- Fixed some CSS parsing errors

## [2.11.0] - 2020-10-21

### Added

- Speakable rich search results. Still in beta but could be fun.
- SR-only text for the h1 on "next holiday" pages. Makes it flow better

### Updated

- Added aria-labels for province names in the "observed by" paragraph. sounds nicer.

### Fixed

- Removed "visuallyHidden" css emotion class in favour of a regular classname. Means it works as expected in FF, at least.

## [2.10.0] - 2020-10-21

### Added

- Breadcrumbs rich search results. Does it matter? Maybe.

## [2.9.0] - 2020-10-12

### Added

- Cool new feature! It's a PWA now
- Added a CHANGELOG