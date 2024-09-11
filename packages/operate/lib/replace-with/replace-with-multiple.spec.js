'use strict';

const putout = require('putout');

const {test} = require('supertape');
const {types} = require('@putout/babel');
const {replaceWithMultiple} = require('./replace-with-multiple');
const {readFixtures} = require('../../test/fixture');

const {CallExpression} = types;
const fixture = readFixtures(__dirname);

test('putout: operate: replace-with: replaceWithMultiple', (t) => {
    const source = fixture.replaceWithMultipleLeadingComment;
    const {code} = putout(source, {
        plugins: [
            ['split-stack-operations', {
                report: () => ``,
                fix: (path) => {
                    const {callee} = path.node;
                    const [first] = path.get('arguments');
                    const {elements} = first.node;
                    const nodes = [];
                    
                    for (const element of elements) {
                        nodes.push(CallExpression(callee, [element]));
                    }
                    
                    replaceWithMultiple(path, nodes);
                },
                
                include: () => [
                    'push(__array)',
                    'pop(__array)',
                ],
            }],
        ],
    });
    
    const expected = fixture.replaceWithMultipleLeadingCommentFix;
    
    t.equal(code, expected);
    t.end();
});
