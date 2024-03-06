import {writeFileSync, readFileSync} from 'node:fs';
import tryCatch from 'try-catch';

const {stringify, parse} = JSON;
const [, rawConfig = '{}'] = tryCatch(readFileSync, './.putout.json', 'utf8');

const putoutConfig = parse(rawConfig);

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

if (putoutConfig.rules?.['putout/create-test'])
    delete result.rules;

writeFileSync('./.putout.json', stringify(result, null, 4));
console.log(result);
