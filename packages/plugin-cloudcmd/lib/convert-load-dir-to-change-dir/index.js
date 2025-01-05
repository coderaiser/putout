'use strict';

const {operator} = require('putout');
const {rename, remove} = operator;

const renameAll = (path) => {
    rename(path, 'loadDir', 'changeDir');
};

module.exports.report = () => `Use 'CloudCmd.changeDir()' instead of 'CloudCmd.loadDir()'`;

module.exports.replace = () => ({
    'CloudCmd.loadDir({path})': 'CloudCmd.changeDir(path)',
    'CloudCmd.loadDir({path: __a})': 'CloudCmd.changeDir(__a)',
    'CloudCmd.loadDir(__object)': (vars, path) => {
        convert(path);
        path.node.callee.property.name = 'changeDir';
        
        return path;
    },
    'loadDir({path: __a})': (vars, path) => {
        renameAll(path);
        return 'changeDir(__a)';
    },
    'loadDir({path})': (vars, path) => {
        renameAll(path);
        return 'changeDir(path)';
    },
    'loadDir(__object)': (vars, path) => {
        convert(path);
        renameAll(path);
        
        return path;
    },
    'changeDir({path: __a})': 'changeDir(__a)',
    'changeDir({path})': 'changeDir(path)',
    'changeDir(__object)': (vars, path) => {
        convert(path);
        
        return path;
    },
});

function convert(path) {
    const args = path.node.arguments;
    const [obj] = path.get('arguments');
    const properties = obj.get('properties');
    
    for (const property of properties) {
        const keyPath = property.get('key');
        
        if (keyPath.isIdentifier({name: 'path'})) {
            args.unshift(property.node.value);
            remove(property);
            break;
        }
    }
}
