'use strict';

const {join} = require('path');

const test = require('supertape');
const stub = require('@cloudcmd/stub');

const parseOptions = require('./parse-options');

test(
    'putout: parse-options: custom options rules overrides default match',
    (t) => {
        const customOptions = {
            rules: {
                'remove-only': 'on',
            },
        };
        
        const getOptions = stub().returns([
            join(__dirname, '..'),
            customOptions,
        ]);
        
        const {rules} = parseOptions({
            getOptions,
        });
        
        const result = rules['remove-only'];
        
        t.equal(result, 'on');
        t.end();
    },
);

