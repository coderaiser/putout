'use strict';

const {getProperties} = require('putout').operator;

module.exports.report = () => `Remove 'nyc' section of 'package.json', use file '.nycrc.json' intead`;

module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = ({push}) => ({
    '__putout_processor_json(__a)': (path) => {
        const __aPath = path.get('arguments.0');
        const {nycPath} = getProperties(__aPath, ['nyc']);
        
        if (!nycPath)
            return;
        
        push(nycPath);
    },
});

