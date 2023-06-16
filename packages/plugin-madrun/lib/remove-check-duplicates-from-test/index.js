'use strict';

const {template, operator} = require('putout');

const {replaceWith, getProperty} = operator;

module.exports.report = () => 'test: "-d" can be removed, duplicates checked by default';

module.exports.fix = ({path, line}) => {
    const c8 = line.replace('tape -d', 'tape');
    replaceWith(path, template.ast(c8));
};

module.exports.traverse = ({push}) => ({
    'export default __object'(path) {
        const declarationPath = path.get('declaration');
        const testPath = getProperty(declarationPath, 'test');
        
        add(testPath, {
            push,
        });
    },
});

function add(currentPath, {push}) {
    if (!currentPath)
        return;
    
    const bodyPath = currentPath.get('value.body');
    const line = bodyPath.toString();
    
    if (!line.includes('tape -d'))
        return;
    
    push({
        path: bodyPath,
        line,
    });
}
