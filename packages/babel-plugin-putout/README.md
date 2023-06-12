# babel-plugin-putout

Use 🐊[**Putout**](https://github.com/coderaiser/putout) as `babel plugin`.

## Example

```diff
-const s = 'hi';
```

## Installation

```sh
$ npm install babel-plugin-putout
```

## Usage

### Via `.babelrc.json` (Recommended)

**.babelrc.json**

```json
{
    "plugins": [
        ["putout", {
            "rules": {
                "remove-unused-variables": false
            }
        }]
    ]
}
```

### Via CLI

```sh
$ babel --plugins putout script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
    plugins: ['putout'],
});
```
