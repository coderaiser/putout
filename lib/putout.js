'use strict';

const recast = require('recast');
const alignSpaces = require('align-spaces');
const babelParser = require('@babel/parser');

const getVars = require('./get-vars');
const transform = require('./transform');
const getUnused = require('./get-unused');
const removeUnused = require('./remove-unused');
const cutShebang = require('./cut-shebang');

const parser = {
    parse(source) {
        return babelParser.parse(source);
    },
};

module.exports = (source) => {
    const [clearSource, shebang] = cutShebang(source);
    
    const ast = parse(clearSource);
    const vars = getVars(ast, {
        setLoc: true,
        setPath: true,
    });
    
    const transformed = transform(vars);
    const unused = getUnused(transformed);
    
    removeUnused(unused);
    
    const {code} = recast.print(ast, {
        trailingComma: true,
    });
    
    const aligned = alignSpaces(code);
    const result = fixStrictMode(aligned);
    
    return {
        code: `${shebang}${result}`,
        unused,
    };
};

// when unused variable located in a root scope
// near 'use strict' directive
// it generates something like this:
//
// "use strict";;
//
// or
//
// "use strict";
// const nextVar = require('some');
//
// in case unused variable located in function scope
// such problem doesn't occure but
// there is no way to determine scope of a variable
// before generating result
//
// tests :
// - strict-mode
// - return-statement
//
// In case removing with function do not fail any test
// should be removed as soon as possible

function fixStrictMode(a) {
    return a
        .replace(';;', ';')
        .replace(`'use strict';`, `'use strict';\n`)
        .replace(`'use strict';\n\n\n`, `'use strict';\n\n`);
}

module.exports.parse = parse;
function parse(source) {
    const ast = recast.parse(source, {
        parser,
        tokens: false,
    });
    
    return ast;
}

