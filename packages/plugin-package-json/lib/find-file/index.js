import {operator} from 'putout';
import {rules} from '../package-json.js';

const plugin = {
    rules,
};

const {matchFiles} = operator;

const {
    scan,
    report,
    fix,
} = matchFiles({
    'package.json': plugin,
});

export {
    scan,
    report,
    fix,
};
