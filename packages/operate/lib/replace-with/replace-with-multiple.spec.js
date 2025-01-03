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

test('putout: operate: replace-with: replaceWithMultiple: comments', (t) => {
    const source = fixture.replaceWithMultipleLeadingCommentConst;
    const {code} = putout(source, {
        plugins: [
            ['group-by-id', {
                report: () => 'Group require by id',
                fix: ({grouped}) => {
                    const [first, ...others] = grouped;
                    const nodes = [first.node];
                    
                    for (const current of others) {
                        const {node} = current;
                        
                        current.remove();
                        nodes.push(node);
                    }
                    
                    replaceWithMultiple(first, nodes);
                },
                
                traverse: ({pathStore, push}) => ({
                    'const __ = require(__)': (path) => {
                        if (!path.parentPath.isProgram())
                            return;
                        
                        pathStore(path);
                    },
                    'Program': {
                        exit(path) {
                            const external = [];
                            const internal = [];
                            const all = pathStore();
                            
                            for (const current of all) {
                                const [declaration] = current.node.declarations;
                                const {value} = declaration.init.arguments[0];
                                
                                if (!value || value.startsWith('.')) {
                                    internal.push(current);
                                    continue;
                                }
                                
                                external.push(current);
                            }
                            
                            const grouped = [
                                ...external,
                                ...internal,
                            ];
                            
                            push({
                                path,
                                grouped,
                            });
                        },
                    },
                }),
            }],
        ],
    });
    
    const expected = fixture.replaceWithMultipleLeadingCommentConstFix;
    
    t.equal(code, expected);
    t.end();
});
