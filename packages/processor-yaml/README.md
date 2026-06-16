# @putout/processor-yaml [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/processor-yaml.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/processor-yaml "npm"

> **YAML** is a human-friendly data serialization language for all programming languages.
>
> (c) [yaml.org](https://yaml.org/)

🐊[**Putout**](https://github.com/coderaiser/putout) processor adds ability to transform `yaml` as `json`.

## Install

```
npm i @putout/processor-yaml -D
```

## Config

```json
{
    "processors": ["yaml"]
}
```

## Usage

Processor converts `yaml` to JavaScript, it looks like this.

```yaml
name: Node CI
```

Becames:

```
__putout_processor_yaml({
    "node": "Node CI"
});
```

Quotes always used because YAML converted to JSON and then wrapped with `__putout_processor_yaml`.

## Example

Let's suppose you want to update `yaml` file:

```diff
name: Node CI
+permissions:
+  contents: write
```

Just like in [`github/set-contents-permissions`](https://github.com/coderaiser/putout/tree/master/packages/plugin-github#set-contents-permissions). You will need `__yaml` constant, which equals to `__putout_processor_yaml` and [`getProperties`](https://github.com/coderaiser/putout/tree/master/packages/operate#getpropertiespath-path-names-string).

```js
import {types, operator} from 'putout';

const {getProperties, __yaml} = operator;

const {
    objectExpression,
    stringLiteral,
    objectProperty,
} = types;

export const report = () => `'permirmissions.content = write'`;

export const fix = ({path, permissionsPath}) => {
    if (permissionsPath) {
        permissionsPath.node.value.properties.push(objectProperty(stringLiteral('contents'), stringLiteral('write')));
        return;
    }
    
    const property = objectProperty(stringLiteral('permissions'), objectExpression([
        objectProperty(stringLiteral('contents'), stringLiteral('write')),
    ]));
    
    path.node.properties.splice(1, 0, property);
};

export const traverse = ({push}) => ({
    [__yaml]: (path) => {
        const objectPath = path.get('arguments.0');
        
        const {
            namePath,
            permissionsPath,
        } = getProperties(objectPath, ['name', 'permissions']);
        
        if (!namePath)
            return;
        
        if (permissionsPath) {
            const permissionsProperties = permissionsPath.get('value.properties');
            
            for (const property of permissionsProperties) {
                if (property.node.key.value === 'contents')
                    return;
            }
        }
        
        push({
            path: objectPath,
            permissionsPath,
        });
    },
});
```

You can find more examples in:

- ✅ [`@putout/plugin-github`](https://github.com/coderaiser/putout/tree/master/packages/plugin-github#readme)

## License

MIT
