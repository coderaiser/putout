'use strict';

const {operator} = require('putout');
const {traverse} = operator;

const EXTEND = `
    const test = extend({
        print: printExtension,
    })
`;

module.exports.report = () => `Remove legacy test declaration`;

module.exports.match = () => ({
    'const fixture = __': check,
    'const {printExtension} = __': check,
    'const {readFixtures} = __': check,
    [EXTEND]: check,
});

module.exports.replace = () => ({
    'const fixture = __': '',
    'const {printExtension} = __': '',
    'const {readFixtures} = __': '',
    [EXTEND]: '',
});

function check(vars, path) {
    let is = true;
    const programPath = path.scope.getProgramParent().path;
    
    traverse(programPath, {
        'module.exports.createTest = (__args) => __body': () => {
            is = false;
        },
    });
    return is;
}
