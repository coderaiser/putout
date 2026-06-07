import {print} from '@putout/engine-parser';
import * as processorYaml from '@putout/processor-yaml';
import * as processorToml from '@putout/processor-toml';
import {operator} from 'putout';

const {fromJS} = operator;

export function magicPrint(name, ast, options) {
    const js = print(ast, options);
    
    if (name.endsWith('.json'))
        return fromJS(js);
    
    if (name.endsWith('.yaml'))
        return processorYaml.merge(null, [js]);
    
    if (name.endsWith('.toml'))
        return processorToml.merge(null, [js], {
            beautify: false,
        });
    
    return js;
}
