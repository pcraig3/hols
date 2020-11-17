# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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