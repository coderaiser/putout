import {operator} from 'putout';
import * as convert from './convert/index.js';

const {matchFiles} = operator;

export const {
    report,
    fix,
    scan,
} = matchFiles({
    '__name.toml -> __name.yaml': convert,
});
