import {operator} from 'putout';
import typescript from '../typescript.js';

const {matchFiles} = operator;
const plugin = {
    rules: typescript,
};

export const {
    scan,
    fix,
    report,
} = matchFiles({
    '*.ts': plugin,
});
