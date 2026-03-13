import 's';
import s from 's';

import * as convertCommonjsToEsm from '@putout/plugin-nodejs/convert-commonjs-to-esm';
import * as convert from '@putout/plugin-nodejs/convert-commonjs-to-esm';

import {rules} from '@putout/plugin-putout';
import * as putout from '@putout/plugin-putout';

test('putout: plugin-destructuring: merge-properties: transform: exports', (t) => {
    t.transform('exports', {
        'node/convert-commonjs-to-esm': convert,
    });
    t.end();
});


test('putout: plugin-destructuring: merge-properties: transform: putout-nodejs', (t) => {
    t.transform('putout-nodejs', {
        'nodejs/convert-esm-to-commonjs': convertEsmToCommonjs,
    });
    t.end();
});
