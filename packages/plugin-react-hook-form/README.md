# @putout/plugin-react-hook-form [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-react-hook-form.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-react-hook-form "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to migrate to latest version of [React Hook Form](https://react-hook-form.com/). *Not bundled*.

## Install

```
npm i putout @putout/plugin-react-hook-form -D
```

Add `.putout.json` with:

```json
{
    "plugins": [
        "react-hook-form"
    ]
}
```

## Rules

Here is list of rules:

```json
{
    "rules": {
        "react-hook-form/remove-value-from-control": "on"
    }
}
```

## remove-value-from-control

Return value of `control` attribute function no longer has `value` property in [`react-hook-form v5.0.0`](https://github.com/react-hook-form/react-hook-form/releases/tag/v5.0.0).
Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/5a578777e666ccd5173b5961f1a05252/9d6a7f54cfb0eea487ece3aae0daec147c72385c).

### ❌ Example of incorrect code

```jsx
import {TextInput} from 'react-native';

const a = <Controller
  as={<TextInput style={{borderWidth: 2, borderColor: 'black'}} />}
  name="text"
  control={(args) => ({
    value: args[0].nativeEvent.text,
  })}
  onChange={onChange}
/>;

```

### ✅ Example of correct code

```jsx
import {TextInput} from 'react-native';

const a = <Controller
  as={<TextInput style={{borderWidth: 2, borderColor: 'black'}} />}
  name="text"
  control={(args) => args[0].nativeEvent.text}
  onChange={onChange}
/>;
```

## License

MIT
