# Implementation Plan: Portfolio Website

## Context

`SPEC.md` defines a dark-mode, purple-glow single-page portfolio for Mitnala Shiva Jyothiradithya, to be hosted on GitHub Pages. This is a greenfield build — the project directory currently only contains `SPEC.md`, `CV_final.pdf`, and `profile photo.png` (plus two empty `INSIGHTS.md`/`ISSUES.md` files); there is no existing code to reuse or integrate with. The plan below turns the spec into a concrete static site: plain HTML/CSS/JS, no build tooling, so it can be pushed straight to a GitHub Pages branch.

Clarifications gathered before finalizing this plan:
- **Personal Interests**: placeholder section for now (per SPEC.md 7.5).
- **CV download**: add a "Resume" button (links to the CV PDF).
- **Footer/contact**: include an email link (`jyothiradithyams1729@gmail.com`) plus LinkedIn/GitHub icon slots, left as blank (`#`) placeholder links for the user to fill in later.

## File Structure

Create the following under `K:\AIDS\Portfolio\`:

```
index.html
css/
  style.css
js/
  main.js
assets/
  profile-photo.png      (copied from "profile photo.png", renamed — no space, safe for URLs)
  CV_final.pdf            (copied as-is, used by the Resume/Download button)
```

`SPEC.md`, `CV_final.pdf` (original), and `profile photo.png` (original) stay where they are; the copies in `assets/` are what the site actually references.

## HTML (`index.html`)

Single page, sections in this order, each with an `id` matching its nav anchor:

1. `<header class="navbar">` — fixed/sticky nav with logo/name on the left, tab links (`#about`, `#experience`, `#projects`, `#achievements`, `#interests`) plus a "Resume" button linking to `assets/CV_final.pdf` (opens in new tab), and a hamburger toggle button for mobile (hidden above the breakpoint).
2. `<section id="about" class="hero">` — profile photo (inverted-triangle clip-path + glow), name, degree title, one-line intro, academic profile table/list (CGPA, XII%, X%), languages.
3. `<section id="experience">` — Emergence AI research internship, structured as a title/role/date header + bullet list (content from SPEC.md 7.2).
4. `<section id="projects">` — "Fine-Tuning of a Liquid Model" as a project card (content from SPEC.md 7.3). Card-based layout so more projects can be added later without restructuring.
5. `<section id="achievements">` — bullet list of the four achievements (SPEC.md 7.4).
6. `<section id="interests">` — heading + "Coming soon" placeholder (SPEC.md 7.5).
7. `<footer>` — email (`mailto:jyothiradithyams1729@gmail.com`) link/icon, LinkedIn icon (`href="#"`), GitHub icon (`href="#"`), all marked with a `data-placeholder` attribute or similar so they're easy to find and fill in later; small note comment in HTML flagging them as TBD.

Use semantic tags (`nav`, `section`, `header`, `footer`, `h1`-`h3`), one `<link rel="stylesheet" href="css/style.css">`, one `<script src="js/main.js" defer>`, and a Google Fonts `<link>` for Inter/Poppins per SPEC.md 4.

## CSS (`css/style.css`)

- **Design tokens**: `:root` custom properties for background (`--bg: #0d0d12`), surface (`--surface: #16161d`), purple accent (`--accent: #a855f7`, `--accent-soft: rgba(168,85,247,0.35)`), text colors, per SPEC.md 4.
- **Base**: dark background on `body`, off-white text, Inter/Poppins font stack.
- **Navbar**: `position: sticky; top: 0`, transparent/blurred background (`backdrop-filter: blur(8px)`), corner glows via two `::before`/`::after` pseudo-elements positioned at top-left and bottom-right with `radial-gradient` + `filter: blur()`, not a uniform border-glow. Active-link state (class toggled by JS) gets an underline/glow.
- **Hero/photo**: `clip-path: polygon(0 0, 100% 0, 50% 100%)` on the image, wrapped in a container with `box-shadow` glow (large blur, low-opacity purple) and possibly a blurred radial-gradient div behind it for a stronger glow effect.
- **Sections**: consistent vertical rhythm (`padding: 6rem 1.5rem` or similar), card components for experience/projects with subtle purple-glow on hover (`box-shadow` transition).
- **Footer**: flex row of icon links, muted style since links are placeholders.
- **Responsive**: mobile-first or desktop-first with a `768px` breakpoint — nav links collapse into a slide-down/hamburger menu (JS-toggled `.open` class), hero stacks image above text, grid/flex sections collapse to single column.

## JS (`js/main.js`)

Small, dependency-free vanilla JS:
1. **Mobile nav toggle** — click handler on hamburger button toggles a class on the nav menu.
2. **Smooth scroll** — either rely on CSS `scroll-behavior: smooth` on `html`, or intercept anchor clicks with `scrollIntoView({behavior: 'smooth'})`; close the mobile menu on link click.
3. **Active-section highlighting** — `IntersectionObserver` watching each `<section>`, toggling an `.active` class on the matching nav link as sections enter the viewport.

## Verification

1. Open `index.html` directly in a browser (or serve via a simple local static server) and visually confirm: dark background, purple glows on photo and nav corners, inverted-triangle photo shape, nav tabs scroll to the right sections, active tab highlights while scrolling.
2. Click the Resume button — confirms it opens `assets/CV_final.pdf`.
3. Resize / use browser dev-tools device toolbar to check the mobile breakpoint — hamburger menu appears and works, layout doesn't overflow horizontally.
4. Check all internal links (`#about`, `#experience`, etc.) resolve and the footer email `mailto:` link is correctly formatted; confirm placeholder social links are clearly marked for later editing.
5. Confirm all asset paths are relative (no absolute `K:\...` or `/Portfolio/...` paths) so the site works unmodified once pushed to a GitHub Pages branch.
