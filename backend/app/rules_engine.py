from typing import Any, Dict, List


def evaluate_rule(env: Dict[str, Any], rule: Dict[str, Any]) -> Dict[str, Any]:
    field = rule.get("field")
    actual = env.get(field)
    expected = rule.get("expected")
    operator = rule.get("operator", "==")

    if operator == ">=":
        try:
            passed = float(actual) >= float(expected)
        except Exception:
            passed = False
    else:
        passed = actual == expected

    return {**rule, "actual": actual, "passed": passed}


def run_checks(company: Dict[str, Any], rules: List[Dict[str, Any]]) -> Dict[str, Any]:
    env = company.get("technical_environment", {})
    results = [evaluate_rule(env, rule) for rule in rules]
    total = len(results)
    passed = sum(1 for r in results if r["passed"])
    failed = total - passed
    high_priority = sum(1 for r in results if not r["passed"] and r.get("severity") == "High")
    score = round((passed / total) * 100) if total else 0

    return {
        "company_name": company.get("company_name"),
        "score": score,
        "total": total,
        "passed": passed,
        "failed": failed,
        "high_priority": high_priority,
        "results": results,
        "findings": [r for r in results if not r["passed"]],
    }
