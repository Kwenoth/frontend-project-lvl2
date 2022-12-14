install:
	npm ci

gendiff-json:
	gendiff __fixtures__/file1.json __fixtures__/file2.json

gendiff-yaml:
	gendiff __fixtures__/file1.yml __fixtures__/file2.yaml

stylish:
	gendiff -f stylish __fixtures__/file1.yml __fixtures__/file2.yaml

plain:
	gendiff --format plain __fixtures__/file1.yml __fixtures__/file2.yaml

json:
	gendiff --format json __fixtures__/file1.yml __fixtures__/file2.yaml

lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
