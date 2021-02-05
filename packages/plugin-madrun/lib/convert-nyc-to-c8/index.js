'use strict';

const {
    template,
    operator,
} = require('putout');

const {replaceWith} = operator;

const getProperty = require('../get-property');

module.exports.report = () => {
    return `coverage should use "c8" instead of "nyc"`;
};

module.exports.fix = ({path, line}) => {
    const c8 = line.replace('nyc', 'c8');
    replaceWith(path, template.ast(c8));
};

module.exports.traverse = ({push}) => {
    return {
        'export default __object'(path) {
            const rightPath = path.get('declaration');
            const coverage = getProperty(rightPath, 'coverage');
            
            if (!coverage)
                return;
            
            const bodyPath = coverage.get('value.body');
            const line = bodyPath.toString();
            
            if (line.includes('c8') || !line.includes('nyc'))
                return;
            
            push({
                path: bodyPath,
                line,
            });
        },
    };
};

