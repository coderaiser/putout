import {operator, template} from 'putout';

const {
    remove,
    replaceWith,
    getProperty,
    createTypeChecker,
} = operator;

const isStringValue = createTypeChecker([
    '+: node.value -> StringLiteral',
]);

export const report = () => `Use 'output.library' object instead of 'libraryTarget'`;

export const fix = ({libraryProp, libraryTargetProp, libraryExportProp}) => {
    const libraryValuePath = libraryProp.get('value');
    const name = libraryValuePath.node.value;
    const type = libraryTargetProp.node.value.value;
    
    remove(libraryTargetProp);
    
    if (libraryExportProp) {
        const exportVal = libraryExportProp.node.value.value;
        remove(libraryExportProp);
        replaceWith(libraryValuePath, template.ast(`({
            name: '${name}',
            type: '${type}',
            export: '${exportVal}',
        })`));
    } else {
        replaceWith(libraryValuePath, template.ast(`({
            name: '${name}',
            type: '${type}',
        })`));
    }
    
    delete libraryProp.node.loc;
};

export const traverse = ({push}) => ({
    ObjectExpression(path) {
        const libraryTargetProp = getProperty(path, 'libraryTarget');
        
        if (!libraryTargetProp)
            return;
        
        const libraryProp = getProperty(path, 'library');
        const libraryExportProp = getProperty(path, 'libraryExport');
        
        if (!libraryProp || !isStringValue(libraryProp))
            return;
        
        if (!isStringValue(libraryTargetProp))
            return;
        
        if (libraryExportProp && !isStringValue(libraryExportProp))
            return;
        
        push({
            path,
            libraryProp,
            libraryTargetProp,
            libraryExportProp,
        });
    },
});
