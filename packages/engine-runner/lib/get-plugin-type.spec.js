import {test} from 'supertape';
import {getPluginType} from './get-plugin-type.js';

test('putout: runner: getPluginType: find', (t) => {
    const result = getPluginType({
        find: () => {},
    });
    const expected = 'finder';
    
    t.equal(result, expected);
    t.end();
});

test('putout: runner: getPluginType: traverse', (t) => {
    const result = getPluginType({
        traverse: () => {},
    });
    const expected = 'traverser';
    
    t.equal(result, expected);
    t.end();
});

test('putout: runner: getPluginType: replace', (t) => {
    const result = getPluginType({
        replace: () => {},
    });
    const expected = 'replacer';
    
    t.equal(result, expected);
    t.end();
});

test('putout: runner: getPluginType: declare', (t) => {
    const result = getPluginType({
        declare: () => {},
    });
    const expected = 'declarator';
    
    t.equal(result, expected);
    t.end();
});

test('putout: runner: getPluginType: include', (t) => {
    const result = getPluginType({
        include: () => {},
    });
    const expected = 'includer';
    
    t.equal(result, expected);
    t.end();
});

test('putout: runner: getPluginType: scan', (t) => {
    const result = getPluginType({
        scan: () => {},
    });
    const expected = 'scanner';
    
    t.equal(result, expected);
    t.end();
});

test('putout: runner: getPluginType: find wins over traverse', (t) => {
    const result = getPluginType({
        find: () => {},
        traverse: () => {},
    });
    const expected = 'finder';
    
    t.equal(result, expected);
    t.end();
});

test('putout: runner: getPluginType: traverse wins over replace', (t) => {
    const result = getPluginType({
        traverse: () => {},
        replace: () => {},
    });
    const expected = 'traverser';
    
    t.equal(result, expected);
    t.end();
});

test('putout: runner: getPluginType: unknown', (t) => {
    const result = getPluginType({
        report: () => {},
    });
    const expected = 'unknown';
    
    t.equal(result, expected);
    t.end();
});
