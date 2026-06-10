import {print} from '@putout/engine-parser';
import * as processorYaml from '@putout/processor-yaml';
import * as processorToml from '@putout/processor-toml';
import {fromJS} from '@putout/operator-json';

export function magicPrint(name, ast, options) {
    const js = print(ast, options);
    
    if (name.endsWith('.json'))
        return fromJS(js);
    
    if (name.endsWith('.yaml'))
        return processorYaml.merge(null, [js]);
    
    if (name.endsWith('.toml'))
        return processorToml.merge(null, [js]);
    
    return js;
}
