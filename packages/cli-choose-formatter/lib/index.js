import {findUp as customFindUp} from 'find-up';
import {
    readFile as customReadFile,
    writeFile as customWriteFile,
} from 'node:fs/promises';
import {choose as customChoose} from '@putout/cli-choose';
import {
    readJSON,
    writeJSON,
} from './json.js';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const maybeFirst = (a) => isArray(a) ? a[0] : a;
const PREFIX = '@putout/formatter-';

export const chooseFormatter = async (formatter, dependencies, {
    readFile = customReadFile,
    writeFile = customWriteFile,
    choose = customChoose,
    findUp = customFindUp,
} = {}) => {
    formatter = maybeFirst(formatter);
    const formatters = getFormatters(dependencies);
    
    const {formatter: userFormatter} = await readJSON('.putout.json', {
        readFile,
        findUp,
    });
    
    const [currentFormatter, options] = maybeArray(userFormatter || formatter);
    const index = formatters.indexOf(currentFormatter);
    
    const chosenFormatter = await choose('Choose formatter', formatters, {
        autofocus: index >= 0 && index,
    });
    
    await writeJSON({
        currentFormatter,
        chosenFormatter,
        formatter,
        readFile,
        writeFile,
        findUp,
    });
    
    return [chosenFormatter, options];
};

function getFormatters(dependencies) {
    const formatters = [];
    
    for (const name of dependencies) {
        if (!name.startsWith(PREFIX))
            continue;
        
        const shortName = name.replace(PREFIX, '');
        formatters.push(shortName);
    }
    
    return formatters;
}
