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
