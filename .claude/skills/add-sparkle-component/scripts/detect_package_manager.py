#!/usr/bin/env python3
"""Detect package manager from lockfiles.

This script detects which package manager is being used in the current
directory by checking for the presence of lockfiles.

Usage:
  detect_package_manager.py [--path /path/to/project]

Output:
  Prints the detected package manager: pnpm, yarn, bun, or npm
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


LOCKFILE_MAP = {
    "pnpm-lock.yaml": "pnpm",
    "yarn.lock": "yarn",
    "bun.lockb": "bun",
    "package-lock.json": "npm",
}


def detect_package_manager(project_path: Path) -> str:
    """Detect package manager from lockfiles in the given path.

    Args:
        project_path: Path to the project directory

    Returns:
        Package manager name: "pnpm", "yarn", "bun", or "npm" (default)
    """
    for lockfile, manager in LOCKFILE_MAP.items():
        if (project_path / lockfile).exists():
            return manager

    # Default to npm if no lockfile found
    return "npm"


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Detect package manager from lockfiles",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Detect in current directory
  python detect_package_manager.py

  # Detect in specific directory
  python detect_package_manager.py --path /path/to/project
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

    manager = detect_package_manager(args.path)
    print(manager)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
