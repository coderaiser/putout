import {include} from './includer/index.js';
import {replace} from './replacer/index.js';
import {declare} from './declarator/index.js';
import {scan} from './scanner/index.js';

const {entries} = Object;

export function buildPlugin(item, {progress, runners}) {
    const parsedItem = parseItem(item, runners);
    const {plugin} = parsedItem;
    
    if (plugin.traverse)
        return parsedItem;
    
    if (plugin.replace)
        return include(replace(parsedItem));
    
    if (plugin.declare)
        return declare(parsedItem);
    
    if (plugin.include)
        return include(parsedItem);
    
    if (plugin.scan)
        return scan(parsedItem, {
            progress,
        });
}

function parseItem(item, runners = {}) {
    const {plugin} = item;
    
    for (const [name, build] of entries(runners)) {
        if (plugin[name])
            return build(item);
    }
    
    return item;
}
