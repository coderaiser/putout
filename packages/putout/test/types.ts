import {putout} from 'putout';

const ast = putout.parse('const a = 3');
putout.print(ast);
