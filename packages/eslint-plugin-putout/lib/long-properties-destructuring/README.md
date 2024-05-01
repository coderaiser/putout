# long-properties-destructuring

Keep each property on separate line when destructuring properties with name length **15** characters and more.

Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
import {getIsCorrectPluginName, pluginName} from './plugin.js';
const {getIsCorrectPluginMessage, pluginMessage} = plugin;
```

## ✅ Example of correct code

```js
import {
    getIsCorrectPluginName,
    pluginName,
} from './plugin.js';

const {
    getIsCorrectPluginMessage,
    pluginMessage,
} = plugin;
```

## Options

`maxLength` - maximum properties length, defaults: `15`.
