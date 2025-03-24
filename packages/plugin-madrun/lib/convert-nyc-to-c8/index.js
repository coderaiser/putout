import {template, operator} from 'putout';

const {replaceWith, getProperty} = operator;

export const report = () => {
    return `Use 'c8' instead of 'nyc' to get code coverage`;
};

export const fix = ({path, line}) => {
    const c8 = line.replace('nyc', 'c8');
    replaceWith(path, template.ast(c8));
};

export const traverse = ({push}) => ({
    'module.exports = __object': addAll('right', push),
    'export default __object': addAll('declaration', push),
});

const addAll = (name, push) => (path) => {
    const rightPath = path.get(name);
    
    const coveragePath = getProperty(rightPath, 'coverage');
    const reportPath = getProperty(rightPath, 'report');
    
    add(coveragePath, {
        push,
    });
    add(reportPath, {
        push,
    });
};

function add(currentPath, {push}) {
    if (!currentPath)
        return;
    
    const bodyPath = currentPath.get('value.body');
    const line = bodyPath.toString();
    
    if (line.includes('c8') || !line.includes('nyc'))
        return;
    
    push({
        path: bodyPath,
        line,
    });
}
