import {choose as customChoose} from '@putout/cli-choose';
import {readFile as customReadFile} from 'node:fs/promises';
import tryCatch from 'try-catch';

const {keys} = Object;
const {parse} = JSON;
const PREFIX = '@putout/formatter-';

const infoPath = new URL('../../../package.json', import.meta.url).pathname;

export const chooseFormatter = async ({readFile = customReadFile, choose = customChoose} = {}) => {
    const data = await readFile(infoPath, 'utf8');
    const [error, parsed] = tryCatch(parse, data);
    
    if (error)
        return [error];
    
    const formatters = getFormatters(parsed);
    
    return [null, await choose('Choose formatter', formatters)];
};

function getFormatters({dependencies}) {
    const formatters = [];
    
    for (const name of keys(dependencies)) {
        if (!name.startsWith(PREFIX))
            continue;
        
        const shortName = name.replace(PREFIX, '');
        formatters.push(shortName);
    }
    
    return formatters;
}
