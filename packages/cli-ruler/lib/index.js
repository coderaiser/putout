import {join} from 'node:path';
import process from 'node:process';
import tryToCatch from 'try-to-catch';
import * as ruleProcessor from './rule-processor.js';

const cwd = process.cwd();

const {parse, stringify} = JSON;
const defaultData = stringify({
    rules: {},
});

export async function ruler(places, {disable, disableAll, enable, enableAll, readFile, writeFile}) {
    const name = join(cwd, '.putout.json');
    
    const [, data = defaultData] = await tryToCatch(readFile, name, 'utf8');
    const object = parse(data);
    
    let updated = object;
    
    if (enable)
        updated = ruleProcessor.enable(enable, object);
    else if (disable)
        updated = ruleProcessor.disable(disable, object);
    else if (enableAll)
        updated = ruleProcessor.enableAll(places, object);
    else if (disableAll)
        updated = ruleProcessor.disableAll(places, object);
    
    await writeFile(name, stringify(updated, null, 4));
}
