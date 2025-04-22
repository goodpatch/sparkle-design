.PHONY: registry
registry: ## Build the registry.
	@echo "🤖 Running the registry..."
	cd scripts/merge-registry && \
	./merge-registry && \
	cd ../..
	@echo "🤖 Registry ran successfully."
	npm run build:registry
	@echo "🤖 Registry built successfully."

.PHONY: help
.DEFAULT_GOAL := help
help: ## Display this help.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
