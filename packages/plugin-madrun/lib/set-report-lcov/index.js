import {template, operator} from 'putout';

const {getProperty, replaceWith} = operator;

const REPORT_SCRIPT = '"c8 report --reporter=lcov"';

export const report = () => 'Report should use "lcov" instead of "text-lcov"';

export const fix = ({path}) => {
    replaceWith(path, template.ast(REPORT_SCRIPT));
};

export const traverse = ({push}) => ({
    'export default __object'(path) {
        const rightPath = path.get('declaration');
        const reportPath = getProperty(rightPath, 'report');
        
        add(reportPath, {
            push,
        });
    },
});

function add(currentPath, {push}) {
    if (!currentPath)
        return;
    
    const bodyPath = currentPath.get('value.body');
    const line = bodyPath.toString();
    
    if (!line.includes('text-lcov'))
        return;
    
    push({
        path: bodyPath,
        line,
    });
}
