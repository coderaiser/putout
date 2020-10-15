# @putout/plugin-convert-pascal-to-camel [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=codemods/convert-pascal-to-camel
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=codemods/convert-pascal-to-camel

Convert function names from `PascalCase` to `camelCase`.

## Install

```
npm i putout -g
git clone https://github.com/coderaiser/putout
mkdir ~/.putout
ln -s ~/putout/codemods/convert-tape-to-supertape ~/.putout/convert-tape-to-supertape
```

## ❌ Incorrect code example

```js
function HelloWorld() {
}

const HowCome = () => {};
const HowCome2 = function WhySo() {};
const HowCome3 = function properCamelCase() {};
const howCome4 = function WhySo() {};
const HowCome5 = function () {};

class SomeClass extends Component {
    HowCome() {}
}

class SomeClass2 extends Component {
    HowCome = () => {}
}
```

## ✅ Correct code Example

```js
function helloWorld() {
}

HelloWorld();

const howCome = () => {};
const howCome2 = function whySo() {};
const howCome3 = function properCamelCase() {};
const howCome4 = function whySo() {};
const howCome5 = function () {};

class SomeClass extends Component {
  howCome() {}
}

class SomeClass2 extends Component {
  howCome = () => {}
}

```

## License

MIT

