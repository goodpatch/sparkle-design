#!/usr/bin/env python3
"""Validate accessibility-checker checklist CSV.

This is a lightweight helper script to sanity-check the checklist file structure.

It intentionally avoids enforcing a strict schema because real checklists vary.
Instead it:
- prints detected headers
- checks presence of a small set of commonly expected columns
- prints basic stats (row count, distinct severities, distinct categories)

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


COMMON_COLUMNS = [
    "id",
    "category",
    "check",
    "how_to_test",
    "severity",
]


def norm(s: str) -> str:
    return "".join(ch.lower() for ch in s.strip() if ch not in " \t\r\n")


def main() -> int:
    here = Path(__file__).resolve()
    default_path = here.parent.parent / "assets" / "checklist.csv"
    path = Path(sys.argv[1]).resolve() if len(sys.argv) >= 2 else default_path

    if not path.exists():
        print(f"❌ Checklist not found: {path}")
        return 1

    with path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames or []
        if not headers:
            print("❌ CSV has no header row")
            return 1

        normalized = {norm(h): h for h in headers}
        missing = [c for c in COMMON_COLUMNS if c not in normalized]

        rows = list(reader)

    print(f"✅ Checklist: {path}")
    print(f"Headers ({len(headers)}): {headers}")
    print(f"Rows: {len(rows)}")

    if missing:
        print("⚠️  Missing common columns (this may be OK if your checklist uses different names):")
        for c in missing:
            print(f"  - {c}")

    def col_values(col_name: str) -> list[str]:
        actual = normalized.get(col_name)
        if not actual:
            return []
        return [r.get(actual, "").strip() for r in rows if r.get(actual, "").strip()]

    severities = col_values("severity")
    categories = col_values("category")

    if severities:
        sev_counts = Counter(severities)
        print("Severity counts:")
        for k, v in sev_counts.most_common():
            print(f"  - {k}: {v}")

    if categories:
        cat_counts = Counter(categories)
        print("Category counts:")
        for k, v in cat_counts.most_common():
            print(f"  - {k}: {v}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
