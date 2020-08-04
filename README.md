# rollup-plugin-todolist

Logs all your tagged comments. Reminds you on all your `// TODO:` and `/* FIXME: */` dev notes.

## Install

...

## Build

```bash
npx rollup --config
```

## Dependencies

None at the moment. See `package.json`.

## Usage

Each module gets parsed to an AST by acorn, which is included with rollup. Afterwards the comment
nodes are checked for tags. The regex looks like this:

```js
/^(\s*(TODO|FIXME|WARNING|WARN|NOTE|HACK|BUG|OPTIMIZE|XXX|TEST)\:?)(.*|\s*)$/s
```

## Options

- `output` - `(true|false)` - log to the console?
- `logging` - `<path>` - log to a file
- `filter` - TODO: like error level for logging
- `monochrome` - TODO: use colors on console output

## Test

Using AVA

```bash
npx ava
```

## TODO

- write better and more test cases
- test log file creation when logging to a file
- implement better coloring by using [chalk](https://github.com/chalk/chalk)
- let the user specify the tags
- add more options (output formatting, log file format, ...)
- create github repository
- publish on npm
- improve `README.md`

## License

MIT
