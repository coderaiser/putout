'use strict';

const tryCatch = require('try-catch');
const visit = require('unist-util-visit');

const putout = require('putout');
const parseOptions = require('putout/parse-options');

module.exports = (options) => (node, file) => {
    visit(node, 'code', process(file, options));
};

const process = (file, options) => (node) => {
    const {lang} = node;
    
    if (!/js|javascript|typescript/.test(lang))
        return;
    
    const isTS = lang === 'typescript';
    const resultOptions = parseOptions({
        options: {
            ...options,
            fix: false,
        },
    });
    
    const [error, result] = tryCatch(putout, node.value, {
        ...resultOptions,
        isTS,
    });
    // Combine position of fenced code block with position
    // of code within the code block to produce actual location
    const fixedPosition = {
        line: node.position.start.line,
        column: node.position.start.column,
    };
    
    if (error)
        return file.message(error.message, fixedPosition);
    
    const {places} = result;
    
    for (const {message} of places) {
        const fixedPosition = {
            line: node.position.start.line,
            column: node.position.start.column,
        };
        
        file.message(message, fixedPosition);
    }
};

