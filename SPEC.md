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

- **CV:** `CV_final.pdf` (in `assets/`, sourced from `CV_Latest (3).pdf`) — source of truth for all text content (see Section 7).
- **Photo:** `profile photo.png` (in project directory) — used as the profile image (see Section 5).

## 4. Visual Theme

- **Background:** Light mode only — no dark mode, no theme toggle. Base background is white or near-white (e.g. `#ffffff`–`#fafafa`).
- **Accent color:** A single clean accent (e.g. a muted blue/indigo or the user's preferred color, TBD at implementation) used sparingly for links, highlights, and hover states — no glow effects.
- **Visual style:** Flat, clean, minimal. Subtle borders (`#e5e5e5` range) and soft drop-shadows (e.g. `0 1px 3px rgba(0,0,0,0.08)`) to separate cards/sections instead of glows.
- **Typography:** Clean sans-serif (e.g. system font stack or a Google Font like Inter/Poppins), dark text (e.g. `#1a1a1a`) on the white background for readability and contrast.

## 5. Profile Image

- Source file: `profile photo.png`.
- Displayed as a square photo (slight corner rounding only, e.g. `border-radius: 8px`, not circular) with a subtle border and soft drop-shadow — no clip-path point shapes, no glow.
- Place it at the top-left corner. Underneath it, place links to social accounts.

## 6. Navigation Bar

- **Position:** Fixed/sticky at the top of the viewport, visible on scroll.
- **Background:** White or semi-transparent white with a slight blur/backdrop-filter for legibility over content scrolling beneath it, plus a thin bottom border to separate it from the page.
- **Tabs (in order):**
  1. About Me
  2. Experience
  3. Projects
  4. Achievements
  5. Hobbies
- **Behavior:** Single-page layout — each tab is an anchor link (`#about`, `#experience`, etc.) that smooth-scrolls to the corresponding section on the same page (no separate pages/routes).
- **Active state:** The current section's tab should be visually highlighted (e.g. accent-colored underline or bold text) as the user scrolls.

## 7. Section Content (sourced from CV)

### 7.1 About
- Name: Mitnala Shiva Jyothiradithya
- Contact: jyothiradit1@iisc.ac.in · github.com/msja1729 · Bengaluru, India
- **Introduction (new short paragraph, rendered directly under the name/title, above everything else in this section):** A brief, warm self-introduction along these lines — "I'm Mitnala Shiva Jyothiradithya, currently pursuing my B.Tech in Mathematics and Computing (3rd year) at the Indian Institute of Science, Bengaluru. I'm interested in Machine Learning, RAG pipelines, and RL pipelines, among other areas, and I'm currently exploring the fields of Computer Systems Security and High-Performance Computing (HPC)." Keep it to 2–3 sentences, first-person, friendly but professional tone — no bullet points.
- **Education sub-section (new, rendered directly below the introduction, replacing the Degree/Class XII/Class X rows that used to live in the facts list):** A short "Education" heading followed by three compact entries:
  - B.Tech, Mathematics and Computing — Indian Institute of Science (2024–2028), CGPA 8.92 (through Semester 4)
  - Class XII — Board of Intermediate Education, **AP State Board** — 99.1%, Sri Chaitanya Junior College, 2024
  - Class X — **CBSE** — 98.4%, Montessori Indus EM Primary School, 2022
- Remaining facts list (Location, Languages) stays as-is below the Education sub-section.
- Languages: English, Telugu, Hindi
- Technical Skills:
  - Programming: Python (NumPy, SciPy, Matplotlib, PyTorch), C++ (STL), Lean
  - Mathematics: Linear Algebra, Probability & Statistics, Optimization, Numerical Methods, Real Analysis
  - Algorithms: Sorting, Trees, Graph Algorithms, Dynamic Programming, Gradient Descent, XGBoost
  - Tools & Frameworks: FastAPI, SQL, GRPO / RL Pipelines, Vision-Language Models

### 7.2 Experience
- **FSID, Indian Institute of Science** — Software Engineering Intern, Nov 2025 – Dec 2025
  - Spearheaded the creation of *Alumni Net*, an integrated platform designed to foster academic and professional networking within ProblemNet.
  - Designed and implemented the end-to-end user flow allowing users to submit complex technical problem statements and immediately receive a curated list of matching alumni profiles.
  - Integrated the Alumni Net feature into the larger ProblemNet architecture, enhancing the platform's overall utility for academic problem-solving.
- **Emergence AI** — Research Intern, May 2026 – Jul 2026
  - Project: *BulletproofTemplateS* — a context-aware web templating engine built from scratch in Lean, providing mathematically rigorous guarantees against Cross-Site Scripting (XSS) vulnerabilities.
  - Engineered and formally verified a custom recursive-descent parser and lexer processing HTML, CSS, JavaScript, JSON, and Jinja-style logic into an Abstract Syntax Tree (AST).
  - Developed a context-aware escaping engine that structurally analyzes the AST to automatically apply correct sanitization rules across HTML, JS, CSS, and JSON contexts.
  - Verified overall correctness, security, and stability across all possible inputs using machine-checked proofs, guaranteeing safety and liveness properties across Web and LLM environments.

### 7.3 Projects
- **Fine-Tuning of a Liquid Foundation Model** — ML Researcher, May 2026 – Jun 2026
  - Engineered a custom reinforcement learning pipeline integrating a GRPO trainer with self-designed reward functions for logical correctness and strict format adherence.
  - Applied the pipeline to fine-tune a Liquid Foundation Model, substantially improving its mathematical reasoning and problem-solving performance on the GSM8k benchmark.
  - Evaluated the model across standard industry benchmarks, demonstrating measurable gains in mathematical reasoning and output formatting.
- **XAI and Gradient Boosted Tree Models** — ML Researcher, Mar 2026 – Apr 2026
  - Replicated foundational XGBoost benchmarks to validate core optimizations, including second-order Taylor approximations and sparsity-aware split finding across diverse predictive tasks.
  - Benchmarked exact greedy versus approximate methods on the HIGGS dataset (11M events), and analyzed Learning-to-Rank algorithms on MQ2008, confirming a 1% NDCG@10 improvement with 2x faster training.
  - Evaluated sparsity handling using the Adult dataset and a 10k subset of the Allstate dataset, demonstrating consistent precision and significant reductions in training time.
  - Analyzed Disk I/O versus compute trade-offs, measuring linear loading scalability (~1.6M rows/s) and profiling block compression overheads in RAM-heavy environments.

### 7.4 Achievements
- Secured State 2nd Rank in the State Board Intermediate Examinations.
- Secured All India Rank (AIR) 1529 and EWS Rank 180 in JEE Main.
- Secured All India Rank (AIR) 1903 and EWS Rank 175 in JEE Advanced.
- Awarded 2nd Place in the NPCI Hackathon conducted at the Indian Institute of Science (IISc).
- Current recipient of the KVB Scholarship Program (₹1,00,000/year), awarded by Karur Vysya Bank.
- **Talks & Presentations** (rendered as a sub-section under Achievements):
  - *PageRank Algorithm and the Ergodic Theorem* — Technical Talk, Indian Institute of Science.
    - Delivered a technical presentation on the PageRank algorithm formulated as a Markov chain.
    - Explained the role of stochastic matrices, stationary distributions, and eigenvectors in ranking.
    - Discussed convergence guarantees using the ergodic theorem and irreducibility assumptions, and analyzed the effect of the damping factor on convergence speed and ranking stability.

### 7.5 Hobbies
- **Content TBD** — this section is a placeholder for now. Render it with a heading and a "Coming soon" / placeholder note so the section is visibly present and easy to fill in later.

### 7.6 Courses (optional supplementary content)
- Not part of the requested nav tabs, but available from the CV as an optional "Coursework" list under About or Achievements if a fuller academic picture is wanted later: Real Analysis, Linear Algebra I & II, Discrete Mathematics, Probability and Statistics, Numerical Methods, Data Structures and Algorithms, Algebraic Structures, Automata and Computability, Computer Systems, Algorithms and Programming, Introduction to AI and Machine Learning, Introduction to NLP (PG), Introduction to Electrical and Electronics Engineering.

## 8. Responsiveness

- Layout must adapt to mobile, tablet, and desktop widths (fluid/flex or CSS grid layouts, no fixed pixel-only widths for containers).
- Navigation bar collapses to a mobile-friendly menu (e.g. hamburger toggle) below a defined breakpoint (e.g. 768px).

## 9. Out of Scope / Open Questions

- No backend, contact form submission, or CMS — content is static and hand-authored in HTML.
- Hobbies content to be supplied later (Section 7.5).
- Exact hex values for background/accent color and font choice are implementation details left to the build step, within the ranges given in Section 4.
