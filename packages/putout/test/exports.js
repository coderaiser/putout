import {readFileSync} from 'node:fs';
import test from 'supertape';
import {transform, findPlaces} from '../lib/putout.js';

const {parse} = JSON;

test('putout: exports: putout-options', async (t) => {
    const {putout, default: internal} = await import('putout');
    
    t.equal(putout, internal);
    t.end();
});

test('putout: exports: putout/parse-options', async (t) => {
    const parseOptions = await import('putout/parse-options');
    const internal = await import('../lib/parse-options/index.js');
    
    t.equal(parseOptions, internal);
    t.end();
});

test('putout: exports: putout/exit-codes', async (t) => {
    const {OK} = await import('putout/exit-codes');
    
    t.equal(OK, 0);
    t.end();
});

test('putout: exports: putout/transform', async (t) => {
    const {transform: external} = await import('putout/transform');
    
    t.equal(external, transform);
    t.end();
});

test('putout: exports: putout/find-places', async (t) => {
    const {findPlaces: external} = await import('putout/find-places');
    
    t.equal(external, findPlaces);
    t.end();
});

test('putout: exports: putout/register', (t) => {
    const infoPath = new URL('../package.json', import.meta.url);
    const info = parse(readFileSync(infoPath, 'utf8'));
    const exists = info.exports['./register'];
    
    t.ok(exists);
    t.end();
});
