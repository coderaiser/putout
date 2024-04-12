'use strict';

const {once} = require('events');
const putout = require('putout');
const montag = require('montag');
const test = require('supertape');
const {createProgress} = require('@putout/engine-runner/progress');

const {traverseProperties} = require('./traverse-properties');
const {
    parse,
    template,
    traverse,
} = putout;

test('operate: traverse-properties', (t) => {
    const object = template.ast('x({"a": "b"})');
    const [propertyPath] = traverseProperties(object, 'a');
    
    t.equal(propertyPath.node.key.value, 'a');
    t.end();
});

test('operate: traverse-properties: traverse', (t) => {
    const source = 'x({"a": "b"})';
    let propertyPath;
    
    traverse(parse(source), {
        CallExpression(path) {
            [propertyPath] = traverseProperties(path, 'a');
        },
    });
    
    t.equal(propertyPath.node.key.value, 'a');
    t.end();
});

test('operate: traverse-properties: traverse: ObjectExpression: path', (t) => {
    const source = '({"a": "b"})';
    let propertyPath;
    
    traverse(parse(source), {
        ObjectExpression(path) {
            [propertyPath] = traverseProperties(path, 'a');
        },
    });
    
    t.equal(propertyPath.node.key.value, 'a');
    t.end();
});

test('operate: traverse-properties: traverse: ObjectExpression: no parentPath', (t) => {
    const source = '({"a": "b"})';
    let propertyPath;
    
    traverse(parse(source), {
        ObjectExpression(path) {
            delete path.parentPath;
            [propertyPath] = traverseProperties(path, 'a');
        },
    });
    
    t.equal(propertyPath.node.key.value, 'a');
    t.end();
});

test('operate: traverse-properties: traverse: ObjectExpression: node', (t) => {
    const source = '({"a": "b"})';
    let propertyPath;
    
    traverse(parse(source), {
        ObjectExpression(path) {
            [propertyPath] = traverseProperties(path.node, 'a');
        },
    });
    
    t.equal(propertyPath.node.key.value, 'a');
    t.end();
});

test('operate: traverse-properties: traverse: ObjectExpression: firstLevel', (t) => {
    const source = '({"a": "b", "x": {"a": 5}})';
    let list = [];
    
    traverse(parse(source), {
        ObjectExpression(path) {
            list = traverseProperties(path, 'a', {
                firstLevel: true,
            });
            path.stop();
        },
    });
    
    t.equal(list.length, 1);
    t.end();
});

test('operate: traverse-properties: traverse: SpreadElement: firstLevel', (t) => {
    const source = '({"a": "b", "x": {"a": 5}, ...x})';
    let list = [];
    
    traverse(parse(source), {
        ObjectExpression(path) {
            list = traverseProperties(path, 'a', {
                firstLevel: true,
            });
            path.stop();
        },
    });
    
    t.equal(list.length, 1);
    t.end();
});

test('operate: traverse-properties: traverse: Identifier', (t) => {
    const source = '({a: "b", "x": {a: 5}, ...x})';
    let list = [];
    
    traverse(parse(source), {
        ObjectExpression(path) {
            list = traverseProperties(path, 'a', {
                firstLevel: true,
            });
            path.stop();
        },
    });
    
    t.equal(list.length, 1);
    t.end();
});

test('operate: traverse-properties: object inside array', (t) => {
    const source = `
        __putout_processor_json({
            "type": "directory",
            "name": "/",
            "files": [{
                "name": "/abc",
                "type": "directory",
                "files": []
            }, {
                "name": "/hello",
                "type": "directory",
                "files": []
            }, {
                "name": "/world.txt",
                "type": "file",
            }]
        });
    `;
    
    let propertyPath;
    
    traverse(parse(source), {
        CallExpression(path) {
            const helloPath = path.get('arguments.0.properties.2.value.elements.1');
            [propertyPath] = traverseProperties(helloPath, 'name');
        },
    });
    
    t.equal(propertyPath.node.value.value, '/hello');
    t.end();
});

test('operate: traverse-properties: filesystem', async (t) => {
    const progress = createProgress();
    const source = montag`
        __putout_processor_filesystem([
            '/coverage/'
        ]);
    `;
    
    const [[{pluginsIndex, pluginsCount}]] = await Promise.all([
        once(progress, 'push'),
        putout(source, {
            progress,
            rules: {
                'filesystem/remove-files': ['on', {
                    names: ['coverage'],
                }],
            },
            plugins: ['filesystem'],
        }),
    ]);
    
    t.equal(pluginsCount, 2);
    t.end();
});
