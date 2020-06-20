'use strict';

const {jsonFormatter} = require('@putout/formatter-json');
const {codeFrameColumns} = require('@babel/code-frame');

const {
    bold,
    gray,
    redBright,
} = require('chalk');

const MOVE_MESSAGE_WHEN_NO_PLACE = 1;

module.exports = ({name, source, places, index, count, filesCount, errorsCount}) => {
    const json = jsonFormatter({
        name, source, places, index, count, filesCount, errorsCount,
    });
    
    if (!json)
        return '';
    
    if (!json.errors.length)
        return '';
    
    const output = [];
    for (const {name, places, source} of json.errors) {
        for (const {rule, position, message} of places) {
            const {line, column} = position;
            const location = {
                start: {
                    line,
                    column: column || MOVE_MESSAGE_WHEN_NO_PLACE,
                },
            };
            
            const result = codeFrameColumns(source, location, {
                highlightCode: true,
                message: `${message} ${gray('(' + rule + ')')}`,
            });
            
            output.push(`${name}:${line}:${column}\n${result}\n`);
        }
    }
    
    output.push(bold(redBright(`✖ ${errorsCount} errors in ${filesCount} files`)));
    output.push(bold(redBright('  fixable with the `--fix` option')));
    
    return output.join('\n') + '\n';
};

