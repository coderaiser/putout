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

const jsonFormatter = require('@putout/formatter-json');

const output = [];

module.exports = ({name, places, index, count, filesCount, errorsCount}) => {
    const jsonStr = jsonFormatter({
        name, places, index, count, filesCount, errorsCount,
    });
    
    if (!jsonStr)
        return '';
    
    const json = JSON.parse(jsonStr);
    
    if (!json.errors.length)
        return;
    
    for (const {name, places} of json.errors) {
        const line = buildLine(places);
        
        output.push([
            underline(name),
            table(line, {
                border: getBorderCharacters('void'),
                drawHorizontalLine: () => false,
            }),
        ].join('\n'));
    }
    
    output.push(bold(redBright(`✖ ${errorsCount} errors in ${filesCount} files`)));
    output.push(bold(redBright('  fixable with the `--fix` option')));
    
    return output.join('\n') + '\n';
};

function buildLine(places) {
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
    
    return data;
}

