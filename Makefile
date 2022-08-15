install:
	npm ci

gendiff:
	gendiff __fixtures__/file1.json __fixtures__/file2.json

lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test