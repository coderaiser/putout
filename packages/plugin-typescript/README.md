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

```json
{
    "rules": {
        "typescript/apply-as-type-assertion": "on",
        "typescript/apply-utility-types": "on",
        "typescript/apply-type-guards": "on",
        "typescript/convert-generic-to-shorthand": "on",
        "typescript/remove-duplicates-from-union": "on",
        "typescript/remove-duplicates-interface-keys": "on",
        "typescript/remove-duplicates-exports": "on",
        "typescript/remove-useless-types-from-constants": "on",
        "typescript/remove-unused-types": "on",
        "typescript/remove-useless-types": "on",
        "typescript/remove-useless-parens": "on",
        "typescript/remove-useless-promise": "on",
        "typescript/remove-useless-mapped-types": "on",
        "typescript/find-file": "off"
    }
}
```

## apply-as-type-assertion

According to [best practise](https://stackoverflow.com/questions/36842158/arraytype-vs-type-in-typescript/36843084#36843084).

### ❌ Example of incorrect code

```ts
const boundaryElement = <HTMLElement>e.target;
```

### ✅ Example of correct code

```ts
const boundaryElement1 = e.target as HTMLElement;
```

## apply-utility-types

### ❌ Example of incorrect code

```ts
type SuperType1 = {
    [Key in keyof Type]?: Type[Key];
};
```

### ✅ Example of correct code

```ts
type SuperType1 = Partial<Type>;
```

## apply-type-guards

> It just so happens that TypeScript has something called a `type guard`.
> A `type guard` is some expression that performs a runtime check that guarantees the type in some scope.
>
> (c) [typescript.org](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/5ac4459242197c4820b331f19d3681eb/4b66175c486ee8e865aee9645bf4e5fffc664e01).

### ❌ Example of incorrect code

```ts
const isNumber = (a) => typeof a === 'number';
```

### ✅ Example of correct code

```ts
const isNumber = (a): a is number => typeof a === 'number';
```

## convert-generic-to-shorthand

> There is no difference at all. `Type[]` is the shorthand syntax for an `array` of `Type`. `Array<Type>` is the generic syntax. They are completely equivalent.
>
> (c) https://stackoverflow.com/a/36843084/4536327

Convert `generic` to `shorthand`.

### ❌ Example of incorrect code

```ts
interface A {
    x: Array<X>;
    y: Array<X | Y>;
}
```

### ✅ Example of correct code

```ts
interface A {
    x: X[];
    y: X[] | Y[];
}
```

### Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`typescript/convert-generic-to-shorthand`](https://github.com/coderaiser/putout/tree/master/packages/plugin-typescript#convert-generic-to-shorthand) | ✅
⏣ **ESLint** | [`@typescript-eslint/array-type`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/array-type.md#array-type) | ✅

## remove-duplicates-from-union

### ❌ Example of incorrect code

```ts
type x = boolean[]
    | A
    | string
    | A
    | string[]
    | boolean[];
```

### ✅ Example of correct code

```ts
type x = boolean[]
    | A
    | string
    | string[];
```

## remove-duplicates-exports

In **JavaScript** duplicate exports leads to [`SyntaxError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError), anyways **TypeScript** parses such code and reports [`Duplicates Identifier`](https://github.com/Microsoft/TypeScript/blob/v1.8.5/src/compiler/diagnosticMessages.json#L826-L829) diagnostic.

It gives us ability to automate fixing of such code 😏. Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e8d02b3d1c91b4b3b6b9636e22dd03ed/8be7b4c8d0f6c28440f36d03341a1153c18549a7).

### ❌ Example of incorrect code

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

## remove-unused-types

### ❌ Example of incorrect code

```ts
type n = number;
type s = string;

const x: n = 5;
```

### ✅ Example of correct code

```ts
type n = number;

const x: n = 5;
```

## remove-useless-types

### ❌ Example of incorrect code

```ts
type oldType = {
    a: number;
    b: string;
};
type newType = oldType;

const x: newType = {
    a: 5,
    b: 'hello',
};
```

### ✅ Example of correct code

```ts
type oldType = {
    a: number;
    b: string;
};

const x: oldType = {
    a: 5,
    b: 'hello',
};
```

## remove-useless-parens

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/6c8717114f7285639a5f24b5a6fdb9dc/583e438a61aae156c79b66dbf418e1e5f251bf87).

### ❌ Example of incorrect code

```ts
const m: X[] = [];
const z: (X | Y) = 5;
const f: X = 5;
```

### ✅ Example of correct code

```ts
const x: X[] | Y[] = [];
const m: X[] = [];
const z: X | Y = 5;
const f: X = 5;
```

## remove-useless-promise

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/5fd13c0510571b45884dfddbc8b83bb4/5ca97c4021b197822ef73418796513fe6d891239).

### ❌ Example of incorrect code

```ts
function doStuff(): Promise<string> {
    return 'hello';
}
```

### ✅ Example of correct code

```ts
function doStuff(): string {
    return 'hello';
}
```

## remove-useless-mapped-types

Remove useless [mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html).

### ❌ Example of incorrect code

```ts
type SuperType = {
    [Key in keyof Type]: Type[Key];
};
```

### ✅ Example of correct code

```ts
type SuperType = Type;
```

## remove-useless-mapping-modifiers

Remove useless [mapping modifiers](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers).

### ❌ Example of incorrect code

```ts
type SuperType = {
    [Key in keyof Type]+?: Type[Key];
};
```

### ✅ Example of correct code

```ts
type SuperType = {
    [Key in keyof Type]?: Type[Key];
};
```

## remove-duplicate-interface-keys

### ❌ Example of incorrect code

```ts
interface Hello {
    'hello': any;
    'hello': string;
}
```

### ✅ Example of correct code

```ts
interface Hello {
    'hello': string;
}
```

## find-file

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/1026c5e9562248e7f07f9e2c7b698650/8c701bba5ba52f4cac258ecf5dcb5bee1f197236).

### ❌ Example of incorrect code

```ts
__putout_processor_filesystem(['/', [
    '/hello.ts',
    'const a: number = 5;',
]]);
```

### ✅ Example of correct code

```ts
__putout_processor_filesystem(['/', [
    '/hello.ts',
    'const a = 5;',
]]);
```

## License

MIT
