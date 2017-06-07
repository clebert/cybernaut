DOCS := $(shell ./scripts/lib/find-docs.sh)
EXAMPLE_TESTS := $(shell ./scripts/lib/find-example-tests.sh)
SCRIPTS := $(shell ./scripts/lib/find-scripts.sh)
SOURCES := $(shell ./scripts/lib/find-sources.sh)

################################################################################

.PHONY: all
all: lint-commit docs scripts run-example

.PHONY: build-containers
build-containers: dist
	./scripts/make/.phony/build-containers.sh

.PHONY: lint-commit
lint-commit:
	./scripts/make/.phony/lint-commit.sh

.PHONY: run-example
run-example: build-containers example/dist
	./scripts/make/.phony/run-example.sh

################################################################################

dist: node_modules $(SOURCES) tsconfig.json tslint.json
	./scripts/make/dist.sh && touch dist

docs: $(DOCS)
	./scripts/make/docs.js && touch docs

example/dist: dist $(EXAMPLE_TESTS) example/tsconfig.json
	./scripts/make/example/dist.sh && touch example/dist

node_modules: package.json
	./scripts/make/node_modules.sh && touch node_modules

scripts: $(SCRIPTS)
	./scripts/make/scripts.sh && touch scripts