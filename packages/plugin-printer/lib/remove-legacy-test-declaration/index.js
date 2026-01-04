import {operator} from 'putout';

const {compare} = operator;
const EXTEND = `
    const test = extend({
        print: printExtension,
    })
`;

export const report = () => `Remove legacy test declaration`;

export const match = () => ({
    'const fixture = __': check,
    'const {printExtension} = __': check,
    'const {readFixtures} = __': check,
    [EXTEND]: check,
});

export const replace = () => ({
    'const fixture = __': '',
    'const {printExtension} = __': '',
    'const {readFixtures} = __': '',
    [EXTEND]: '',
});

function check(vars, path) {
    const programPath = path.scope.getProgramParent().path;
    
    for (const current of programPath.node.body) {
        if (compare(current, 'module.exports.createTest = (__args) => __body'))
            return false;
        
        if (compare(current, 'export const createTest = (__args) => __body'))
            return false;
    }
    
    return true;
}
