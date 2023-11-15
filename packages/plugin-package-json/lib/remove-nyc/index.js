'use strict';

const {operator} = require('putout');
const {
    remove,
    getProperties,
    __json,
} = operator;

module.exports.report = () => `Remove 'nyc' section of 'package.json', use file '.nycrc.json' instead`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    [__json]: (path) => {
        const __aPath = path.get('arguments.0');
        const {nycPath} = getProperties(__aPath, ['nyc']);
        
        if (!nycPath)
            return;
        
        push(nycPath);
    },
});
