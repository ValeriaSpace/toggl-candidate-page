# Toggl Candidate Guide — Landing Page

A candidate-facing landing page that replaces the [Toggl Candidate Booklet](https://www.notion.so/toggl/c9d9178b1177477e8ca75799607eac6c) Notion page, redesigned in Toggl's brand style (see [toggl.com/jobs](https://toggl.com/jobs/)).

## What's on the page

Seven chapters: who Toggl is, values, how we work (async/remote/results-first), an honest fit check, the hiring process, benefits, and a "before you commit" section covering contract setup (Estonia = employee, elsewhere = contractor/mandatary) and gross vs. net salary expectations.

## Tech

Single self-contained `index.html` — no build step, no dependencies, inline CSS/JS. Interactive elements (values explorer, how-we-work tabs, hiring timeline, contract accordions) are vanilla JS with ARIA states and `prefers-reduced-motion` support.

## Deploying

Any static host works (GitHub Pages, Toggl Labs, etc.). Before production:

- [ ] Add licensed **GT Haptik** and **Inter** `@font-face` declarations (font stacks already list them first; system fallbacks render otherwise)
- [ ] Replace the text wordmark in the nav with the official SVG logo ([brand assets](https://drive.google.com/drive/u/3/folders/1O9uWIVkukjRWuYvWjNyZ4yD1Q7ZhVgIC))
- [ ] Click-check the five public Notion links (Handbook, Interview Guide, Benefits, RAFT, Toggl Story)
- [ ] Review all copy — sourced from the July 2026 booklet PDF
