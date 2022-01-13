# @putout/plugin-typescript [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-typescript.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-typescript "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to transform [`TypeScript`](https://www.typescriptcriptlang.org/) code. Enabled by default for `ts` and `tsx` files.

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
        "typescript/remove-useless-types-from-constants": "on",
        "typescript/remove-unused-types": "on",
        "typescript/remove-useless-types": "on",
        "typescript/remove-useless-mapped-types": "on"
    }
}
```

## Rules

### `apply-as-type-assertion`

#### ❌ Incorrect code example

```ts
const boundaryElement = <HTMLElement>e.target;
```

#### ✅ Correct code Example

```ts
const boundaryElement1 = e.target as HTMLElement;
```

### `apply-utility-types`

#### ❌ Incorrect code example

```ts
type SuperType1 = {
    [Key in keyof Type]?: Type[Key];
};
```

#### ✅ Correct code Example

```ts
type SuperType1 = Partial<Type>;
```

### `convert-generic-to-shorthand`

Convert `generic` to `shorthand` (https://stackoverflow.com/a/36843084/4536327).

#### ❌ Incorrect code example

```ts
interface A {
    x: Array<X>;
    y: Array<Y>;
}
```

#### ✅ Correct code Example

```ts
interface A {
    x: X[];
    y: Y[];
}
```

### `remove-duplicates-from-union`

#### ❌ Incorrect code example

```ts
type x = boolean[]
    | A
    | string
    | A
    | string[]
    | boolean[];
```

#### ✅ Correct code Example

```ts
type x = boolean[]
    | A
    | string
    | string[];
```

### `remove-useless-types-from-constants`

#### ❌ Incorrect code example

```ts
const x: any = 5;
```

#### ✅ Correct code Example

```ts
const x = 5;
```

### `remove-unused-types`

#### ❌ Incorrect code example

```ts
type n = number;
type s = string;

const x: n = 5;
```

#### ✅ Correct code Example

```ts
type n = number;

const x: n = 5;
```

### `remove-useless-types`

#### ❌ Incorrect code example

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

#### ✅ Correct code Example

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

### `remove-useless-mapped-types`

Rmove useless [mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html).

#### ❌ Incorrect code example

```ts
type SuperType = {
    [Key in keyof Type]: Type[Key];
};
```

##### ✅ Correct code Example

```ts
type SuperType = Type;
```


### `remove-useless-mapping-modifiers`

Remove useless [mapping modifiers](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers).

#### ❌ Incorrect code example

```ts
type SuperType = {
    [Key in keyof Type]+?: Type[Key];
};
```

#### ✅ Correct code Example

```ts
type SuperType = {
    [Key in keyof Type]?: Type[Key];
};
```


### `remove-duplicate-interface-keys`

#### ❌ Incorrect code example

```ts
interface Hello {
    'hello': any
    'hello': string
}
```

#### ✅ Correct code Example

```ts
interface Hello {
    'hello': string
}
```

## License

MIT
