'use strict';

const {
    table,
    getBorderCharacters,
} = require('table');

const {
    underline,
    red,
    grey,
    bold,
    redBright,
} = require('chalk');

let output = [];

module.exports = ({name, places, index, count, filesCount, errorsCount}) => {
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
    
    output.push([
        underline(name),
        table(data, {
            border: getBorderCharacters('void'),
            drawHorizontalLine: () => false,
        }),
    ].join('\n'));
    
    if (index === count - 1) {
        output.push(bold(redBright(`✖ ${errorsCount} errors in ${filesCount} files`)));
        output.push(bold(redBright('  fixable with the `--fix` option')));
        
        const result = output.join('\n') + '\n';
        output = [];
        
        return result;
    }
    
    return '';
};

