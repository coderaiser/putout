import {styleText} from 'node:util';
import {jsonFormatter} from '@putout/formatter-json';
import {codeFrameColumns} from '@putout/babel';

const MOVE_MESSAGE_WHEN_NO_PLACE = 1;

export default ({name, source, places, index, count, filesCount, errorsCount}) => {
    const json = jsonFormatter({
        name,
        source,
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
                forceColor: true,
                message: `${message} ${styleText('gray', `(${rule})`)}`,
            });
            
            output.push(`${name}:${line}:${column}\n${result}\n`);
        }
    }
    
    output.push(styleText(['bold', 'redBright'], `✖ ${errorsCount} errors in ${filesCount} files`));
    output.push(styleText(['bold', 'redBright'], '  fixable with the `--fix` option'));
    
    return output.join('\n') + '\n';
};
