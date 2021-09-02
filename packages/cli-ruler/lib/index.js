import {join} from 'path';

import tryToCatch from 'try-to-catch';
import * as ruler from './ruler.js';

const cwd = process.cwd();
const {parse, stringify} = JSON;

export async function rulerProcessor({disable, disableAll, enable, enableAll, readFile, writeFile}, places) {
    const name = join(cwd, '.putout.json');
    const defaultData = stringify({
        rules: {},
    });
    
    const [, data = defaultData] = await tryToCatch(readFile, name, 'utf8');
    const object = parse(data);
    
    let updated = object;
    
    if (enable)
        updated = ruler.enable(object, enable);
    else if (disable)
        updated = ruler.disable(object, disable);
    else if (enableAll)
        updated = ruler.enableAll(object, places);
    else if (disableAll)
        updated = ruler.disableAll(object, places);
    
    await writeFile(name, stringify(updated, null, 4));
}

