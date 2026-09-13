import {parse as parseAcorn} from '@putout/engine-parser/acorn';
import {parse as parseEspree} from '@putout/engine-parser/espree';
import {parse as parseEsprima} from '@putout/engine-parser/esprima';
import {parse as parseBabel} from '@putout/engine-parser/babel';
import * as babelOptions from '@putout/engine-parser/babel/options';

const fn = (a: string) => a;

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
parseAcorn(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
parseEspree(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
parseEsprima(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
parseBabel(5);

// THROWS Argument of type 'boolean' is not assignable to parameter of type 'string'
fn(babelOptions.allowReturnOutsideFunction);
