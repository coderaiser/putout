import s from 's';
import * as convertCommonjsToEsm from '@putout/plugin-nodejs/convert-commonjs-to-esm';
import * as putout from '@putout/plugin-putout';

const {rules: rules} = putout;

test('putout: plugin-destructuring: merge-properties: transform: exports', (t) => {
    t.transform('exports', {
        'node/convert-commonjs-to-esm': convertCommonjsToEsm,
    });
    t.end();
});

test('putout: plugin-destructuring: merge-properties: transform: putout-nodejs', (t) => {
    t.transform('putout-nodejs', {
        'nodejs/convert-esm-to-commonjs': convertEsmToCommonjs,
    });
    t.end();
});
