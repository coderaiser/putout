# @putout/plugin-react [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-react-hooks.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-react-hooks "npm"

> The library for web and native user interfaces
>
> (c) [react.dev](https://react.dev)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps to migrate to new version of React. *Not bundled*.

## Install

```
npm i putout @putout/plugin-react-hooks -D
```

Add `.putout.json` with:

```json
{
    "plugins": ["react"]
}
```

## Rules

- ✅ [apply-create-root](#apply-create-root);
- ✅ [apply-default-to-jsx-string](#apply-default-to-jsx-string);
- ✅ [convert-named-to-default-in-react-test-renderer](#convert-named-to-default-in-react-test-renderer);
- ✅ [remove-useless-provider](#remove-useless-provider);
- ✅ [remove-useless-forward-ref](#remove-useless-forward-ref);
- ✅ [remove-implicit-ref-return](#remove-implicit-ref-return);
- ✅ [rename-file-js-to-jsx](#rename-file-js-to-jsx);
- ✅ [rename-file-jsx-to-js](#rename-file-jsx-to-js);

## Filesystem

- ✅ [apply-jsx-to-imported-file](#apply-jsx-to-imported-file);

## Config

Here is list of rules:

```json
{
    "rules": {
        "react/apply-create-root": "on",
        "react/apply-jsx-to-imported-file": "off",
        "react/apply-default-to-jsx-string": "on",
        "react/convert-named-to-default-in-react-test-renderer": "on",
        "react/remove-useless-provider": "on",
        "react/remove-useless-forward-ref": "on",
        "react/remove-implicit-ref-return": "on",
        "react/rename-file-jsx-to-js": "on",
        "react/rename-file-js-to-jsx": "on"
    }
}
```

## apply-create-root

> `ReactDOM.render()` was deprecated in March 2022 (v18.0.0). In React 19, we’re removing `ReactDOM.render()` and you’ll need to migrate to using `ReactDOM.createRoot()`:
>
> [react.dev](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-reactdom-render)

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/98f21f4826dba034cb0923a7933e959b/399ada3ea94e718a537e8348c710f14b7fc19c9e).

### ❌ Example of incorrect code

```jsx
import {render} from 'react-dom';

render(<App/>, document.getElementById('root'));
```

### ✅ Example of correct code

```jsx
import {createRoot} from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
    <App/>,
);
```

## apply-default-to-jsx-string

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/e366764ba30460af0c404e6c34a1af87/bdd33d40cceec54479e2262cc51691d9198ff645).

### ❌ Example of incorrect code

```jsx
import toJsxString from 'react-element-to-jsx-string';
```

### ✅ Example of correct code

```jsx
import toJsxStringDefault from 'react-element-to-jsx-string';

const {default: toJsxString} = reactElementToJSXStringDefault;
```

## remove-useless-provider

> In React 19, you can render `<Context>` as a provider instead of `<Context.Provider>`:
>
> [react.dev](https://react.dev/blog/2024/04/25/react-19#context-as-a-provider)

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/51f66807ab67704288f2f737c5152e6c/8957e4a4beb17e175bff1b10e455ffda59d7c74a).

### ❌ Example of incorrect code

```jsx
function App() {
    const [theme, setTheme] = useState('light');
    
    // ...
    return (
        <UseTheme.Provider value={theme}>
            <Page/>
        </UseTheme.Provider>
    );
}
```

### ✅ Example of correct code

```jsx
function App() {
    const [theme, setTheme] = useState('light');
    
    // ...
    return (
        <UseTheme value={theme}>
            <Page/>
        </UseTheme>
    );
}
```

## remove-useless-forward-ref

> Starting in React 19, you can now access ref as a prop for function components:
> New function components will no longer need `forwardRef`.
> In future versions we will deprecate and remove `forwardRef`.
>
> [react.dev](https://react.dev/blog/2024/04/25/react-19#ref-as-a-prop)

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/d35cf809dad425439de86ceaeca49d38/65229e30b43f072d4d6d04f3998fa47095a0a7f6).

### ❌ Example of incorrect code

```jsx
const MyInput = forwardRef((props, ref) => {
    return (
        <input {...props} ref={ref}/>
    );
});
```

### ✅ Example of correct code

```jsx
const MyInput2 = forwardRef(({value}, ref) => {
    return (
        <input value={value} ref={ref}/>
    );
});
```

## remove-implicit-ref-return

> Due to the introduction of ref cleanup functions, returning anything else from a ref callback will now be rejected by TypeScript. The fix is usually to stop using implicit returns.
>
> [react.dev](https://react.dev/blog/2024/04/25/react-19#context-as-a-provider)

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/dc0c3eb7a20d54645c57e5c1c1321f65/940cde047eeef97f3a00c662e6ea86167dd0f71c).

### ❌ Example of incorrect code

```jsx
const a = (
    <div ref={(current) => instance = current}/>
);
```

### ✅ Example of correct code

```jsx
function App() {
    const [theme, setTheme] = useState('light');
    
    // ...
    return (
        <UseTheme value={theme}>
            <Page/>
        </UseTheme>
    );
}
```

## rename-file-js-to-jsx

Rename `*.js` files to `*.jsx` when they contains JSX.

```diff
 /
 |-- package.json
 `-- lib/
-     `-- hello.js
+     `-- hello.jsx
```

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/bebaba6a03958effd72f160f9ef8c8ef/e3a275a2d6352183f71415dcd4346f2cd5667748).

## rename-file-jsx-to-js

Rename `*.jsx` files to `*.js` when they contains JSX.

```diff
 /
 |-- package.json
 `-- lib/
-     `-- hello.jsx
+     `-- hello.js
```

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/20bb4c5e3646ebbebccdc23bc93224c1/a0216b8fce6dce41fce16534d80354d9d94c6983).

### ❌ Example of incorrect code

```jsx
const a = (
    <div ref={(current) => instance = current}/>
);
```

### ✅ Example of correct code

```jsx
function App() {
    const [theme, setTheme] = useState('light');
    
    // ...
    return (
        <UseTheme value={theme}>
            <Page/>
        </UseTheme>
    );
}
```

### apply-jsx-to-imported-file

Checkout in 🐊**Putout Editor**:

- ✅ [`get-imports`](https://putout.cloudcmd.io/#/gist/ee10100fed86e4db926885dd54298668/7538bca7a9ae006d976f41261c0ed4c0e1902ace);
- ✅ [`change-imports`](https://putout.cloudcmd.io/#/gist/23a6dc6741b772c03fbed95feda2b451/1fbecac6fc40282bcda0593aa666a8c213ef85b7);

Let's consider file structure:

```
/
└── lib/
    ├── index.js
    └── a.jsx
```

In this case `index.js` can be fixed:

#### ❌ Example of incorrect code

```js
import a from './a.js';
```

#### ✅ Example of correct code

```js
import a from './a.jsx';
```

### convert-named-to-default-in-react-test-renderer

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/332db6dc617574d18ac6e10e1e2a77c9/2e4e30d0a6a8539b0c994315773b0d1a45b286f7).

#### ❌ Example of incorrect code

```js
import {createRenderer} from 'react-test-renderer/shallow';
```

#### ✅ Example of correct code

```js
import reactTestRenderer from 'react-test-renderer/shallow.js';

const {createRenderer} = reactTestRenderer;
```

## License

MIT
