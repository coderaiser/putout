import {getProcessor} from './processor.js';
import {getType} from './type.js';

export function magicParse(name, content) {
    const type = getType(name);
    const {branch} = getProcessor(type);
    
    return branch(content);
}
