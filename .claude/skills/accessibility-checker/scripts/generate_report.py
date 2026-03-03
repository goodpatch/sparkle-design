#!/usr/bin/env python3
"""Generate accessibility report from checklist CSV.

This script generates a structured accessibility report by:
1. Reading the checklist CSV (Japanese headers supported)
2. Loading a template
3. Generating report structure

Note: The actual checking logic should be performed by AI,
as it requires code understanding and context. This script
provides the structure and checklist items.

Usage:
  generate_report.py --checklist checklist.csv --output report.md
  generate_report.py --component button --output button-report.md
"""

from __future__ import annotations

import argparse
import csv
import sys
from datetime import datetime
from pathlib import Path
from typing import Any


# Japanese header mappings from checklist.csv
JAPANESE_HEADERS = {
    "達成基準": "id",
    "項目": "category",
    "レベル": "level",
    "確認ポイント": "check",
    "単体チェック可否": "scope",
    "Reactでの実装例": "implementation",
    "デザインチェック可否": "design_check",
    "備考": "notes",
}


def read_checklist(csv_path: Path) -> list[dict[str, Any]]:
    """Read and parse checklist CSV with Japanese headers.

    Args:
        csv_path: Path to checklist CSV file

    Returns:
        List of checklist items as dictionaries
    """
    items: list[dict[str, Any]] = []

    try:
        with csv_path.open(encoding="utf-8") as f:
            reader = csv.DictReader(f)
            headers = reader.fieldnames or []

            # Map Japanese headers to English keys
            header_map = {}
            for header in headers:
                if header in JAPANESE_HEADERS:
                    header_map[header] = JAPANESE_HEADERS[header]
                else:
                    header_map[header] = header

            for row in reader:
                # Convert row with English keys
                item = {}
                for jp_header, value in row.items():
                    eng_key = header_map.get(jp_header, jp_header)
                    item[eng_key] = value.strip() if value else ""

                items.append(item)

    except FileNotFoundError:
        print(f"❌ Error: Checklist not found: {csv_path}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error reading checklist: {e}", file=sys.stderr)
        sys.exit(1)

    return items


def filter_component_items(items: list[dict[str, Any]], component: str | None) -> list[dict[str, Any]]:
    """Filter checklist items applicable to a specific component.

    Args:
        items: All checklist items
        component: Component name to filter for (None = all items)

    Returns:
        Filtered list of checklist items
    """
    if not component:
        return items

    component_lower = component.lower()
    filtered = [
        item for item in items
        if component_lower in item.get("component", "").lower()
        or component_lower in item.get("name", "").lower()
    ]

    return filtered if filtered else items


def generate_report(
    checklist_items: list[dict[str, Any]],
    template_path: Path | None,
    component: str | None,
) -> str:
    """Generate accessibility report from checklist items.

    Args:
        checklist_items: List of checklist items
        template_path: Path to template file (None = use default)
        component: Component name (None = general report)

    Returns:
        Generated report as string
    """
    # Load template if provided
    if template_path and template_path.exists():
        template = template_path.read_text(encoding="utf-8")
    else:
        # Use default template
        template = """# Accessibility Review{component_title}

**Date**: {date}
**Reviewer**: AI Assistant
**Scope**: {scope}

---

## Summary

| Metric | Count |
|--------|-------|
| **Total Checks** | {total_checks} |

**Note**: This is a template report. Actual Pass/Fail/NA/Needs Review
determinations require AI analysis of the code and context.

---

## Checklist Items

{checklist_table}

---

## Instructions for Review

For each checklist item above:

1. **Determine applicability**: Is this relevant to the component/scope?
2. **Check implementation**: Review code, tests, stories
3. **Record result**: Pass / Fail / N/A / Needs Review
4. **Capture evidence**: File paths, line numbers, reproduction steps
5. **Recommend fixes**: If Fail, provide specific code changes

Use the template in `templates/component-report.md` for detailed findings.

---

## Next Steps

1. Review each checklist item
2. Update results in this report
3. Add evidence and fixes
4. Generate action items
5. Submit for review

"""

    # Prepare template variables
    component_title = f": {component}" if component else ""
    scope = component if component else "General accessibility review"
    date = datetime.now().strftime("%Y-%m-%d")
    total_checks = len(checklist_items)

    # Generate checklist table
    table_rows = ["| ID | Category | Level | Check | Result | Evidence | Fix |",
                  "|---:|----------|-------|-------|--------|----------|-----|"]

    for item in checklist_items:
        id_val = item.get("id", "")
        category = item.get("category", "")
        level = item.get("level", "")
        check = item.get("check", "")

        # Truncate check text for table
        check_short = (check[:60] + "...") if len(check) > 60 else check

        table_rows.append(
            f"| {id_val} | {category} | {level} | {check_short} | - | - | - |"
        )

    checklist_table = "\n".join(table_rows)

    # Fill template
    report = template.format(
        component_title=component_title,
        date=date,
        scope=scope,
        total_checks=total_checks,
        checklist_table=checklist_table,
    )

    return report


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Generate accessibility report from checklist",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Generate full report
  python generate_report.py --checklist assets/checklist.csv

  # Generate component-specific report
  python generate_report.py --component button --output reports/button.md

  # Use custom template
  python generate_report.py --template templates/component-report.md
        """,
    )

    parser.add_argument(
        "--checklist",
        type=Path,
        default=Path(__file__).parent.parent / "assets" / "checklist.csv",
        help="Path to checklist CSV (default: assets/checklist.csv)",
    )

    parser.add_argument(
        "--component",
        type=str,
        help="Component name to focus on (e.g., button, input)",
    )

    parser.add_argument(
        "--template",
        type=Path,
        help="Path to report template (optional)",
    )

    parser.add_argument(
        "--output",
        type=Path,
        help="Output file path (default: stdout)",
    )

    args = parser.parse_args()

    # Read checklist
    print(f"📋 Reading checklist: {args.checklist}", file=sys.stderr)
    items = read_checklist(args.checklist)
    print(f"✅ Loaded {len(items)} checklist items", file=sys.stderr)

    # Filter for component if specified
    if args.component:
        items = filter_component_items(items, args.component)
        print(f"🔍 Filtered to {len(items)} items for component: {args.component}", file=sys.stderr)

    # Generate report
    print("📝 Generating report...", file=sys.stderr)
    report = generate_report(items, args.template, args.component)

    # Output report
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(report, encoding="utf-8")
        print(f"✅ Report saved to: {args.output}", file=sys.stderr)
    else:
        print(report)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
