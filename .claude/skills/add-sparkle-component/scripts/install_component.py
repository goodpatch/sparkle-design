#!/usr/bin/env python3
"""Install Sparkle Design components automatically.

This script automates the installation of Sparkle Design components by:
1. Detecting the package manager
2. Validating configuration
3. Running the shadcn CLI to install the component

Usage:
  install_component.py <component-name> [--path /path/to/project]

Examples:
  install_component.py button
  install_component.py card --path /path/to/project
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path


def detect_package_manager(project_path: Path) -> str:
    """Detect package manager from lockfiles.

    Args:
        project_path: Path to the project directory

    Returns:
        Package manager name: "pnpm", "yarn", "bun", or "npm"
    """
    lockfile_map = {
        "pnpm-lock.yaml": "pnpm",
        "yarn.lock": "yarn",
        "bun.lockb": "bun",
        "package-lock.json": "npm",
    }

    for lockfile, manager in lockfile_map.items():
        if (project_path / lockfile).exists():
            return manager

    return "npm"


def validate_components_json(project_path: Path) -> tuple[bool, str]:
    """Validate components.json configuration.

    Args:
        project_path: Path to the project directory

    Returns:
        Tuple of (is_valid, error_message)
    """
    components_json = project_path / "components.json"

    if not components_json.exists():
        return False, "components.json not found"

    try:
        with components_json.open(encoding="utf-8") as f:
            config = json.load(f)
    except json.JSONDecodeError as e:
        return False, f"Invalid JSON in components.json: {e}"
    except Exception as e:
        return False, f"Error reading components.json: {e}"

    if "registries" not in config:
        return False, "'registries' field not found in components.json"

    if "@sparkle-design" not in config["registries"]:
        return False, "@sparkle-design registry not configured in components.json"

    return True, ""


def get_component_path(project_path: Path, component_name: str) -> str:
    """Get the installation path for components from components.json.

    Args:
        project_path: Path to the project directory
        component_name: Name of the component

    Returns:
        Relative path where components are installed
    """
    components_json = project_path / "components.json"
    default_path = "src/components/ui"

    if not components_json.exists():
        return f"{default_path}/{component_name}/"

    try:
        with components_json.open(encoding="utf-8") as f:
            config = json.load(f)

        # Get aliases.ui path, fallback to default
        aliases = config.get("aliases", {})
        ui_alias = aliases.get("ui", default_path)

        # Remove @ prefix if present (e.g., @/components/ui -> components/ui)
        ui_path = ui_alias.lstrip("@/")

        return f"{ui_path}/{component_name}/"
    except Exception:
        return f"{default_path}/{component_name}/"


def get_package_manager_command(manager: str) -> list[str]:
    """Get the appropriate command for the package manager.

    Args:
        manager: Package manager name

    Returns:
        List of command parts
    """
    if manager == "pnpm":
        return ["pnpm", "dlx"]
    elif manager == "yarn":
        return ["yarn", "dlx"]
    elif manager == "bun":
        return ["bunx"]
    else:  # npm
        return ["npx"]


def install_component(
    component_name: str,
    project_path: Path,
    package_manager: str,
) -> tuple[bool, str]:
    """Install a Sparkle Design component.

    Args:
        component_name: Name of the component to install
        project_path: Path to the project directory
        package_manager: Package manager to use

    Returns:
        Tuple of (success, output_message)
    """
    pm_command = get_package_manager_command(package_manager)
    full_command = pm_command + [
        "shadcn@latest",
        "add",
        f"@sparkle-design/{component_name}",
    ]

    print(f"🚀 Installing component: {component_name}")
    print(f"📦 Using package manager: {package_manager}")
    print(f"⚙️  Running: {' '.join(full_command)}\n")

    try:
        result = subprocess.run(
            full_command,
            cwd=project_path,
            capture_output=True,
            text=True,
            check=True,
        )

        output = result.stdout + result.stderr
        return True, output

    except subprocess.CalledProcessError as e:
        error_msg = f"Command failed with exit code {e.returncode}\n"
        error_msg += f"stdout: {e.stdout}\n"
        error_msg += f"stderr: {e.stderr}"
        return False, error_msg

    except FileNotFoundError:
        error_msg = f"Command not found: {pm_command[0]}\n"
        error_msg += f"Please install {package_manager} first."
        return False, error_msg

    except Exception as e:
        return False, f"Unexpected error: {e}"


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Install Sparkle Design components automatically",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Install button component in current directory
  python install_component.py button

  # Install card component in specific directory
  python install_component.py card --path /path/to/project

  # Install input component with custom package manager
  python install_component.py input --pm yarn
        """,
    )

    parser.add_argument(
        "component",
        help="Component name to install (e.g., button, card, input)",
    )

    parser.add_argument(
        "--path",
        type=Path,
        default=Path.cwd(),
        help="Path to project directory (default: current directory)",
    )

    parser.add_argument(
        "--pm",
        choices=["pnpm", "yarn", "bun", "npm"],
        help="Package manager to use (default: auto-detect)",
    )

    args = parser.parse_args()

    # Validate project path
    if not args.path.exists():
        print(f"❌ Error: Directory not found: {args.path}", file=sys.stderr)
        return 1

    if not args.path.is_dir():
        print(f"❌ Error: Not a directory: {args.path}", file=sys.stderr)
        return 1

    print(f"📂 Project path: {args.path}\n")

    # Detect or use specified package manager
    if args.pm:
        package_manager = args.pm
        print(f"📦 Using specified package manager: {package_manager}\n")
    else:
        package_manager = detect_package_manager(args.path)
        print(f"🔍 Detected package manager: {package_manager}\n")

    # Validate configuration
    print("🔍 Validating configuration...")
    is_valid, error_msg = validate_components_json(args.path)

    if not is_valid:
        print(f"❌ Configuration error: {error_msg}\n", file=sys.stderr)
        print("💡 Tip: Make sure components.json has the @sparkle-design registry configured:")
        print('   "registries": {')
        print('     "@sparkle-design": "https://sparkle-design.vercel.app/r/{name}.json"')
        print("   }")
        return 1

    print("✅ Configuration is valid\n")

    # Install component
    success, output = install_component(
        args.component,
        args.path,
        package_manager,
    )

    # Print output
    if output.strip():
        print("\n📄 Command output:")
        print(output)

    # Print result
    if success:
        component_path = get_component_path(args.path, args.component)
        # Get import path from components.json aliases or default
        components_json = args.path / "components.json"
        import_alias = "@/components/ui"
        try:
            with components_json.open(encoding="utf-8") as f:
                config = json.load(f)
                import_alias = config.get("aliases", {}).get("ui", "@/components/ui")
        except Exception:
            pass

        print(f"\n✅ Successfully installed: {args.component}")
        print(f"\n📍 Component location: {component_path}")
        print("\n💡 Next steps:")
        print(f"   1. Import: import {{ ComponentName }} from '{import_alias}/{args.component}'")
        print("   2. Check if CSS imports are configured (first time only)")
        print("   3. Run type checking: <pm> lint")
        print("   4. View in Storybook: <pm> storybook")
        return 0
    else:
        print(f"\n❌ Failed to install: {args.component}")
        print(f"\n📄 Error details:\n{output}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
