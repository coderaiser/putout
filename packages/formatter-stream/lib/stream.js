import {styleText} from 'node:util';
import {
    table,
    getBorderCharacters,
} from 'table';

const underline = (a) => styleText('underline', a);
const red = (a) => styleText('red', a);
const gray = (a) => styleText('gray', a);
const bold = (a) => styleText('bold', a);
const redBright = (a) => styleText('redBright', a);

export default ({name, places, index, count, filesCount, errorsCount}) => {
    const data = [];
    const output = [];
    
    for (const {message, position, rule} of places) {
        const {line, column} = position;
        
        data.push([
            gray(`${line}:${column}`),
            `${red('error')}   ${message}`,
            gray(rule),
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
