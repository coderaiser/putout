'use strict';

const {Linter} = require('eslint');
const {convertToPlace} = require('../eslint.js');

module.exports.lint = (source, {fix = true, plugins, filename, options = []}) => {
    const linter = new Linter({
        configType: 'flat',
    });
    
    const allOptions = [];
    
    if (plugins) {
        const [name, plugin] = plugins[0];
        
        allOptions.push({
            rules: {
                [`${name}/plugin`]: 'error',
            },
            plugins: {
                [name]: {
                    rules: {
                        plugin,
                    },
                },
            },
        });
    }
    
    allOptions.push(...options);
    
    const mainOptions = {};
    
    if (filename)
        mainOptions.filename = filename;
    
    if (!fix) {
        const places = linter
            .verify(source, allOptions, mainOptions)
            .map(convertToPlace);
        
        return [source, places];
    }
    
    const {output, messages} = linter.verifyAndFix(source, allOptions, mainOptions);
    
    return [output, messages.map(convertToPlace)];
};
