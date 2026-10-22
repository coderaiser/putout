import {include} from './includer/index.js';
import {replace} from './replacer/index.js';
import {declare} from './declarator/index.js';
import {scan} from './scanner/index.js';

const {entries} = Object;

export function buildPlugin(item, {progress, runners}) {
    const {plugin} = item;
    
    if (plugin.traverse)
        return item;
    
    if (plugin.replace)
        return include(replace(item));
    
    if (plugin.declare)
        return declare(item);
    
    if (plugin.include)
        return include(item);
    
    if (plugin.scan)
        return scan(item, {
            progress,
        });
    
    for (const [name, build] of entries(runners)) {
        if (plugin[name])
            return build(item);
    }
}
