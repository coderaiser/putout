# @putout/plugin-typescript [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-typescript.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-typescript "npm"

> TypeScript is JavaScript with syntax for types.
>
> (c) [typescriptcriptlang.org](https://www.typescriptcriptlang.org)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to transform **TypeScript** code. Enabled by default for `ts` and `tsx` files.

## Install

```
npm i putout @putout/plugin-typescript -D
```

## Options

```json
{
    "rules": {
        "typescript/apply-as-type-assertion": "on",
        "typescript/apply-utility-types": "on",
        "typescript/convert-generic-to-shorthand": "on",
        "typescript/remove-duplicates-from-union": "on",
        "typescript/remove-duplicates-interface-keys": "on",
        "typescript/remove-duplicates-exports": "on",
        "typescript/remove-useless-types-from-constants": "on",
        "typescript/remove-unused-types": "on",
        "typescript/remove-useless-types": "on",
        "typescript/remove-useless-mapped-types": "on"
    }
}
```

## Rules

### apply-as-type-assertion

#### ❌ Example of incorrect code

```ts
const boundaryElement = <HTMLElement>e.target;
```

#### ✅ Example of correct code

```ts
const boundaryElement1 = e.target as HTMLElement;
```

### apply-utility-types

#### ❌ Example of incorrect code

```ts
type SuperType1 = {
    [Key in keyof Type]?: Type[Key];
};
```

#### ✅ Example of correct code

```ts
type SuperType1 = Partial<Type>;
```

### convert-generic-to-shorthand

> There is no difference at all. `Type[]` is the shorthand syntax for an `array` of `Type`. `Array<Type>` is the generic syntax. They are completely equivalent.
>
> (c) https://stackoverflow.com/a/36843084/4536327

Convert `generic` to `shorthand`.

#### ❌ Example of incorrect code

```ts
interface A {
    x: Array<X>;
    y: Array<Y>;
}
```

#### ✅ Example of correct code

```ts
interface A {
    x: X[];
    y: Y[];
}
```

#### Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`typescript/convert-generic-to-shorthand`](https://github.com/coderaiser/putout/tree/master/packages/plugin-typescript#convert-generic-to-shorthand) | ✅
🦕 **ESLint** | [`@typescript-eslint/array-type`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/array-type.md#array-type) | ✅

### remove-duplicates-from-union

#### ❌ Example of incorrect code

```ts
type x = boolean[]
    | A
    | string
    | A
    | string[]
    | boolean[];
```

#### ✅ Example of correct code

```ts
type x = boolean[]
    | A
    | string
    | string[];
```

### remove-duplicates-exports

In **JavaScript** duplicate exports leads to [`SyntaxError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError), anyways **TypeScript** parses such code and reports [`Duplicates Identifier`](https://github.com/Microsoft/TypeScript/blob/v1.8.5/src/compiler/diagnosticMessages.json#L826-L829) diagnostic.

It gives us ability to automate fixing of such code 😏. Check it out in [🐊**Putout Editor**](https://putout.cloudcmd.io/#/gist/e8d02b3d1c91b4b3b6b9636e22dd03ed/8be7b4c8d0f6c28440f36d03341a1153c18549a7).

#### ❌ Example of incorrect code

```ts
export {
    a,
    hello,
    a,
    world,
};
```

#### ✅ Example of correct code

```ts
export {
    hello,
    a,
    world,
};
```

*☝️ The rule fits good with [`putout/add-newlines-between-specifiers`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout/lib/add-newlines-between-specifiers#readme) of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout/#readme).*

### remove-useless-types-from-constants

#### ❌ Example of incorrect code

```ts
const x: any = 5;
```

#### ✅ Example of correct code

```ts
const x = 5;
```

### remove-unused-types

#### ❌ Example of incorrect code

```ts
type n = number;
type s = string;

const x: n = 5;
```

#### ✅ Example of correct code

```ts
type n = number;

const x: n = 5;
```

### remove-useless-types

#### ❌ Example of incorrect code

```ts
type oldType = {
    a: number,
    b: string,
};

type newType = oldType;

const x: newType = {
    a: 5,
    b: 'hello',
};
```

#### ✅ Example of correct code

```ts
type oldType = {
    a: number,
    b: string,
};

const x: oldType = {
    a: 5,
    b: 'hello',
};
```

### remove-useless-mapped-types

Remove useless [mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html).

#### ❌ Example of incorrect code

```ts
type SuperType = {
    [Key in keyof Type]: Type[Key];
};
```

##### ✅ Example of correct code

```ts
type SuperType = Type;
```

### remove-useless-mapping-modifiers

Remove useless [mapping modifiers](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers).

#### ❌ Example of incorrect code

```ts
type SuperType = {
    [Key in keyof Type]+?: Type[Key];
};
```

#### ✅ Example of correct code

```ts
type SuperType = {
    [Key in keyof Type]?: Type[Key];
};
```

### remove-duplicate-interface-keys

#### ❌ Example of incorrect code

```ts
interface Hello {
    'hello': any
    'hello': string
}
```

#### ✅ Example of correct code

```ts
interface Hello {
    'hello': string
}
```

## License

MIT
