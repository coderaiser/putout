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

- ✅ [remove-useless-provider](#remove-useless-provider);
- ✅ [remove-implicit-ref-return](#remove-implicit-ref-return);

## Config

Here is list of rules:

```json
{
    "rules": {
        "react/remove-useless-provider": "on",
        "react/remove-implicit-ref-return": "on"
    }
}
```

## remove-useless-provider

> In React 19, you can render <Context> as a provider instead of <Context.Provider>:
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

## remove-implicit-ref-return

> Due to the introduction of ref cleanup functions, returning anything else from a ref callback will now be rejected by TypeScript. The fix is usually to stop using implicit returns.
>
> [react.dev](https://react.dev/blog/2024/04/25/react-19#context-as-a-provider)

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/dc0c3eb7a20d54645c57e5c1c1321f65/940cde047eeef97f3a00c662e6ea86167dd0f71c).

### ❌ Example of incorrect code

```jsx
const a = (
    <div ref={(current) => (instance = current)}/>
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

## License

MIT
