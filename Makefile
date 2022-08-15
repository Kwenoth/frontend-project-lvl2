install:
	npm ci

gendiff:
	gendiff __fixtures__/file1.json __fixtures__/file2.json

lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest -- --coverage --coverageProvider=v8