.PHONY: registry
registry: ## Build the registry.
	@echo "🤖 Running the registry..."
	@if command -v swift >/dev/null 2>&1; then \
		echo "🤖 Using Swift merge-registry tool..."; \
		cd scripts/merge-registry && \
		./merge-registry && \
		cd ../..; \
	else \
		echo "🤖 Swift not available, using Node.js fallback..."; \
		node scripts/merge-registry.mjs; \
	fi
	@echo "🤖 Registry ran successfully."
	pnpm build:registry
	@echo "🤖 Registry built successfully."
	cp registry.json ./public/r/registry.json
	cp src/components/sparkle-color.json ./public/r/
	cp src/components/sparkle-font.json ./public/r/
	cp src/components/sparkle-style.json ./public/r/
	pnpm lint:fix
	pnpm format

.PHONY: new-component
new-component: ## Create a new component.
	@echo "🤖 Creating a new component..."
	@read -p "Enter the name of the new component: " name; \
	if [ -z "$$name" ]; then \
		echo "🤖 No name provided. Exiting."; \
		exit 1; \
	fi; \
	./scripts/setup.sh "$$name";
	@echo "🤖 Component created successfully."

.PHONY: help
.DEFAULT_GOAL := help
help: ## Display this help.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
