#!/usr/bin/env python3
"""Validate Sparkle Design configuration files.

This script validates the presence and correctness of required configuration
files for Sparkle Design components.

Usage:
  validate_config.py [--path /path/to/project]

Checks:
  - components.json exists and has @sparkle-design registry
  - sparkle.config.json exists (optional but recommended)
  - CSS import structure is correct (checks common locations)
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


REQUIRED_REGISTRY_URL = "https://sparkle-design.vercel.app/r/{name}.json"


def check_components_json(project_path: Path) -> tuple[bool, list[str]]:
    """Check components.json configuration.

    Args:
        project_path: Path to the project directory

    Returns:
        Tuple of (is_valid, list of issues)
    """
    issues: list[str] = []
    components_json = project_path / "components.json"

    if not components_json.exists():
        issues.append("❌ components.json not found")
        return False, issues

    try:
        with components_json.open(encoding="utf-8") as f:
            config: dict[str, Any] = json.load(f)
    except json.JSONDecodeError as e:
        issues.append(f"❌ components.json has invalid JSON: {e}")
        return False, issues
    except Exception as e:
        issues.append(f"❌ Error reading components.json: {e}")
        return False, issues

    # Check for registries field
    if "registries" not in config:
        issues.append("⚠️  'registries' field not found in components.json")
        issues.append(
            "   Add: {\"registries\": {\"@sparkle-design\": "
            f"\"{REQUIRED_REGISTRY_URL}\"}}}}"
        )
        return False, issues

    registries = config["registries"]
    if "@sparkle-design" not in registries:
        issues.append("⚠️  @sparkle-design registry not configured")
        issues.append(
            f"   Add: \"@sparkle-design\": \"{REQUIRED_REGISTRY_URL}\""
        )
        return False, issues

    # Verify registry URL
    registry_url = registries["@sparkle-design"]
    if registry_url != REQUIRED_REGISTRY_URL:
        issues.append(f"⚠️  Incorrect registry URL: {registry_url}")
        issues.append(f"   Expected: {REQUIRED_REGISTRY_URL}")
        return False, issues

    issues.append("✅ components.json is valid")
    return True, issues


def check_sparkle_config(project_path: Path) -> tuple[bool, list[str]]:
    """Check sparkle.config.json configuration.

    Args:
        project_path: Path to the project directory

    Returns:
        Tuple of (exists, list of messages)
    """
    messages: list[str] = []
    sparkle_config = project_path / "sparkle.config.json"

    if not sparkle_config.exists():
        messages.append("ℹ️  sparkle.config.json not found (optional)")
        return False, messages

    try:
        with sparkle_config.open(encoding="utf-8") as f:
            json.load(f)
        messages.append("✅ sparkle.config.json exists and is valid JSON")
        return True, messages
    except json.JSONDecodeError as e:
        messages.append(f"❌ sparkle.config.json has invalid JSON: {e}")
        return False, messages
    except Exception as e:
        messages.append(f"❌ Error reading sparkle.config.json: {e}")
        return False, messages


def find_css_files(project_path: Path, css_pattern: str) -> list[Path]:
    """Find CSS files matching the pattern in common locations.

    Args:
        project_path: Path to the project directory
        css_pattern: CSS filename to search for (e.g., "sparkle-design.css")

    Returns:
        List of matching paths
    """
    common_locations = [
        "src/app",
        "src/styles",
        "src",
        "styles",
        "app",
        "public/styles",
    ]

    matches = []
    for loc in common_locations:
        css_path = project_path / loc / css_pattern
        if css_path.exists():
            matches.append(css_path)

    return matches


def check_css_imports(project_path: Path) -> tuple[bool, list[str]]:
    """Check CSS import structure.

    Args:
        project_path: Path to the project directory

    Returns:
        Tuple of (is_ok, list of messages)
    """
    messages: list[str] = []

    # Check for sparkle-design.css (or similar design system CSS)
    design_css_names = ["sparkle-design.css", "design-system.css", "theme.css"]
    design_css_found = False
    design_css_name = "sparkle-design.css"

    for css_name in design_css_names:
        matches = find_css_files(project_path, css_name)
        if matches:
            design_css_found = True
            design_css_name = css_name
            messages.append(f"✅ Found {css_name} at {matches[0].relative_to(project_path)}")
            break

    if not design_css_found:
        messages.append("⚠️  Design system CSS not found in common locations")
        messages.append("   Expected filenames: sparkle-design.css, design-system.css, or theme.css")
        messages.append("   Generate it with: <pm> dlx sparkle-design-cli")

    # Check for globals.css (or similar main CSS file)
    globals_names = ["globals.css", "global.css", "main.css", "styles.css"]
    globals_found = False

    for globals_name in globals_names:
        matches = find_css_files(project_path, globals_name)
        if matches:
            globals_path = matches[0]
            try:
                content = globals_path.read_text(encoding="utf-8")
                # Check if it imports the design system CSS
                if design_css_name in content or any(name in content for name in design_css_names):
                    messages.append(f"✅ {globals_name} imports design system CSS at {globals_path.relative_to(project_path)}")
                    globals_found = True
                else:
                    messages.append(f"⚠️  {globals_name} found but doesn't import design system CSS")
                    messages.append(f"   Add: @import \"./{design_css_name}\";")
                break
            except Exception as e:
                messages.append(f"⚠️  Error reading {globals_name}: {e}")
                break

    if not globals_found and design_css_found:
        messages.append("⚠️  Main CSS file not found or doesn't import design system CSS")
        messages.append("   Expected filenames: globals.css, global.css, main.css, or styles.css")

    return (design_css_found and globals_found), messages


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Validate Sparkle Design configuration",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Validate current directory
  python validate_config.py

  # Validate specific directory
  python validate_config.py --path /path/to/project
        """,
    )

    parser.add_argument(
        "--path",
        type=Path,
        default=Path.cwd(),
        help="Path to project directory (default: current directory)",
    )

    args = parser.parse_args()

    if not args.path.exists():
        print(f"❌ Error: Directory not found: {args.path}", file=sys.stderr)
        return 1

    if not args.path.is_dir():
        print(f"❌ Error: Not a directory: {args.path}", file=sys.stderr)
        return 1

    print(f"🔍 Validating Sparkle Design configuration in: {args.path}\n")

    # Check components.json
    components_valid, components_issues = check_components_json(args.path)
    for issue in components_issues:
        print(issue)
    print()

    # Check sparkle.config.json
    sparkle_exists, sparkle_messages = check_sparkle_config(args.path)
    for msg in sparkle_messages:
        print(msg)
    print()

    # Check CSS imports
    css_ok, css_messages = check_css_imports(args.path)
    for msg in css_messages:
        print(msg)
    print()

    # Summary
    if components_valid:
        print("✅ Configuration is valid! You can install Sparkle Design components.")
        return 0
    else:
        print("❌ Configuration has issues. Please fix them before installing components.")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
