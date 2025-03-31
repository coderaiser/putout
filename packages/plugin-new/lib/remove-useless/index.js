import {types} from 'putout';

const {objectExpression} = types;

export const report = () => `Avoid useless operator 'new'`;

export const replace = () => ({
    'new new __a': 'new __a',
    'new Error(__args)': 'Error(__args)',
    'new TypeError(__args)': 'TypeError(__args)',
    'new Boolean(__a)': 'Boolean(__a)',
    'new Number(__a)': 'Number(__a)',
    'new String(__a)': 'String(__a)',
    'new Array(__args)': 'Array(__args)',
    'new Symbol(__a)': 'Symbol(__a)',
    'new RegExp(__a)': 'RegExp(__a)',
    'new Object()': () => {
        return objectExpression([]);
    },
    'new Object(__a)': 'Object(__a)',
    'new BigInt(__a)': 'BigInt(__a)',
    'new Reflect()': 'Reflect',
    'new Math()': 'Math',
});
