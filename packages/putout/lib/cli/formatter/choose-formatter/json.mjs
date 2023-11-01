const {stringify, parse} = JSON;

async function getPath(name, {up, findUp}) {
    let path;
    
    if (up)
        path = await findUp(name);
    
    if (!path)
        path = new URL(`../../../../${name}`, import.meta.url).pathname;
    
    return path;
}

export async function readJSON(name, {up, readFile, findUp}) {
    const path = await getPath(name, {
        up,
        findUp,
    });
    
    const json = await readFile(path, 'utf8');
    
    return parse(json);
}

export async function writeJSON({formatter, currentFormatter, chosenFormatter, readFile, writeFile, findUp}) {
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
