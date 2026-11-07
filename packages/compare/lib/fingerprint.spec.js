import test from 'supertape';
import {template} from '@putout/engine-parser';
import {matchFingerprint} from './fingerprint.js';

const {ast} = template;
const ignore = new Set([
    'loc',
    'start',
    'end',
    'extra',
]);

test('compare: fingerprint: same', (t) => {
    const result = matchFingerprint(ast.fresh('a.forEach(b)'), ast('a.forEach(b)'), ignore);
    
    t.ok(result);
    t.end();
});

test('compare: fingerprint: different', (t) => {
    const result = matchFingerprint(ast.fresh('a.map(b)'), ast('a.forEach(b)'), ignore);
    
    t.notOk(result);
    t.end();
});

test('compare: fingerprint: placeholder', (t) => {
    const result = matchFingerprint(ast.fresh('x.y.forEach(z)'), ast('__a.forEach(__b)'), ignore);
    
    t.ok(result);
    t.end();
});

test('compare: fingerprint: array', (t) => {
    const result = matchFingerprint(ast.fresh('f(1)'), ast('f(2)'), ignore);
    
    t.ok(result);
    t.end();
});

test('compare: fingerprint: stop', (t) => {
    const result = matchFingerprint(ast.fresh('if (a) {x()}'), ast('if (a) {}'), ignore);
    
    t.ok(result);
    t.end();
});

test('compare: fingerprint: not object', (t) => {
    const node = ast.fresh('a.forEach(b)');
    
    node.callee = null;
    
    const result = matchFingerprint(node, ast('a.forEach(b)'), ignore);
    
    t.notOk(result);
    t.end();
});
