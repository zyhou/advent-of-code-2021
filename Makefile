YEAR = 2021
DAY ?= $(shell date +%d)
SHORT_DAY := $(shell echo ${DAY} | awk 'sub(/^0*/, "", $$1)')

help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

run-%: ## Run a day script, ie make run-01
	deno run --config ./deno.jsonc --allow-read ./$*/index.ts

run-%-watch: ## Run a day script, ie make run-01 and watch it
	deno run --config ./deno.jsonc --allow-read --watch ./$*/index.ts

download-input: ## Download the input, DAY=01 make download-input
	mkdir -p ./${DAY}
	curl https://adventofcode.com/${YEAR}/day/${SHORT_DAY}/input --cookie "session=${SESSION}" -o ./${DAY}/input.txt
