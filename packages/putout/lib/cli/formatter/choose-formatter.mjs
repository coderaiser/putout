import {readFile as customReadFile} from 'node:fs/promises';
import {findUp} from 'find-up';
import {choose as customChoose} from '@putout/cli-choose';

const {isArray} = Array;
const maybeFirst = (a) => isArray(a) ? a[0] : a;
const {keys} = Object;
const {parse} = JSON;
const PREFIX = '@putout/formatter-';

export const chooseFormatter = async ({readFile = customReadFile, choose = customChoose} = {}) => {
    const packageJson = await readJSON('package.json', {
        readFile,
    });
    
    const formatters = getFormatters(packageJson);
    
    const {formatter} = await readJSON('putout.json', {
        readFile,
    });
    
    const {formatter: userFormatter} = await readJSON('.putout.json', {
        up: true,
        readFile,
    });
    
    const currentFormatter = maybeFirst(userFormatter || formatter);
    const index = formatters.indexOf(currentFormatter);
    
    return await choose('Choose formatter', formatters, {
        autofocus: index >= 0 && index,
    });
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

async function getPath(name, {up}) {
    let path;
    
    if (up)
        path = await findUp('.putout.json');
    
    if (!path)
        path = new URL(`../../../${name}`, import.meta.url).pathname;
    
    return path;
}

async function readJSON(name, {up, readFile}) {
    const path = await getPath(name, {
        up,
    });
    const json = await readFile(path, 'utf8');
    
    return parse(json);
}
