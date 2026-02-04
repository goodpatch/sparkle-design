#!/usr/bin/env python3
"""Validate accessibility-checker checklist CSV.

This is a lightweight helper script to sanity-check the checklist file structure.

It intentionally avoids enforcing a strict schema because real checklists vary.
Instead it:
- prints detected headers
- detects a best-effort column mapping (JP/EN)
- warns if important columns are missing
- prints basic stats (row count and some distributions)

Usage:
  validate_checklist_csv.py [path/to/checklist.csv]

Default:
  ./assets/checklist.csv
"""

from __future__ import annotations

import csv
import sys
from collections import Counter
from pathlib import Path


# In this repo, the checklist uses Japanese headers. We still support common
# English-like schemas to keep the script reusable.
JP_COLUMNS = {
    "達成基準": "id",
    "項目": "category",
    "レベル": "level",
    "確認ポイント": "check",
    "単体チェック可否": "unit_check",
    "Reactでの実装例": "react_example",
    "デザインチェック可否": "design_check",
    # Prefer a generic header name. Keep the old one for backward compatibility.
    "備考": "notes",
    "maddyさんチェックリスト": "notes",
}

EN_SYNONYMS = {
    "id": ["id", "sc", "successcriterion", "criterion"],
    "category": ["category", "area", "topic"],
    "level": ["level", "wcaglevel"],
    "check": ["check", "title", "item", "description", "expected"],
    "how_to_test": ["howtotest", "test", "steps"],
    "severity": ["severity", "priority"],
    "notes": ["notes", "note", "memo"],
}

REQUIRED_CANONICAL = ["id", "category", "check"]


def norm(s: str) -> str:
    return "".join(ch.lower() for ch in s.strip() if ch not in " \t\r\n")


def build_mapping(headers: list[str]) -> dict[str, str]:
    """Return mapping from canonical field -> actual header name."""
    header_by_norm = {norm(h): h for h in headers}
    mapping: dict[str, str] = {}

    # Prefer known JP headers when present.
    for jp_header, canonical in JP_COLUMNS.items():
        actual = header_by_norm.get(norm(jp_header))
        if actual:
            # Don't override an already-mapped canonical column.
            # Example: prefer "備考" over legacy "maddyさんチェックリスト" if both exist.
            if canonical not in mapping:
                mapping[canonical] = actual

    # Fill remaining via English-ish synonyms.
    for canonical, candidates in EN_SYNONYMS.items():
        if canonical in mapping:
            continue
        for cand in candidates:
            actual = header_by_norm.get(norm(cand))
            if actual:
                mapping[canonical] = actual
                break

    return mapping


def main() -> int:
    here = Path(__file__).resolve()
    default_path = here.parent.parent / "assets" / "checklist.csv"
    path = Path(sys.argv[1]).resolve() if len(sys.argv) >= 2 else default_path

    if not path.exists():
        print(f"❌ Checklist not found: {path}")
        return 1

    try:
        with path.open(newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            headers = reader.fieldnames or []
            if not headers:
                print("❌ CSV has no header row")
                return 1

            mapping = build_mapping(headers)
            missing_required = [c for c in REQUIRED_CANONICAL if c not in mapping]

            rows = list(reader)
    except UnicodeDecodeError as e:
        print(f"❌ Encoding error reading CSV: {e}")
        return 1
    except csv.Error as e:
        print(f"❌ CSV parsing error: {e}")
        return 1

    print(f"✅ Checklist: {path}")
    print(f"Headers ({len(headers)}): {headers}")
    print(f"Rows: {len(rows)}")

    if mapping:
        print("Detected column mapping (canonical → header):")
        for k in sorted(mapping.keys()):
            print(f"  - {k} → {mapping[k]}")

    if missing_required:
        print("⚠️  Missing required columns (cannot reliably interpret rows):")
        for c in missing_required:
            print(f"  - {c}")
        # Non-zero exit so CI can detect invalid CSV shape.
        return 2

    def col_values(canonical: str) -> list[str]:
        actual = mapping.get(canonical)
        if not actual:
            return []
        return [r.get(actual, "").strip() for r in rows if r.get(actual, "").strip()]

    categories = col_values("category")
    levels = col_values("level")
    unit_checks = col_values("unit_check")
    design_checks = col_values("design_check")
    severities = col_values("severity")

    if categories:
        cat_counts = Counter(categories)
        print("Category counts:")
        for k, v in cat_counts.most_common():
            print(f"  - {k}: {v}")

    if levels:
        level_counts = Counter(levels)
        print("Level counts:")
        for k, v in level_counts.most_common():
            print(f"  - {k}: {v}")

    if unit_checks:
        uc_counts = Counter(unit_checks)
        print("Unit-check feasibility counts:")
        for k, v in uc_counts.most_common():
            print(f"  - {k}: {v}")

    if design_checks:
        dc_counts = Counter(design_checks)
        print("Design-check feasibility counts:")
        for k, v in dc_counts.most_common():
            print(f"  - {k}: {v}")

    if severities:
        sev_counts = Counter(severities)
        print("Severity counts:")
        for k, v in sev_counts.most_common():
            print(f"  - {k}: {v}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
