'use strict';

const {getProperties} = require('putout').operator;

module.exports.report = () => 'Set 🐊 in description';

module.exports.traverse = ({push}) => ({
    '__putout_processor_json(__a)': (path) => {
        const __aPath = path.get('arguments.0');
        const {descriptionPath} = getProperties(__aPath, [
            'description',
        ]);
        
        if (!descriptionPath)
            return;
        
        const description = descriptionPath.node.value;
        
        if (!description.value.startsWith('putout plugin'))
            return;
        
        push(descriptionPath);
    },
});

module.exports.fix = (path) => {
    path.node.value.value = path.node.value.value.replace('putout plugin', '🐊Putout plugin');
};

