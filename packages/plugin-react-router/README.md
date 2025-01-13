# @putout/plugin-react-router [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-react-router.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-react-router "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to migrate to latest version of [react router](https://reactrouter.com/docs/en/v6/upgrading/v5). *Not bundled*.

## Install

```
npm i putout @putout/plugin-react-router -D
```

## Rules

- ✅ [v6-convert-switch-to-routers](#v6-convert-switch-to-routers);
- ✅ [v6-convert-component-to-element](#v6-convert-component-to-element);
- ✅ [v7-split-multi-segment-route](#v7-split-multi-segment-route);

## Config

```json
{
    "rules": {
        "react-router/v6-convert-switch-to-routers": "on",
        "react-router/v6-convert-component-to-element": "on",
        "react-router/v7-split-multi-segment-route": "on"
    },
    "plugins": ["react-router"]
}
```

## convert-switch-to-routes

`ReactRouter v6` [uses `Routers` instead of `Switch`](https://reactrouter.com/en/6.6.2/components/routes#routes). Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/2030cd7141bf5f02bef896b19b9400ea/a1364326157c85b9e8fa33b6c87cb77ca5a2792f).

### ❌ Example of incorrect code

```jsx
const {Route, Switch} = require('react-router');

const routes = () => (
    <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/join" component={Join}/>
    </Switch>
);
```

### ✅ Example of correct code

```jsx
const {Route, Routes} = require('react-router');

const routes = () => (
    <Routes>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/join" component={Join}/>
    </Routes>
);
```

## convert-component-to-element

`ReactRouter v6` [uses `element` instead of `component`](https://reactrouter.com/en/6.6.2/route/route#dynamic-segments). Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/7fb5cf000b6a61d4003fccf2fcb39da3/1de6534c6151a20e021b3508e027fb0ee2449b0c).

### ❌ Example of incorrect code

```jsx
<Route path="/" component={Home}/>;
```

### ✅ Example of correct code

```jsx
<Route path="/" element={<Home/>}/>;
```

## v7-split-multi-segment-route

> Split any multi-segment splat `<Route>` into a parent route with the path and a child route with the splat.
>
> (c) [reactrouter.com](https://reactrouter.com/upgrading/v6)

Checkout in 🐊**Putout Editor**:

- ✅ [jsx](https://putout.cloudcmd.io/#/gist/f7e4ee30936fee2eb0b9269e9b377561/5bb969962141c3d617576384203a8ab3c38c7b31);
- ✅ [object](https://putout.cloudcmd.io/#/gist/001a1bd9df2eeeae0f9c5912b5ecddee/c7b1043bf209d9ca49e8058f95cc7868cc417cc8);

### ❌ Example of incorrect code

```jsx
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="dashboard/*" element={<Dashboard/>}/>
</Routes>;

createBrowserRouter([{
    path: '/',
    element: <Home/>,
}, {
    path: 'dashboard/*',
    element: <Dashboard/>,
}]);
```

### ✅ Example of correct code

```jsx
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="dashboard">
        <Route path="*" element={<Dashboard/>}/>
    </Route>
</Routes>;

createBrowserRouter([{
    path: '/',
    element: <Home/>,
}, {
    path: 'dashboard',
    children: [{
        path: '*',
        element: <Dashboard/>,
    }],
}]);
```

## License

MIT
