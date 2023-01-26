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
        "react-hook-form/apply-clear-errors": "on",
        "react-hook-form/convert-as-to-render": "on",
        "react-hook-form/convert-trigger-validation-to-trigger": "on",
        "react-hook-form/remove-value-from-control": "on"
    }
}
```

## apply-clear-errors

`clearError` was renamed to `clearErrors` in [`react-hook-form v6.0.0`](https://github.com/react-hook-form/react-hook-form/releases/tag/v6.0.0-rc.5).
Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/4b8ae81c6604f62dfe76fdcc644cf814/ecdf5fe389be5c9517a8a9a67fbc2396c233c131).

### ❌ Example of incorrect code

```ts
const {
    register,
    setError,
    clearError,
    errors,
} = useForm<{}>;
```

### ✅ Example of correct code

```ts
const {
    register,
    setError,
    clearErrors,
    errors,
} = useForm<{}>;
```

## convert-as-to-render

`Control` has no `as`, it uses `render` starting from [`v6`](https://github.com/react-hook-form/react-hook-form/releases/tag/v6.0.0-rc.2).
Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/8493358f36c009f2d4f7ac0bf447d645/79f67bcdbc597f273e7d5cd131dd20a86649c63e).

### ❌ Example of incorrect code

```jsx
const a = <Controller
  as={CustomInput}
  valueName="textValue"
  onChangeName="onTextChange"
  control={control}
  name="test"
/>;
```

### ✅ Example of correct code

```jsx
const a = <Controller
  render={({onChange, onBlur, value}) => <CustomInput onTextChange={onChange} onBlur={onBlur} textValue={value} />}
  control={control}
  name="test" />;
```

## convert-trigger-validation-to-trigger

`triggerValidation` was renamed no `trigger`, starting from [`v6`](https://github.com/react-hook-form/react-hook-form/releases/tag/v6.0.0-rc.1).
Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/ff41e995b958caf46aa53b3cd7eabf9f/84cd2eaf0803c45bbbe22df661e126488237ca9c).

### ❌ Example of incorrect code

```jsx
import {useForm} from 'react-hook-form';

const {
 register,
 triggerValidation,
 errors,
} = useForm();
triggerValidation();
```

### ✅ Example of correct code

```jsx
import {useForm} from 'react-hook-form';

const {
 register,
 trigger,
 errors,
} = useForm();
trigger();
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
