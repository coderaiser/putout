# babel-plugin-putout

Use `putout` as `babel plugin`.

## Example

**In**

```js
// input code
const s = 'hi';
```

**Out**

```js
// output code
```

## Installation

```sh
$ npm install babel-plugin-putout
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

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
require("babel-core").transform("code", {
    plugins: ["putout"],
});
```
