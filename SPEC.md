# Portfolio Website — Specification

## 1. Goal

Build a personal portfolio website for **Mitnala Shiva Jyothiradithya**, B.Tech student in Mathematics and Computing at the Indian Institute of Science (Class of 2028).

## 2. Tech Stack & Hosting

- **Stack:** Plain HTML5, CSS3, and vanilla JavaScript. No build tools, bundlers, or frameworks — kept simple since the site is static and will be hosted on GitHub Pages, which serves raw HTML/CSS/JS directly with no build step required.
- **Hosting:** GitHub Pages, served from the repository root (or `/docs`, TBD at setup time).
- **File structure:**
  ```
  /
  ├── index.html
  ├── css/
  │   └── style.css
  ├── js/
  │   └── main.js
  ├── assets/
  │   ├── profile-photo.png
  │   └── CV_final.pdf
  └── SPEC.md
  ```

## 3. Inputs

- **CV:** `CV_final.pdf` (in project directory) — source of truth for all text content (see Section 6).
- **Photo:** `profile photo.png` (in project directory) — used as the profile image (see Section 5).

## 4. Visual Theme

- **Background:** Dark mode. Base background color in the near-black range (e.g. `#0a0a0f`–`#121218`), not pure black, so purple glows have room to read against it.
- **Accent color:** Purple (e.g. `#8b5cf6` / `#a855f7` range) used for glows, borders, and highlight text.
- **Glow effect:** Soft `box-shadow` / `filter: blur()` purple glows radiating around key elements — the profile image, the navigation bar corners, and section headings/cards on hover. Glows should be subtle (low opacity, large blur radius) rather than solid neon outlines.
- **Typography:** Clean sans-serif (e.g. system font stack or a Google Font like Inter/Poppins), light-colored text (off-white, e.g. `#e5e5e5`) for readability against the dark background.

## 5. Profile Image

- Source file: `profile photo.png`.
- Displayed using an **inverted triangle shape** via CSS `clip-path` (e.g. `clip-path: polygon(0 0, 100% 0, 50% 100%)`), so the image is widest at the top and comes to a point at the bottom.
- A soft purple glow (blurred box-shadow) surrounds the shape.
- Placed prominently, likely in a hero/header area alongside the name and title ("B.Tech in Mathematics and Computing, IISc").

## 6. Navigation Bar

- **Position:** Fixed/sticky at the top of the viewport, visible on scroll.
- **Background:** Transparent (or semi-transparent with a slight blur/backdrop-filter for legibility over content scrolling beneath it).
- **Glow:** Purple glow concentrated at the **top-left** and **bottom-right** corners of the nav bar, fading toward the center — not a uniform border glow.
- **Tabs (in order):**
  1. About
  2. Experience
  3. Projects
  4. Achievements
  5. Personal Interests
- **Behavior:** Single-page layout — each tab is an anchor link (`#about`, `#experience`, etc.) that smooth-scrolls to the corresponding section on the same page (no separate pages/routes).
- **Active state:** The current section's tab should be visually highlighted (e.g. purple underline or glow) as the user scrolls.

## 7. Section Content (sourced from CV)

### 7.1 About
- Name: Mitnala Shiva Jyothiradithya
- Degree: B.Tech in Mathematics and Computing, Indian Institute of Science (2024–2028), CGPA 8.9
- Prior academics: Class XII (Board of Intermediate Education, AP) — 99.1%, Sri Chaitanya Junior College, 2024; Class X (CBSE) — 98.4%, Montessori Indus EM Primary School, 2022
- Languages: English, Telugu, Hindi

### 7.2 Experience
- **Emergence AI** — Research Intern, May 2026 – Jul 2026
  - Project: *BulletproofTemplateS* — a context-aware web templating engine built from scratch in Lean to structurally prevent Cross-Site Scripting (XSS) vulnerabilities.
  - Built a custom recursive-descent parser and lexer processing HTML, CSS, JavaScript, JSON, and Jinja-style logic into an Abstract Syntax Tree (AST).
  - Developed a context-aware escaping engine that analyzes the AST to apply correct sanitization rules per context (HTML, JS, CSS, JSON).
  - Formally verified the engine with machine-checked proofs for mathematically rigorous correctness, security, and stability guarantees.

### 7.3 Projects
- **Fine-Tuning of a Liquid Model** — ML Researcher, May 2026 – Jun 2026
  - Engineered a custom reinforcement learning pipeline integrating a GRPO trainer with self-designed reward functions for logical correctness and strict format adherence.
  - Fine-tuned a Liquid Foundation Model, substantially improving mathematical reasoning and problem-solving performance on the GSM8k benchmark.
  - Evaluated the model across standard industry benchmarks, demonstrating measurable improvements in reasoning and formatting adherence.

### 7.4 Achievements
- Secured State 2nd Rank in the State Board Intermediate Examinations.
- Secured All India Rank (AIR) 1529 and EWS Rank 180 in JEE Main.
- Secured All India Rank (AIR) 1903 and EWS Rank 175 in JEE Advanced.
- Current recipient of the KVB Scholarship Program (₹1,00,000/year), awarded by Karur Vysya Bank.

### 7.5 Personal Interests
- **Content TBD** — this section is a placeholder for now. Render it with a heading and a "Coming soon" / placeholder note so the section is visibly present and easy to fill in later.

### 7.6 Courses (optional supplementary content)
- Not part of the requested nav tabs, but available from the CV as an optional "Coursework" list under About or Achievements if a fuller academic picture is wanted later: Analysis & Linear Algebra I/II, Algorithms and Programming, Computer Systems, Discrete Mathematics, Probability and Statistics, Numerical Methods, Data Structures and Algorithms, Introduction to Basic Analysis, Introduction to Algebraic Structures, Introduction to AI and Machine Learning, Automata and Computability, Introduction to NLP (PG), Introduction to Electrical and Electronics Engineering.

## 8. Responsiveness

- Layout must adapt to mobile, tablet, and desktop widths (fluid/flex or CSS grid layouts, no fixed pixel-only widths for containers).
- Navigation bar collapses to a mobile-friendly menu (e.g. hamburger toggle) below a defined breakpoint (e.g. 768px).

## 9. Out of Scope / Open Questions

- No backend, contact form submission, or CMS — content is static and hand-authored in HTML.
- Personal Interests content to be supplied later (Section 7.5).
- Exact hex values for background/purple glow and font choice are implementation details left to the build step, within the ranges given in Section 4.
