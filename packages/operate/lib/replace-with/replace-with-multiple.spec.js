import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import putout from 'putout';
import {test} from 'supertape';
import * as esm from '@putout/plugin-esm';
import {replaceWithMultiple} from './replace-with-multiple.js';
import {readFixtures} from '../../test/fixture.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {types} = putout;
const {callExpression} = types;
const fixture = readFixtures(__dirname);
const groupImportsBySource = esm.rules['group-imports-by-source'];

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
                        nodes.push(callExpression(callee, [element]));
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

test('putout: operate: replace-with: replaceWithMultiple: trailing comments', (t) => {
    const source = fixture.replaceWithMultipleTrailingComment;
    const {code} = putout(source, {
        plugins: [
            ['group-imports-by-source', groupImportsBySource],
        ],
    });
    
    const expected = fixture.replaceWithMultipleTrailingCommentFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operate: replace-with: replaceWithMultiple: no SequenceExpression', (t) => {
    const source = fixture.replaceWithMultipleNoSequence;
    const {code} = putout(source, {
        plugins: [
            ['split-stack-operations', {
                report: () => ``,
                fix: (path) => {
                    const arg = path.node.arguments.pop();
                    replaceWithMultiple(path, [path.node, ...arg.elements]);
                },
                
                include: () => [
                    'heading(__a, __b, __c)',
                ],
            }],
        ],
    });
    
    const expected = fixture.replaceWithMultipleNoSequenceFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operate: replace-with: replaceWithMultiple: path passed', (t) => {
    const source = fixture.replaceWithMultipleNoSequence;
    const {code} = putout(source, {
        plugins: [
            ['split-stack-operations', {
                report: () => ``,
                fix: (path) => {
                    const arg = path.node.arguments.pop();
                    replaceWithMultiple(path, [path, ...arg.elements]);
                },
                
                include: () => [
                    'heading(__a, __b, __c)',
                ],
            }],
        ],
    });
    
    const expected = fixture.replaceWithMultipleNoSequenceFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operate: replace-with: replaceWithMultiple: empty', (t) => {
    const source = 'hello();\nworld();\n';
    const {code} = putout(source, {
        plugins: [
            ['remove-hello', {
                report: () => '',
                fix: (path) => {
                    replaceWithMultiple(path, []);
                },
                include: () => [
                    'hello()',
                ],
            }],
        ],
    });
    
    t.equal(code, 'world();\n');
    t.end();
});

const unwrapBlock = ['unwrap-block', {
    report: () => '',
    fix: (path) => {
        replaceWithMultiple(path, path.node.body);
    },
    include: () => [
        'BlockStatement',
    ],
    filter: (path) => path.parentPath.isBlockStatement(),
}];

test('putout: operate: replace-with: replaceWithMultiple: block: both comments', (t) => {
    const {code} = putout(fixture.replaceWithMultipleBlockBoth, {
        plugins: [unwrapBlock],
    });
    
    t.equal(code, fixture.replaceWithMultipleBlockBothFix);
    t.end();
});

test('putout: operate: replace-with: replaceWithMultiple: block: own comments', (t) => {
    const {code} = putout(fixture.replaceWithMultipleBlockOwn, {
        plugins: [unwrapBlock],
    });
    
    t.equal(code, fixture.replaceWithMultipleBlockOwnFix);
    t.end();
});
