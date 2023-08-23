'use strict';

const {findPlaces} = require('putout');

const tryCatch = require('try-catch');
const {runAsWorker} = require('synckit');
const parseOptions = require('putout/parse-options');

runAsWorker(({name, options, ast, text}) => {
    const resultOptions = parseOptions({
        name,
        options,
    });
    
    return tryCatch(findPlaces, ast, text, resultOptions);
});
