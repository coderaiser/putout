#!/usr/bin/env node

import {
    writeFileSync,
    readFileSync,
} from 'fs';
const {stringify, parse} = JSON;

const putoutConfig = parse(readFileSync('./.putout.json', 'utf8'));
const [cmd = 'add'] = process.argv.slice(2);

const additional = {
    printer: 'putout',
    rules: {
        'putout/create-test': ['on', {
            add: [
                ['printer', 'putout'],
            ],
        }],
    },
};

const result = {
    ...additional,
    ...putoutConfig,
};

if (cmd === 'drop') {
    delete result.rules;
}

writeFileSync('./.putout.json', stringify(result, null, 4));
console.log(result);
