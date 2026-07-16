import json
from pathlib import Path
from typing import Any, Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.rules_engine import run_checks

app = FastAPI(title="Imtithal Compliance API", version="0.2.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = PROJECT_ROOT / "data"


class ScanPayload(BaseModel):
    company: Dict[str, Any]
    rules: List[Dict[str, Any]]


@app.get("/")
def root() -> Dict[str, str]:
    return {
        "name": "Imtithal",
        "status": "running",
        "message": "FinTech compliance readiness platform",
    }


@app.get("/sample")
def sample_scan() -> Dict[str, Any]:
    company = json.loads((DATA_DIR / "company_profile.json").read_text(encoding="utf-8"))
    rules = json.loads((DATA_DIR / "compliance_rules.json").read_text(encoding="utf-8"))
    return run_checks(company, rules)


@app.post("/scan")
def scan(payload: ScanPayload) -> Dict[str, Any]:
    return run_checks(payload.company, payload.rules)
