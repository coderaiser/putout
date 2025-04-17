import {operator} from 'putout';
import typescript from '../typescript.js';

const {matchFiles} = operator;
const plugin = {
    rules: typescript,
};

const {
    scan,
    fix,
    report,
} = matchFiles({
    '*.ts': plugin,
});

export {
    scan,
    fix,
    report,
};
