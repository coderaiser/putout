import {operator, template} from 'putout';

const {remove, replaceWith} = operator;

const isLibrary = (path) => path.get('key').isIdentifier({
    name: 'library',
});

const isLibraryTarget = (path) => path.get('key').isIdentifier({
    name: 'libraryTarget',
});

const isLibraryExport = (path) => path.get('key').isIdentifier({
    name: 'libraryExport',
});

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
        const properties = path.get('properties');
        const libraryTargetProp = properties.find(isLibraryTarget);
        
        if (!libraryTargetProp)
            return;
        
        push({
            path,
            libraryProp: properties.find(isLibrary),
            libraryTargetProp,
            libraryExportProp: properties.find(isLibraryExport),
        });
    },
});
