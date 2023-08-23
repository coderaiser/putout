'use strict';

const {transform, print} = require('putout');

const {runAsWorker} = require('synckit');
const parseOptions = require('putout/parse-options');

runAsWorker(({name, options, ast}) => {
    const resultOptions = parseOptions({
        name,
        options,
    });
    
    /*
    const places = transform(ast, text, {
        rules: updatedRules,
        plugins: parsePlugins(rules),
    });
    */
    /*
    const places = transform(ast, text, {
        rules: updatedRules,
        plugins: parsePlugins(rules),
    });
    */
    //    if (!places.length)
    transform(ast, print(ast), resultOptions);
    
    return ast;
});
