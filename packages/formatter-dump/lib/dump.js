import {styleText} from 'node:util';
import {
    table,
    getBorderCharacters,
} from 'table';
import {jsonFormatter} from '@putout/formatter-json';

export default ({name, places, index, count, filesCount, errorsCount}) => {
    const json = jsonFormatter({
        name,
        places,
        index,
        count,
        filesCount,
        errorsCount,
    });
    
    if (!json)
        return '';
    
    if (!json.errors.length)
        return '';
    
    const output = [];
    
    for (const {name, places} of json.errors) {
        const line = buildLine(places);
        
        output.push([
            styleText('underline', name),
            table(line, {
                border: getBorderCharacters('void'),
                drawHorizontalLine: () => false,
            }),
        ].join('\n'));
    }
    
    const maybeErrors = errorsCount === 1 ? 'error' : 'errors';
    const maybeFiles = filesCount === 1 ? 'file' : 'files';
    
    output.push(styleText(['bold', 'redBright'], `✖ ${errorsCount} ${maybeErrors} in ${filesCount} ${maybeFiles}`));
    output.push(styleText(['bold', 'redBright'], '  fixable with the `--fix` option'));
    
    return output.join('\n') + '\n';
};

function buildLine(places) {
    const data = [];
    
    for (const {message, position, rule} of places) {
        const {line, column} = position;
        
        data.push([
            styleText('gray', `${line}:${column}`),
            `${styleText('red', 'error')}   ${message}`,
            styleText('gray', rule),
        ]);
    }
    
    return data;
}
