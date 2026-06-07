import {operator} from 'putout';
import * as convert from './convert/index.js';

const {matchFiles} = operator;

export const {
    report,
    fix,
    scan,
} = matchFiles({
    '__name.yaml -> __name.toml': convert,
    '__name.yml -> __name.toml': convert,
});
