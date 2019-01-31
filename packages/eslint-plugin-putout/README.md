# eslint-plugin-putout

eslint plagin for putout

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-putout`:

```
$ npm install eslint-plugin-putout --save-dev
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
        "putout/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





