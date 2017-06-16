.PHONY: all
all: lint-commit-message e2e-tests docs

.PHONY: lint-commit-message
lint-commit-message:
	./scripts/make/phony-targets/lint-commit-message.sh

.PHONY: true
true: # CI=true

################################################################################

node_modules: $(shell ./scripts/make/dependencies/find-node-modules.sh) $(CI)
	./scripts/make/targets/node-modules.sh && touch node_modules

scripts: node_modules $(shell ./scripts/make/dependencies/find-scripts.sh) $(CI)
	./scripts/make/targets/scripts.sh && touch scripts

dist: scripts $(shell ./scripts/make/dependencies/find-dist.sh) $(CI)
	./scripts/make/targets/dist.sh && touch dist

e2e-tests: dist $(shell ./scripts/make/dependencies/find-e2e-tests.sh) $(CI)
	./scripts/make/targets/e2e-tests.sh && touch e2e-tests

examples: dist $(shell ./scripts/make/dependencies/find-examples.sh) $(CI)
	./scripts/make/targets/examples.sh && touch examples

docs: examples $(shell ./scripts/make/dependencies/find-docs.sh) $(CI)
	./scripts/make/targets/docs.sh && touch docs
