'use strict';

const {traverse} = require('@putout/traverse');
const {extract} = require('@putout/operate');
const {StringLiteral} = require('@putout/babel').types;
const isString = (a) => typeof a === 'string';

module.exports.parseTemplateFunctions = (path) => {
    traverse(path, {
        '__extract(__a)'(path) {
            const [__a] = path.node.arguments;
            const extracted = extract(__a);
            
            if (isString(extracted))
                path.replaceWith(StringLiteral(extracted));
        },
    });
};
