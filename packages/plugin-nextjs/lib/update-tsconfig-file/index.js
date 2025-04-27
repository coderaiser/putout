import {operator} from 'putout';
import * as updateTSConfig from '../update-tsconfig/index.js';

const {matchFiles} = operator;

export const {
    report,
    fix,
    scan,
} = matchFiles({
    'tsconfig.json': updateTSConfig,
});
