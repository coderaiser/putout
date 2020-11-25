# @putout/plugin-react-hooks [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-react-hooks.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-react-hooks"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-react-hooks
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-react-hooks

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
        "react-hooks/remove-bind": true,
        "react-hooks/rename-method-under-score": true,
        "react-hooks/convert-state-to-hooks": true,
        "react-hooks/remove-this": true,
        "react-hooks/convert-class-to-function": true,
        "react-hooks/convert-component-to-use-state": true,
        "react-hooks/convert-import-component-to-use-state": true
    }
}
```

## Example

Consider example using `class`:

```js
import React, {Component} from 'react';
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
import React, {useState} from 'react';
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
