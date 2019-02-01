# eslint-plugin-putout

[ESLint](https://eslint.org) plagin for putout.

## Installation

```
$ npm i eslint eslint-plugin-putout -D
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-putout` globally.

## Usage

Add `putout` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "putout"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "putout/one-line-destructuring": "error"
    }
}
```

## Supported Rules

- [One line destructuring](docs/rules/one-line-destructuring.md)

