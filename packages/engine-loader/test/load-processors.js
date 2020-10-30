'use strict';

const test = require('supertape');
const {loadProcessors} = require('..');

test('putout: engine-loader: load processors', (t) => {
    loadProcessors({
        processors: [
            'javascript',
        ],
    });
    t.end();
});

test('putout: engine-loader: load processors: no processors', (t) => {
    loadProcessors({});
    t.end();
});

