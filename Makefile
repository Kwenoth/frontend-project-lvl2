install:
	npm ci

gendiff:
	gendiff __fixtures__/file1.json __fixtures__/file2.json

lint:
	npx eslint .

test:
	npx jest --coverage