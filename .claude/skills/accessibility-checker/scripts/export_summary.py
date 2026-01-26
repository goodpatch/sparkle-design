#!/usr/bin/env python3
"""Export accessibility review summary for README updates.

This script helps generate summary statistics for README status updates.

Usage:
  export_summary.py --reports reports/*.md
  export_summary.py --reports reports/ --format markdown
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


def parse_report(report_path: Path) -> dict:
    """Parse a report file to extract summary statistics.

    Args:
        report_path: Path to report markdown file

    Returns:
        Dictionary with report statistics
    """
    try:
        content = report_path.read_text(encoding="utf-8")
    except Exception as e:
        print(f"⚠️  Could not read {report_path}: {e}", file=sys.stderr)
        return {}

    # Extract component name from title or filename
    title_match = re.search(r'#\s*(?:Accessibility Review|A11y Status Update):\s*(.+)', content)
    component = title_match.group(1).strip() if title_match else report_path.stem

    # Extract summary statistics
    summary = {"component": component, "pass": 0, "fail": 0, "na": 0, "needs_review": 0}

    # Look for summary table
    summary_match = re.search(r'\|\s*\*\*Pass\*\*\s*\|\s*(\d+)', content)
    if summary_match:
        summary["pass"] = int(summary_match.group(1))

    fail_match = re.search(r'\|\s*\*\*Fail\*\*\s*\|\s*(\d+)', content)
    if fail_match:
        summary["fail"] = int(fail_match.group(1))

    na_match = re.search(r'\|\s*\*\*N/A\*\*\s*\|\s*(\d+)', content)
    if na_match:
        summary["na"] = int(na_match.group(1))

    needs_review_match = re.search(r'\|\s*\*\*Needs Review\*\*\s*\|\s*(\d+)', content)
    if needs_review_match:
        summary["needs_review"] = int(needs_review_match.group(1))

    return summary


def format_markdown(summaries: list[dict]) -> str:
    """Format summaries as markdown table.

    Args:
        summaries: List of summary dictionaries

    Returns:
        Formatted markdown string
    """
    lines = [
        "# Accessibility Status Summary\n",
        "| Component | Pass | Fail | N/A | Needs Review | Status |",
        "|-----------|------|------|-----|--------------|--------|",
    ]

    for summary in summaries:
        status = "✅" if summary["fail"] == 0 else "❌"
        lines.append(
            f"| {summary['component']} | {summary['pass']} | {summary['fail']} | "
            f"{summary['na']} | {summary['needs_review']} | {status} |"
        )

    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Export accessibility review summary",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Export from reports directory
  python export_summary.py --reports reports/

  # Export specific reports
  python export_summary.py --reports reports/button.md reports/input.md

  # Output to file
  python export_summary.py --reports reports/ --output summary.md
        """,
    )

    parser.add_argument(
        "--reports",
        type=Path,
        nargs="+",
        required=True,
        help="Report files or directory containing reports",
    )

    parser.add_argument(
        "--format",
        choices=["markdown", "json"],
        default="markdown",
        help="Output format (default: markdown)",
    )

    parser.add_argument(
        "--output",
        type=Path,
        help="Output file (default: stdout)",
    )

    args = parser.parse_args()

    # Collect report files
    report_files = []
    for path in args.reports:
        if path.is_dir():
            report_files.extend(path.glob("*.md"))
        elif path.is_file():
            report_files.append(path)

    if not report_files:
        print("❌ No report files found", file=sys.stderr)
        return 1

    print(f"📊 Processing {len(report_files)} report(s)...\n", file=sys.stderr)

    # Parse reports
    summaries = []
    for report_file in report_files:
        summary = parse_report(report_file)
        if summary:
            summaries.append(summary)

    if not summaries:
        print("⚠️  No valid summaries extracted", file=sys.stderr)
        return 1

    # Format output
    if args.format == "markdown":
        output = format_markdown(summaries)
    else:  # json
        import json
        output = json.dumps(summaries, indent=2)

    # Write output
    if args.output:
        args.output.write_text(output, encoding="utf-8")
        print(f"✅ Summary exported to: {args.output}", file=sys.stderr)
    else:
        print(output)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
