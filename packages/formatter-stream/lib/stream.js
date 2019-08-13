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

module.exports = ({name, places, index, count, filesCount, errorsCount}) => {
    const data = [];
    const output = [];
    
    for (const {message, position, rule} of places) {
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
    
    if (data.length)
        output.push([
            underline(name),
            table(data, {
                border: getBorderCharacters('void'),
                drawHorizontalLine: () => false,
            }),
        ].join('\n'));
    
    if (!output.length)
        return '';
    
    if (index === count - 1) {
        const result = [
            count === 1 ? output : '',
            bold(redBright(`✖ ${errorsCount} errors in ${filesCount} files`)),
            bold(redBright('  fixable with the `--fix` option')),
        ].filter(Boolean);
        
        return result.join('\n') + '\n';
    }
    
    return output.join('\n') + '\n';
};

