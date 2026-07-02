import json
from pathlib import Path
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any, Dict, List
from app.rules_engine import run_checks

app = FastAPI(title="Imtithal Compliance API", version="0.1.0")
BASE = Path(__file__).resolve().parents[1]
DATA_DIR = BASE.parent / "data"

class ScanPayload(BaseModel):
    company: Dict[str, Any]
    rules: List[Dict[str, Any]]

@app.get("/")
def root():
    return {"name": "Imtithal", "status": "running", "message": "FinTech compliance readiness MVP"}

@app.get("/sample")
def sample_scan():
    company = json.loads((DATA_DIR / "company_profile.json").read_text(encoding="utf-8"))
    rules = json.loads((DATA_DIR / "compliance_rules.json").read_text(encoding="utf-8"))
    return run_checks(company, rules)

@app.post("/scan")
def scan(payload: ScanPayload):
    return run_checks(payload.company, payload.rules)
