'use strict';

const {Linter} = require('eslint');
const {convertToPlace} = require('../eslint.js');

module.exports.lint = (source, {fix = true, plugins}) => {
    const [name, plugin] = plugins[0];
    const linter = new Linter({
        configType: 'flat',
    });
    
    const options = {
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
    };
    
    if (!fix) {
        const places = linter.verify(source, options).map(convertToPlace);
        return [source, places];
    }
    
    const {output, messages} = linter.verifyAndFix(source, options);
    
    return [output, messages.map(convertToPlace)];
};

