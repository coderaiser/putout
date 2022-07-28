# @putout/plugin-react-hooks [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-react-hooks.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-react-hooks "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert class components to [react hooks](https://reactjs.org/docs/hooks-intro.html).
*Not installed with putout by default*.

## Install

```
npm i putout @putout/plugin-react-hooks -D
```

Add `.putout.json` with:

```json
{
    "plugins": [
        "react-hooks"
    ]
}
```

## Rules

Here is list of rules:

```json
{
    "rules": {
        "react-hooks/apply-short-fragment": "on",
        "react-hooks/declare": "on",
        "react-hooks/remove-bind": "on",
        "react-hooks/rename-method-under-score": "on",
        "react-hooks/convert-state-to-hooks": "on",
        "react-hooks/remove-this": "on",
        "react-hooks/convert-class-to-function": "on",
        "react-hooks/convert-component-to-use-state": "on",
        "react-hooks/convert-import-component-to-use-state": "on"
    }
}
```

## apply-short-fragment

Apply shorthand syntax of [`Fragment`](https://reactjs.org/docs/fragments.html#short-syntax).
Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/c809eeaa9d7e8e11e14ad2df7eaad8bf/0ee504f4dd52bfa48ffeda2de7b919ec30550e4b).

### ❌ Example of incorrect code

```jsx
function Columns() {
    return (
        <Fragment>
            <td>Hello</td>
            <td>World</td>
        </Fragment>
    );
}
```

### ✅ Example of correct code

```jsx
function Columns() {
    return (
        <>
            <td>Hello</td>
            <td>World</td>
        </>
    );
}
```

### Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`react-hooks/apply-short-fragment`](https://github.com/coderaiser/putout/tree/master/packages/plugin-react-hooks#apply-short-fragment) | ✅
⏣ **ESLint** | [`react/jsx-fragments`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md) | ✅

## declare

Declare hooks according to [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html).

### ❌ Example of incorrect code

```jsx
function Example() {
    const [count, setCount] = useState(0);
    
    return (
        <div/>
    );
}
```

### ✅ Example of correct code

```jsx
import {useState} from 'react';

function Example() {
    const [count, setCount] = useState(0);
    
    return (
        <div/>
    );
}
```

## Example

Consider example using `class`:

```jsx
import React, {
    Component,
} from 'react';

export default class Button extends Component {
    constructor() {
        super();
        
        this.state = {
            enabled: true,
        };
        
        this.toggle = this._toggle.bind(this);
    }
    
    _toggle() {
        this.setState({
            enabled: false,
        });
    }
    
    render() {
        const {enabled} = this.state;
        
        return (
            <button
                enabled={enabled}
                onClick={this.toggle}
            />
        );
    }
}
```

After `putout --fix` transform, you will receive:

```jsx
import React, {
    useState,
} from 'react';

export default function Button() {
    const [enabled, setEnabled] = useState(true);
    
    function toggle() {
        setEnabled(false);
    }
    
    return (
        <button
            enabled={enabled}
            onClick={toggle}
        />
    );
}
```

## License

MIT
