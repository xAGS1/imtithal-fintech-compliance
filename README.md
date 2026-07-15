# امتثال | Imtithal

Interactive MVP for Saudi fintech compliance readiness.

## What the MVP demonstrates

- Loads a fintech company profile from JSON.
- Runs 25 deterministic JSON-based compliance checks.
- Produces Pass/Fail results, severity, evidence status, and remediation.
- Calculates a preliminary readiness score.
- Shows detected gaps and AI-assisted explanations.
- Generates an audit-readiness summary and downloadable scan results.

> The included company profile is **Mock Data** for hackathon demonstration only. The MVP is not a certification tool and does not provide legal or regulatory approval.

## Default demo result

- 25 total checks
- 21 passed
- 4 gaps
- 3 high-priority gaps
- 84% preliminary readiness score

## Technology stack

- Frontend: HTML, CSS, JavaScript (static and Vercel-ready)
- Rules layer: JSON Rules Engine
- Optional backend: FastAPI / Python
- Data: JSON
- Reporting: browser Print-to-PDF + TXT/JSON exports
- Planned AI layer: LLM/OpenAI API for explanation and remediation summaries

## Run locally

Open `frontend/index.html`, or run a local static server:

```bash
cd frontend
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy to Vercel

Set the Vercel **Root Directory** to `frontend`, use **Framework Preset: Other**, and leave the build command empty.

## Project structure

```text
frontend/   Interactive MVP
backend/    Optional FastAPI proof of concept
data/       Company profile and compliance rules
assets/     Logo
```
