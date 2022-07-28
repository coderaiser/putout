# @putout/plugin-react-router [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-react-router.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-react-router "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to migrate to latest version of [react router](https://reactrouter.com/docs/en/v6/upgrading/v5). Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/2030cd7141bf5f02bef896b19b9400ea/a1364326157c85b9e8fa33b6c87cb77ca5a2792f)

*Not installed with putout by default*.

## Install

```
npm i putout @putout/plugin-react-router -D
```

Update `.putout.json` with:

```json
{
    "plugins": [
        "react-router"
    ]
}
```

## Rules

Here is list of rules:

```json
{
    "rules": {
        "react-router/convert-switch-to-routers": "on",
        "react-router/convert-component-to-element": "on"
    }
}
```

## convert-switch-to-routes

`ReactRouter v6` [uses `Routers` instead of `Switch`](https://reactrouter.com/docs/en/v6/upgrading/v5#upgrade-all-switch-elements-to-routes).

### ❌ Example of incorrect code

```jsx
const {Route, Switch} = require('react-router');

const routes = () => <Switch>
    <Route exact path="/login" component={ Login }/>
    <Route exact path="/join" component={ Join }/>
</Switch>;
```

### ✅ Example of correct code

```jsx
const {Route, Routes} = require('react-router');

const routes = () => <Routes>
    <Route exact path="/login" component={ Login }/>
    <Route exact path="/join" component={ Join }/>
</Routes>;
```

## convert-component-to-element

`ReactRouter v6` [uses `element` instead of `component`](https://reactrouter.com/docs/en/v6/components/route).

### ❌ Example of incorrect code

```jsx
<Route path="/" component ={Home} />;
```

### ✅ Example of correct code

```jsx
<Route path="/" element ={<Home />} />;
```

## License

MIT
