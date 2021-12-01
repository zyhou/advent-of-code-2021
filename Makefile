help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

run-%: ## Run a day script, ie make run-01
	deno run --config ./deno.jsonc --allow-read ./$*/index.ts

run-%-watch: ## Run a day script, ie make run-01 and watch it
	deno run --config ./deno.jsonc --allow-read --watch ./$*/index.ts
