import {operator} from 'putout';
import * as convert from './convert/index.js';

const {matchFiles} = operator;
const {
    report,
    fix,
    scan,
} = matchFiles({
    '__name.json -> __name.js': convert,
});

export {
    report,
    fix,
    scan,
};
