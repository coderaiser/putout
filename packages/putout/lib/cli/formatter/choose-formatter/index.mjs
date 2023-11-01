import {
    readFile as customReadFile,
    writeFile as customWriteFile,
} from 'node:fs/promises';
import {findUp as customFindUp} from 'find-up';
import {choose as customChoose} from '@putout/cli-choose';
import {
    readJSON,
    writeJSON,
} from './json.mjs';

const {isArray} = Array;
const {keys} = Object;

const maybeFirst = (a) => isArray(a) ? a[0] : a;

const PREFIX = '@putout/formatter-';

export const chooseFormatter = async ({
    readFile = customReadFile,
    writeFile = customWriteFile,
    choose = customChoose,
    findUp = customFindUp,
} = {}) => {
    const packageJson = await readJSON('package.json', {
        readFile,
        findUp,
    });
    
    const formatters = getFormatters(packageJson);
    
    const defaultConfig = await readJSON('putout.json', {
        readFile,
        findUp,
    });
    
    const formatter = maybeFirst(defaultConfig.formatter);
    
    const {formatter: userFormatter} = await readJSON('.putout.json', {
        up: true,
        readFile,
        findUp,
    });
    
    const currentFormatter = maybeFirst(userFormatter || formatter);
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
    
    return chosenFormatter;
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
<<<<<<< HEAD:packages/putout/lib/cli/formatter/choose-formatter.mjs

async function getPath(name, {up, findUp}) {
    let path;
    
    if (up)
        path = await findUp('.putout.json');
    
    if (!path)
        path = new URL(`../../../${name}`, import.meta.url).pathname;
    
    return path;
}

async function readJSON(name, {up, readFile, findUp}) {
    const path = await getPath(name, {
        up,
        findUp,
    });
    
    const json = await readFile(path, 'utf8');
    
    return parse(json);
}

async function writeJSON({formatter, currentFormatter, chosenFormatter, readFile, writeFile, findUp}) {
    if (!chosenFormatter)
        return;
    
    const path = await findUp('.putout.json');
    
    if (!path)
        return;
    
    const config = parse(await readFile(path, 'utf8'));
    
    config.formatter = chosenFormatter;
    
    if (formatter === chosenFormatter)
        delete config.formatter;
    
    await writeFile('1.txt', `${formatter}, -- ${currentFormatter} -- ${chosenFormatter}`);
    await writeFile(path, stringify(config, null, 4) + '\n');
}
