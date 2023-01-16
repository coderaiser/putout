'use strict';

const rename = (path) => path.scope.rename('loadDir', 'changeDir');

module.exports.report = () => `Use 'CloudCmd.changeDir()' instead of 'CloudCmd.loadDir()'`;

module.exports.replace = () => ({
    'CloudCmd.loadDir({path})': 'CloudCmd.changeDir(path)',
    'CloudCmd.loadDir({path: __a})': 'CloudCmd.changeDir(__a)',
    'CloudCmd.loadDir(__object)': (vars, path) => {
        convert(vars, path);
        path.node.callee.property.name = 'changeDir';
        
        return path;
    },
    'loadDir({path: __a})': (vars, path) => {
        rename(path);
        return 'changeDir(__a)';
    },
    'loadDir({path})': (vars, path) => {
        rename(path);
        return 'changeDir(path)';
    },
    'loadDir(__object)': (vars, path) => {
        convert(vars, path);
        rename(path);
        
        return path;
    },
    'changeDir({path: __a})': 'changeDir(__a)',
    'changeDir({path})': 'changeDir(path)',
    'changeDir(__object)': (vars, path) => {
        convert(vars, path);
        
        return path;
    },
});

function convert(vars, path) {
    const args = path.node.arguments;
    const [obj] = path.get('arguments');
    const properties = obj.get('properties');
    
    for (const property of properties) {
        const keyPath = property.get('key');
        
        if (keyPath.isIdentifier({name: 'path'})) {
            args.unshift(property.node.value);
            property.remove();
            break;
        }
    }
}

