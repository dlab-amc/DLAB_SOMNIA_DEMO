# SOMNIA UI Demo (GitHub Pages)

Static front-end demo of the SOMNIA core flow with **mock API data**.  
This folder is separate from the runnable platform in `../SOMNIA`.

## What you can try

1. Login (`Fakeuser1` / `Demo1234!`)
2. Submit wizard (details → upload zip → parameters)
3. Watch fake progress on the detail page (~8s to complete)
4. Open the analysis report (PDF viewer)

Or open the seeded completed submit `SDEMO0001` from **Submit List** and jump straight to the report.

## Local

```bash
cd SOMNIA_ui_demo
npm install
npm start
```

Open http://localhost:3000

## Build for GitHub Pages (project site `/SOMNIA_DEMO_TEST`)

```bash
npm run build
```

Deploy the `build/` folder to GitHub Pages (or push this folder as its own repo / `gh-pages` branch).

Repo: https://github.com/ydon1111/SOMNIA_DEMO_TEST

With HashRouter, URLs look like:

`https://ydon1111.github.io/SOMNIA_DEMO_TEST/#/login`

## Notes

- No FastAPI / Mongo / Redis / worker — evaluation is simulated.
- The production Code Availability stack remains in `../SOMNIA` (Docker Compose).
