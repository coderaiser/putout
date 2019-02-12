# putout-plugin-react-hooks [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-react-hooks.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-react-hooks"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-react-hooks
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-react-hooks

`putout` plugin adds ability to convert class components to [react hooks](https://reactjs.org/docs/hooks-intro.html).

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

All Rules of `react-hooks` is enabled by default, to disable any of them modify `.putout.json`:

```json
{
    "rules": {
        "remove-bind": true,
        "rename-method-under-score": true,
        "react-hooks/convert-state-to-hooks": true,
        "remove-this": true,
        "react-hooks/convert-class-to-function": true,
        "react-hooks/convert-component-to-use-state": true,
        "react-hooks/convert-import-component-to-use-state": true
    }
}
```

## Example

Consider example using `class`:

```js
export default Button;

class Button extends Component {
    constructor() {
        super();
        
        this.state = {
            enabled: true
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
                onClick={this.setEnabled}
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

