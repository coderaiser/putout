import test from 'supertape';
import {
    transform,
    findPlaces,
} from '../lib/putout.js';

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
