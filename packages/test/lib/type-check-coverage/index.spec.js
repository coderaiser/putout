import {test, stub} from 'supertape';
import {
    createGetCoverage,
    whenTestsEnds,
} from './index.js';

const OWN = '    at file:///home/user/putout/packages/plugin-for-of/lib/for-each/index.js:34:16';
const OTHER = '    at file:///home/user/putout/packages/plugin-variables/lib/extract/index.js:12:20';

const createCoverage = () => new Map([
    [
        OWN, {
            covered: new Set([0]),
            typeNames: ['+: -> Identifier'],
        },
    ],
    [
        OTHER, {
            covered: new Set(),
            typeNames: ['+: -> Identifier'],
        },
    ],
]);

test('@putout/test: type-check-coverage: createGetCoverage: only checkers of current package', (t) => {
    const getCoverage = createGetCoverage({
        cwd: '/home/user/putout/packages/plugin-for-of',
        getCoverage: createCoverage,
    });
    
    const result = Array.from(
        getCoverage().keys(),
    );
    const expected = [OWN];
    
    t.deepEqual(result, expected);
    t.end();
});

test('@putout/test: type-check-coverage: createGetCoverage: default cwd: no checkers', (t) => {
    const getCoverage = createGetCoverage({
        getCoverage: createCoverage,
    });
    
    t.equal(getCoverage().size, 0);
    t.end();
});

test('@putout/test: type-check-coverage: whenTestsEnds: pass own coverage', (t) => {
    const whenTestsEndsStub = stub().returns(0);
    
    const result = whenTestsEnds({
        cwd: '/home/user/putout/packages/plugin-for-of',
        getCoverage: createCoverage,
        whenTestsEnds: whenTestsEndsStub,
    });
    
    const [[{getCoverage}]] = whenTestsEndsStub.args;
    const keys = Array.from(
        getCoverage().keys(),
    );
    const expected = [0, [OWN]];
    
    t.deepEqual([result, keys], expected);
    t.end();
});

test('@putout/test: type-check-coverage: whenTestsEnds: default', (t) => {
    const result = whenTestsEnds({
        getCoverage: () => new Map(),
        whenTestsEnds: stub().returns(0),
    });
    
    t.equal(result, 0);
    t.end();
});
