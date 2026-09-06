import {getProcessor} from './processor.js';
import {getType} from './type.js';

export function magicPrint(name, ast, assets, options) {
    const type = getType(name);
    const {merge} = getProcessor(type);
    
    return merge(ast, assets, options);
}
