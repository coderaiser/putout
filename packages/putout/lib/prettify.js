'use strict';

const {
    table,
    getBorderCharacters,
} = require('table');

const {
    underline,
    red,
    grey,
} = require('chalk');

module.exports = (name, places) => {
    const data = [];
    
    for (const place of places) {
        const {
            message,
            position,
            rule,
        } = place;
        
        const {
            line,
            column,
        } = position;
        
        data.push([
            grey(`${line}:${column}`),
            `${red('error')}   ${message}`,
            grey(rule),
        ]);
    }
    
    if (!data.length)
        return '';
    
    return [
        underline(name),
        table(data, {
            border: getBorderCharacters('void'),
            drawHorizontalLine: () => false,
        }),
    ].join('\n');
};

