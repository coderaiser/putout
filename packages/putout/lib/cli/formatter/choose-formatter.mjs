import {choose as customChoose} from '@putout/cli-choose';
import {readFile as customReadFile} from 'node:fs/promises';

const {keys} = Object;
const {parse} = JSON;
const PREFIX = '@putout/formatter-';

const infoPath = new URL('../../../package.json', import.meta.url).pathname;

export const chooseFormatter = async ({readFile = customReadFile, choose = customChoose} = {}) => {
    const data = await readFile(infoPath, 'utf8');
    const parsed = parse(data);
    
    const formatters = getFormatters(parsed);
    
    return await choose('Choose formatter', formatters);
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
