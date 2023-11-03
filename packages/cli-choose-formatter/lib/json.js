import {lintJSON} from 'putout/lint/json';
import {updateConfig} from './update-config.js';

const {stringify, parse} = JSON;

export async function readJSON(name, {readFile, findUp}) {
    const path = await findUp(name);
    
    if (!path)
        return {};
    
    const json = await readFile(path, 'utf8');
    
    return parse(json);
}

export async function writeJSON({formatter, chosenFormatter, readFile, writeFile, findUp}) {
    if (!chosenFormatter)
        return;
    
    const path = await findUp('.putout.json');
    
    if (!path)
        return;
    
    const config = parse(await readFile(path, 'utf8'));
    
    updateConfig({
        formatter,
        chosenFormatter,
        config,
    });
    
    const fixedConfig = lintJSON(stringify(config, null, 4), {
        plugins: [
            'putout-config',
        ],
    });
    
    await writeFile(path, fixedConfig);
}
