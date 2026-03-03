#!/usr/bin/env python3
"""Quick accessibility check for a component.

This script performs basic static analysis to detect common accessibility issues.
For comprehensive checking, use generate_report.py with AI analysis.

Usage:
  check_component.py src/components/ui/button/
  check_component.py src/components/ui/button/index.tsx --verbose
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


def check_file(file_path: Path, verbose: bool = False) -> list[dict]:
    """Check a single file for common accessibility issues.

    Args:
        file_path: Path to file to check
        verbose: Whether to show detailed output

    Returns:
        List of issues found
    """
    issues = []

    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception as e:
        print(f"⚠️  Could not read {file_path}: {e}", file=sys.stderr)
        return issues

    # Check 1: Icon-only buttons without aria-label
    for match in re.finditer(r'<button[^>]*>\s*<\w+Icon', content):
        tag_start = content.rfind('<button', 0, match.end())
        tag_text = content[tag_start:match.end()]
        if 'aria-label' not in tag_text and 'aria-labelledby' not in tag_text:
            issues.append({
                "level": "warning",
                "message": "Icon-only button may need aria-label",
                "file": file_path,
            })

    # Check 2: onClick without onKeyDown for non-button elements
    for match in re.finditer(r'<div[^>]*onClick=[^>]*>', content):
        tag_text = match.group()
        if 'onKeyDown' not in tag_text and ('role=' not in tag_text or 'tabIndex' not in tag_text):
            issues.append({
                "level": "warning",
                "message": "div with onClick should have keyboard support",
                "file": file_path,
            })

    # Check 3: Input without label or aria-label
    for match in re.finditer(r'<input[^>]*>', content):
        tag_text = match.group()
        has_aria = 'aria-label' in tag_text or 'aria-labelledby' in tag_text
        has_id = re.search(r'id=["\']([^"\']+)', tag_text)
        has_label_for = has_id and re.search(
            rf'<label[^>]*htmlFor=["\']{ re.escape(has_id.group(1)) }', content
        ) if has_id else False
        has_wrapping_label = False
        if not (has_aria or has_label_for):
            # en: Check if input is wrapped by <label>
            pos = match.start()
            preceding = content[max(0, pos - 200):pos]
            if '<label' in preceding and '</label>' not in preceding:
                has_wrapping_label = True
        if not (has_aria or has_label_for or has_wrapping_label):
            issues.append({
                "level": "error",
                "message": "Input should have associated label or aria-label",
                "file": file_path,
            })

    # Check 4: Focus styles removed
    if re.search(r':focus\s*\{\s*outline:\s*none', content):
        issues.append({
            "level": "error",
            "message": "Focus outline removed without alternative",
            "file": file_path,
        })

    return issues


def check_component(component_path: Path, verbose: bool = False) -> int:
    """Check a component directory or file.

    Args:
        component_path: Path to component
        verbose: Whether to show detailed output

    Returns:
        Exit code (0 = success, 1 = issues found)
    """
    if component_path.is_file():
        files = [component_path]
    elif component_path.is_dir():
        files = list(component_path.glob("**/*.tsx")) + list(component_path.glob("**/*.ts"))
    else:
        print(f"❌ Path not found: {component_path}", file=sys.stderr)
        return 1

    if not files:
        print(f"⚠️  No TypeScript files found in: {component_path}", file=sys.stderr)
        return 0

    print(f"🔍 Checking {len(files)} file(s) in: {component_path}\n")

    all_issues = []
    for file in files:
        issues = check_file(file, verbose)
        all_issues.extend(issues)

        if verbose and issues:
            print(f"\n📄 {file.relative_to(component_path.parent if component_path.is_dir() else component_path.parent)}:")
            for issue in issues:
                icon = "❌" if issue["level"] == "error" else "⚠️"
                print(f"  {icon} {issue['message']}")

    # Summary
    errors = [i for i in all_issues if i["level"] == "error"]
    warnings = [i for i in all_issues if i["level"] == "warning"]

    print(f"\n📊 Summary:")
    print(f"  Errors: {len(errors)}")
    print(f"  Warnings: {len(warnings)}")

    if not all_issues:
        print("\n✅ No obvious accessibility issues detected")
        print("   Note: This is basic static analysis. Run full review for comprehensive checking.")
        return 0
    else:
        print("\n⚠️  Issues detected. Review findings and run comprehensive accessibility check.")
        print("   Use: python scripts/generate_report.py --component <name>")
        return 1


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Quick accessibility check for a component",
        epilog="""
Examples:
  # Check component directory
  python check_component.py src/components/ui/button/

  # Check specific file
  python check_component.py src/components/ui/button/index.tsx

  # Verbose output
  python check_component.py src/components/ui/button/ --verbose
        """,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )

    parser.add_argument(
        "path",
        type=Path,
        help="Path to component directory or file",
    )

    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Show detailed output",
    )

    args = parser.parse_args()

    return check_component(args.path, args.verbose)


if __name__ == "__main__":
    raise SystemExit(main())
