.PHONY: registry
registry: ## Build the registry.
	@echo "🤖 Running the registry..."
	cd scripts/merge-registry && \
	./merge-registry && \
	cd ../..
	@echo "🤖 Registry ran successfully."
	pnpm build:registry
	@echo "🤖 Registry built successfully."
	cp registry.json ./public/r/registry.json
	cp src/components/sparkle-color.json ./public/r/
	cp src/components/sparkle-font.json ./public/r/
	cp src/components/sparkle-style.json ./public/r/

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
