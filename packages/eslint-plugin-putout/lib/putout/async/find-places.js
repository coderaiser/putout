'use strict';

const {findPlacesAsync} = require('putout');

const tryToCatch = require('try-to-catch');
const {runAsWorker} = require('synckit');
const parseOptions = require('putout/parse-options');

runAsWorker(async ({name, options, ast, text}) => {
    const resultOptions = parseOptions({
        name,
        options,
    });
    
    return await tryToCatch(findPlacesAsync, ast, text, resultOptions);
});
