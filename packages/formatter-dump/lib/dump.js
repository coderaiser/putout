import {
    table,
    getBorderCharacters,
} from 'table';
import chalk from 'chalk';
import {jsonFormatter} from '@putout/formatter-json';

const {
    underline,
    red,
    grey,
    bold,
    redBright,
} = chalk;

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
            underline(name),
            table(line, {
                border: getBorderCharacters('void'),
                drawHorizontalLine: () => false,
            }),
        ].join('\n'));
    }
    
    const maybeErrors = errorsCount === 1 ? 'error' : 'errors';
    const maybeFiles = filesCount === 1 ? 'file' : 'files';
    
    output.push(bold(redBright(`✖ ${errorsCount} ${maybeErrors} in ${filesCount} ${maybeFiles}`)));
    output.push(bold(redBright('  fixable with the `--fix` option')));
    
    return output.join('\n') + '\n';
};

function buildLine(places) {
    const data = [];
    
    for (const {message, position, rule} of places) {
        const {line, column} = position;
        
        data.push([
            grey(`${line}:${column}`),
            `${red('error')}   ${message}`,
            grey(rule),
        ]);
    }
    
    return data;
}
