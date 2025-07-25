import {operator} from 'putout';
import * as typescript from '../index.js';

const {matchFiles} = operator;

export const {
    scan,
    fix,
    report,
} = matchFiles({
    '*.ts': typescript,
});
