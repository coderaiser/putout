import {operator} from 'putout';
import {rules} from '../package-json.js';

const plugin = {
    rules,
};

const {matchFiles} = operator;

export const {
    scan,
    report,
    fix,
} = matchFiles({
    'package.json': {
        printer: ['putout', {
            format: {
                indent: '  ',
            },
        }],
        plugins: [
            ['package-json', plugin],
        ],
    },
});
