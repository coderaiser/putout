import {test} from 'supertape';
import {montag} from 'montag';
import {
    toJS,
    fromJS,
    isJSON,
    isJSONGroup,
    isTOML,
    isDocker,
    isSQL,
    __yaml,
    __toml,
    __json,
    __json_name,
    __filesystem,
    __ignore,
    __ignore_name,
    __markdown,
    __sql,
} from './json.js';

test('putout: operator: json: toJS: filesystem', ({equal}) => {
    const source = '{"hello": "world"}';
    const result = toJS(source, __filesystem);
    const expected = montag`
        __putout_processor_filesystem({"hello": "world"});
    
    `;
    
    equal(result, expected);
});

test('putout: operator: json: toJS', ({equal}) => {
    const source = '{"hello": "world"}';
    const result = toJS(source, __json);
    const expected = montag`
        __putout_processor_json({"hello": "world"});
    
    `;
    
    equal(result, expected);
});

test('putout: operator: json: fromJS', ({equal}) => {
    const source = montag`
        __putout_processor_filesystem({"hello": "world"});
    
    `;
    const result = fromJS(source, __filesystem);
    const expected = '{"hello": "world"}\n';
    
    equal(result, expected);
});

test('putout: operator: json: fromJS: strict mode', ({equal}) => {
    const source = montag`
        'use strict'; __putout_processor_filesystem({"hello": "world"});
    
    `;
    const result = fromJS(source, __filesystem);
    const expected = '{"hello": "world"}\n';
    
    equal(result, expected);
});

test('putout: operator: json: fromJS: newline', ({equal}) => {
    const source = montag`
        __putout_processor_filesystem({"hello": "world"});
    `;
    const result = fromJS(source, __filesystem);
    const expected = '{"hello": "world"}\n';
    
    equal(result, expected);
});

test('putout: operator: json: toJS: __yaml', ({equal}) => {
    const source = '{"hello": "world"}';
    const result = toJS(source, __yaml);
    const expected = montag`
        __putout_processor_yaml({"hello": "world"});
    
    `;
    
    equal(result, expected);
});

test('putout: operator: json: toJS: __toml', ({equal}) => {
    const source = '{"hello": "world"}';
    const result = toJS(source, __toml);
    const expected = montag`
        __putout_processor_toml({"hello": "world"});
    
    `;
    
    equal(result, expected);
});

test('putout: operator: json: isTOML', ({ok}) => {
    const source = montag`
        __putout_processor_toml({"hello": "world"});
    
    `;
    const is = isTOML(source);
    
    ok(is);
});

test('putout: operator: json: isSQL', ({ok}) => {
    const source = montag`
        __putout_processor_sql(select('hello'));
    
    `;
    const is = isSQL(source);
    
    ok(is);
});

test('putout: operator: json: isDocker', ({ok}) => {
    const source = montag`
        __putout_processor_docker([
            ['MAINTAINER', 'docker@moby.com']
        ]);\n
    `;
    
    const is = isDocker(source);
    
    ok(is);
});

test('putout: operator: json: fromJS: more newlines', ({equal}) => {
    const source = montag`
        __putout_processor_filesystem({"hello": "world"}
        );
    
    `;
    const result = fromJS(source, __filesystem);
    const expected = '{"hello": "world"}\n';
    
    equal(result, expected);
});

test('putout: operator: json: fromJS: __ignore', ({equal}) => {
    const source = montag`
        __putout_processor_ignore([1, 2]);
    
    `;
    const result = fromJS(source, __ignore);
    const expected = '[1, 2]\n';
    
    equal(result, expected);
});

test('putout: operator: json: toJS: __markdown', ({equal}) => {
    const source = montag`
        [h1('hello')];
    
    `;
    const result = toJS(source, __markdown);
    const expected = montag`
        __putout_processor_markdown([h1('hello')]);
    
    `;
    
    equal(result, expected);
});

test('putout: operator: json: fromJS: __markdown', ({equal}) => {
    const source = montag`
        __putout_processor_markdown([h1('hello')]);
    
    `;
    const result = fromJS(source, __markdown);
    const expected = montag`
        [h1('hello')]
    
    `;
    
    equal(result, expected);
});

test('putout: operator: json: toJS: __sql', ({equal}) => {
    const source = montag`
        select('*', from('abc'));
    
    `;
    const result = toJS(source, __sql);
    const expected = montag`
        __putout_processor_sql(select('*', from('abc')));
    
    `;
    
    equal(result, expected);
});

test('putout: operator: json: fromJS: __sql', ({equal}) => {
    const source = montag`
        __putout_processor_sql(select('*', from('abc')));
    
    `;
    const result = fromJS(source, __sql);
    const expected = montag`
        select('*', from('abc'))
    
    `;
    
    equal(result, expected);
});

test('putout: operator: json: fromJS: __ignore_name', ({equal}) => {
    const source = montag`
        __putout_processor_ignore([1, 2]);
    
    `;
    const result = fromJS(source, __ignore_name);
    const expected = '[1, 2]\n';
    
    equal(result, expected);
});

test('putout: operator: json: isJSON', ({ok}) => {
    const source = montag`
        __putout_processor_json([1, 2]);
    
    `;
    const result = isJSON(source);
    
    ok(result);
});

test('putout: operator: json: isJSON: false', ({notOk}) => {
    const source = montag`
        __putout_processor_toml([1, 2]);
    
    `;
    const result = isJSON(source);
    
    notOk(result);
});

test('putout: operator: json: isJSONGroup', ({ok}) => {
    const source = montag`
        __putout_processor_json([1, 2]);
    
    `;
    const result = isJSONGroup(source);
    
    ok(result);
});

test('putout: operator: json: isJSONGroup: false', ({notOk}) => {
    const source = montag`
        abc([1, 2]);
    
    `;
    const result = isJSONGroup(source);
    
    notOk(result);
});

test('putout: operator: json: __json_name', ({equal}) => {
    equal(__json_name, '__putout_processor_json');
});
