# @putout/plugin-parens [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-parens.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-parens"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to add missing parens. Check out in 🐊[**Putout Editor**](https://putout.vercel.app/#/gist/a8ab0ffefed3b1e7dd0f43d794ea86f4/5d45fcc2e283b5b2d0b9e155010d1114b9f0a7ee).

## Install

```
npm i @putout/plugin-parens
```

## Rule

```json
{
    "rules": {
        "parens/add-missing": "on",
        "parens/remove-useless": "on"
    }
}
```

## add-missing

### assign

> The JavaScript exception "invalid assignment left-hand side" occurs when there was an unexpected assignment somewhere. It may be triggered when a single `=` sign was used instead of `==` or `===`.
>
> (c) [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Invalid_assignment_left-hand_side)

To disable use:

```json
{
    "rules": {
        "parens/add-missing-for-assign": "off"
    }
}
```

```diff
-a && b = a;
+a && (b = a);
```

### await

To disable use:

```json
{
    "rules": {
        "parens/add-missing-for-await": "off"
    }
}
```

#### ❌ Example of incorrect code

```ts
await asyncFn().filter(Boolean);
```

#### ✅ Example of correct code

```js
(await asyncFn()).filter(Boolean);
```

#### template

> The JavaScript exception "tagged template cannot be used with optional chain" occurs when the tag expression of a tagged template literal is an optional chain, or if there's an optional chain between the tag and the template.
>
> (c) [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Bad_optional_template)


Checkout in 🐊[**Putout Editor**](https://putout.vercel.app/#/gist/ef3f1e198a8d5ebeb9dd3fd1fef8f305/c6b46a34037f5cb095b5419b748a24b6dc8e2933).

```json
{
    "rules": {
        "parens/add-missing-for-template": "off"
    }
}
```

#### ❌ Example of incorrect code

```ts
getConsoleLog?.()``;
String?.raw``;
String?.raw!``;
```

#### ✅ Example of correct code

```ts
(getConsoleLog?.())``;
(String?.raw)``;
(String?.raw)!``;
```

## remove-useless

### await

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/3800b0c52a199dd49a089ed4b9b37566/e2dddb75cb68811883cae640a22b340b8e1afa73).

#### ❌ Example of incorrect code

```ts
const s = (await m());
```

#### ✅ Example of correct code

```ts
const s = await m();
```

## License

MIT
