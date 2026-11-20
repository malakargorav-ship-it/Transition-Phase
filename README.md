# Transition Phase

A static, responsive preparation platform for Assam Police Constable and Sub Inspector aspirants.

## Brand and stack
- Premium charcoal, gold and cream visual identity
- Syne headings and Manrope interface/body typography
- HTML, CSS and vanilla JavaScript
- No Node.js, package installation, paid backend or build step required
- Hosted as a static site on Cloudflare Pages from the GitHub `main` branch

## Available modules
- Responsive landing page and subject navigation
- Separate Constable and SI full-syllabus checklists
- Number System: 6 lessons
- Mathematics: 17 lessons
- General English: 14 lessons
- Reasoning and Mental Ability: 22 lessons
- 59 lesson topics across those four learning areas
- 1,466 topic MCQs with four options, answer keys and explanations
- Concept notes, worked examples and quick-revision points
- Lesson quiz scoring, answer feedback and retry
- Preparation Command Centre with exam-track selector, daily topic practice, adaptive Number System stages, score history, revision queue and JSON export
- Local progress persistence in browser storage

## Progress and privacy limitations
- Progress is stored in the current browser/device using `localStorage`; it does not sync across devices or browsers.
- Use the Command Centre's export option to download a local JSON backup.
- Clearing browser site data can erase locally stored progress.
- There are no user accounts, cloud database, paid API or live AI tutor in this static version.
- Current Affairs, General Knowledge and Assam GK lesson content are intentionally not built yet; their subject outlines remain visible. The detailed syllabus checklist includes these exam areas.

## Content and exam accuracy
- Lesson topics and question banks are preparation material, not official topic-wise weightage.
- The syllabus checklist is organised from the topic outline supplied for this project.
- Verify exam patterns and updates against the latest Assam SLPRB notification before relying on dates, marks or negative-marking rules.

## Deployment
- Repository: `malakargorav-ship-it/Transition-Phase`
- Branch: `main`
- Cloudflare Pages project: `transition-phase`
- Build command: blank
- Output directory: `.`
- Each GitHub commit to `main` triggers the connected Cloudflare Pages deployment.

## Local preview
Open `index.html` directly in a modern browser. No local build tooling is required.
