'use strict';

const {
    readFileSync,
    writeFileSync,
} = require('fs');
const tryCatch = require('try-catch');

const {cwd} = process;
const {parse, stringify} = JSON;
const isString = (a) => typeof a === 'string';

module.exports = ({log}) => ({disable, disableAll, enable, enableAll}, mergedPlaces) => {
    const name = `${cwd}/.putout.json`;
    const defaultData = stringify({
        rules: {},
    });
    
    const [, data = defaultData] = tryCatch(readFileSync, name, 'utf8');
    const ruler = require('./ruler');
    const object = parse(data);
    
    let updated;
    
    if (enable)
        updated = ruler.enable(object, enable);
    else if (disable)
        updated = ruler.disable(object, disable);
    else if (enableAll)
        updated = ruler.enableAll(object, mergedPlaces);
    else if (disableAll)
        updated = ruler.disableAll(object, mergedPlaces);
    
    if (isString(disable) && !disable)
        return log(object.rules);
    
    if (isString(enable) && !enable)
        return log(object.rules);
    
    writeFileSync(name, stringify(updated, null, 4));
};

