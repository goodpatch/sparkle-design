.PHONY: release
release: ## Release the project.
	@echo "🤖 Releasing the project..."
	swift build -c release
	cp .build/release/merge-registry ./merge-registry
	@echo "🤖 Project released successfully."

.PHONY: run
run: ## Run the project.
	@echo "🤖 Running the project..."
	swift run
	@echo "🤖 Project ran successfully."

.PHONY: help
.DEFAULT_GOAL := help
help: ## Display this help.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
