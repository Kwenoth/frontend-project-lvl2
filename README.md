### Hexlet tests and linter status:
[![Actions Status](https://github.com/Kwenoth/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Kwenoth/frontend-project-lvl2/actions)

### Maintainability, linting and test coverage:
<a href="https://codeclimate.com/github/Kwenoth/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/477173fd1733828fea1d/maintainability" /></a> <a href="https://codeclimate.com/github/Kwenoth/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/477173fd1733828fea1d/test_coverage" /></a> [![test-and-lint](https://github.com/Kwenoth/frontend-project-lvl2/actions/workflows/test-and-lint.yml/badge.svg)](https://github.com/Kwenoth/frontend-project-lvl2/actions/workflows/test-and-lint.yml)

### Difference calculator

The difference calculator allows you to compare two JSON and/or YAML files for added, deleted or changed properties. You can get the output in one of three convenient text formats:

"stylish" - output as a tree with the recursive structure preserved. Added, removed properties are indicated with "+", "-" signs before the key name. If the property is present in the first file, but absent in the second, it will be marked with "-". Conversely, if the property is not present in the first file, it will be marked with a "+" sign.  If the value of the key has been changed, but the key is still present in both files, then the property with the value from the first file will be marked "-" first, then the property with the value from the second file will be marked "+";

"plain" - output as a text description of the changes with the path of each changed property;

"json" - output in the form of a json string for use in other applications.

By default, the output is in the "stylish" format.

## Install

You can use this package as a command line utility or as a separate library.

To use as a CLI, clone the repository locally and:

```sh
make install
```

If you want to use as a library, clone the repository locally and export the "genDiff" function from the index.js into your application.

## Using

### As a CLI:

Run "gendiff [options] filepath1 filepath2" in the console, where filepath1 and filepath2 are the paths to the files being compared. Optionally, you can specify the output format of the comparison result: "stylish", "plain" or "json". The format is specified with the -f or --format flags.

As an example with output in "plain" format:

```sh
gendiff --format plain __fixtures__/file1.json __fixtures__/file2.json
```

### As a plugin library:

Call the "genDiff" function, passing three arguments: filepath1, filepath2, and the output format.

As an example with output in "plain" format:

```sh
gendiff(__fixtures__/file1.json, __fixtures__/file2.json, 'plain').
```

Below you can find short videos with a demonstration of how it works.

<a href="https://asciinema.org/a/514628" target="_blank">Comparison of two flat JSON files<img src="https://asciinema.org/a/514628.svg" /></a>

<a href="https://asciinema.org/a/515235" target="_blank">Comparison of two flat YAML files<img src="https://asciinema.org/a/515235.svg" /></a>

<a href="https://asciinema.org/a/516195" target="_blank">Comparing JSON (YAML) files with recursive structure<img src="https://asciinema.org/a/516195.svg" /></a>

<a href="https://asciinema.org/a/516873" target="_blank">Comparison of two files with output of the result in plain format<img src="https://asciinema.org/a/516873.svg" /></a>

<a href="https://asciinema.org/a/516905" target="_blank">Comparison of two files with output of the result in json format<img src="https://asciinema.org/a/516905.svg" /></a>
