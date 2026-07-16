# Imtithal | امتثال

Saudi fintech compliance readiness platform for AgsPay.

## Core capabilities

- Run 25 JSON-based compliance checks across SAMA, NCA, and PDPL.
- Calculate the compliance readiness score from live check results.
- Display Pass/Fail status, severity, evidence, and remediation actions.
- Filter and inspect compliance controls.
- Upload a company JSON profile and rerun the assessment.
- Generate a printable compliance readiness report.
- Export assessment results as JSON.

## Technology stack

- Frontend: HTML, CSS, JavaScript
- API: FastAPI, Python
- Rules engine: JSON-based deterministic checks
- Data: JSON company profile and compliance rules
- Reporting: Browser print to PDF and JSON export

## Run the platform

Open `frontend/index.html` directly, or serve the folder locally:

```bash
cd frontend
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Backend API

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Project structure

```text
frontend/   Platform interface
backend/    FastAPI service and rules engine
data/       AgsPay profile and compliance rules
docs/       Demo script
```
