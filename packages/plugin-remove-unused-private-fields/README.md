# @putout/plugin-remove-unused-private-fields [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-unused-private-fields.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-unused-private-fields"npm"

> **Class fields** are **public** by default, but **private class members** can be created by using a hash **`#`** prefix. The privacy encapsulation of these **class** features is enforced by **JavaScript** itself.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove unused private fields.

## Install

```
npm i @putout/plugin-remove-unused-private-fields
```

## Rule

```json
{
    "rules": {
        "remove-unused-private-fields": "on"
    }
}
```

## ❌ Incorrect code example

```js
class Hello {
    #a = 5;
    #b = 3;
    
    get() {
        return this.#a;
    }
}
```

## ✅ Correct code Example

```js
class Hello {
    #a = 5;
    
    get() {
        return this.#a;
    }
}
```

## License

MIT
