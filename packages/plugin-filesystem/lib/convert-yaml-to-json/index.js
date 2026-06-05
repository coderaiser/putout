import {operator} from 'putout';
import * as convert from './convert/index.js';

const {matchFiles} = operator;

export const {
    report,
    fix,
    scan,
} = matchFiles({
    '__name.yaml -> __name.json': convert,
    '__name.yml -> __name.json': convert,
});
