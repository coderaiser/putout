import {operator} from 'putout';
import * as rcToFlat from './rc-to-flat/index.js';

const {matchFiles} = operator;

export default matchFiles({
    '.eslintrc.json -> eslint.config.js': rcToFlat,
});
