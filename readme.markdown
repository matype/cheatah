# cheatah [![Build Status](https://travis-ci.org/morishitter/cheatah.svg)](https://travis-ci.org/morishitter/cheatah)

More fast and casual CSS styleguide or cheatsheet generator.

Generate styleguide without writing unless comments in your CSS file.

## Installation

```shell
$ npm install -g cheatah
```

## Example

Show help:

```shell
$ cheatah --help
```

```
Usage: cheatah [options]

Options:

  -f, --file          your css file to generate styleguide [required]
  -t, --template      import your template file (.ejs) path
  -s, --style         import your stylesheet path
  -V, --versions      output the version number
  -h, --help          output usage information
```

Generate styleguide:

```
$ cheatah -f your-css-file.css
```

Generated cheatah.html, and

```
$ open cheatah.html
```

## License

The MIT License (MIT)

Copyright (c) 2014 Masaaki Morishita
