'use strict';

const {join} = require('path');
const {
    readFile,
    writeFile,
} = require('fs/promises');

const tryToCatch = require('try-to-catch');

const cwd = process.cwd();
const {parse, stringify} = JSON;

module.exports = async ({disable, disableAll, enable, enableAll}, places) => {
    const name = join(cwd, '.putout.json');
    const defaultData = stringify({
        rules: {},
    });
    
    const [, data = defaultData] = await tryToCatch(readFile, name, 'utf8');
    const ruler = require('./ruler');
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
};

