'use strict';

const {test} = require('supertape');
const {
    toJS,
    fromJS,
    isJSON,
    __yaml,
    __json,
    __json_name,
    __filesystem,
    __ignore,
    __ignore_name,
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

test('putout: processor: json: fromJS: strict mode', ({equal}) => {
    const source = `'use strict'; __putout_processor_filesystem({"hello": "world"});\n`;
    const result = fromJS(source, __filesystem);
    const expected = '{"hello": "world"}\n';
    
    equal(result, expected);
});

test('putout: processor: json: fromJS: newline', ({equal}) => {
    const source = `__putout_processor_filesystem({"hello": "world"});`;
    const result = fromJS(source, __filesystem);
    const expected = '{"hello": "world"}\n';
    
    equal(result, expected);
});

test('putout: processor: json: toJS: __yaml', ({equal}) => {
    const source = '{"hello": "world"}';
    const result = toJS(source, __yaml);
    const expected = `__putout_processor_yaml({"hello": "world"});\n`;
    
    equal(result, expected);
});

test('putout: processor: json: fromJS: more newlines', ({equal}) => {
    const source = `__putout_processor_filesystem({"hello": "world"}\n);\n`;
    const result = fromJS(source, __filesystem);
    const expected = '{"hello": "world"}\n';
    
    equal(result, expected);
});

test('putout: processor: json: fromJS: __ignore', ({equal}) => {
    const source = `__putout_processor_ignore([1, 2]);\n`;
    const result = fromJS(source, __ignore);
    const expected = '[1, 2]\n';
    
    equal(result, expected);
});

test('putout: processor: json: fromJS: __ignore_name', ({equal}) => {
    const source = `__putout_processor_ignore([1, 2]);\n`;
    const result = fromJS(source, __ignore_name);
    const expected = '[1, 2]\n';
    
    equal(result, expected);
});

test('putout: processor: json: isJSON', ({ok}) => {
    const source = `__putout_processor_ignore([1, 2]);\n`;
    const result = isJSON(source);
    
    ok(result);
});

test('putout: processor: json: isJSON: false', ({notOk}) => {
    const source = `abc([1, 2]);\n`;
    const result = isJSON(source);
    
    notOk(result);
});

test('putout: processor: json: __json_name', ({equal}) => {
    equal(__json_name, '__putout_processor_json');
});
