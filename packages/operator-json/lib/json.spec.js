'use strict';

const {test} = require('supertape');
const {
    toJS,
    fromJS,
    __json,
    __filesystem,
} = require('../lib/json.js');

test('putout: processor: json: toJS: filesystem', ({equal}) => {
    const source = '{"hello": "world"}';
    const result = toJS(source, __filesystem);
    const expected = `__putout_processor_filesystem({"hello": "world"});\n`;
    
    equal(result, expected);
});

test('putout: processor: json: toJS', ({equal}) => {
    const source = '{"hello": "world"}';
    const result = toJS(source, __json);
    const expected = `__putout_processor_json({"hello": "world"});\n`;
    
    equal(result, expected);
});

test('putout: processor: json: fromJS', ({equal}) => {
    const source = `__putout_processor_filesystem({"hello": "world"});\n`;
    const result = fromJS(source, __filesystem);
    const expected = '{"hello": "world"}\n';
    
    equal(result, expected);
});

test('putout: processor: json: fromJS: more newlines', ({equal}) => {
    const source = `__putout_processor_filesystem({"hello": "world"}\n);\n`;
    const result = fromJS(source, __filesystem);
    const expected = '{"hello": "world"}\n';
    
    equal(result, expected);
});
