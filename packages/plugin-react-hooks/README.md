# @putout/plugin-react-hooks [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-react-hooks.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-react-hooks"npm"

`putout` plugin adds ability to convert class components to [react hooks](https://reactjs.org/docs/hooks-intro.html).
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

## Example

Consider example using `class`:

```js
import React, {
    Component,
} from 'react';
export default Button;

class Button extends Component {
    constructor() {
        super();
        
        this.state = {
            enabled: true,
        };
        
        this.toogle = this._toggle.bind(this);
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

```js
import React, {
    useState,
} from 'react';
export default Button;

function Button() {
    const [enabled, setEnabled] = useState(true);
    const toggle = _toogle;
    
    function toogle() {
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
