'use strict';

const {transformAsync} = require('putout');

const {runAsWorker} = require('synckit');
const parseOptions = require('putout/parse-options');

runAsWorker(async ({name, options, ast, text}) => {
    const resultOptions = parseOptions({
        name,
        options,
    });
    
    await transformAsync(ast, text, resultOptions);
    
    return ast;
});
