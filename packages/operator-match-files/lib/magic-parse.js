import {parse} from '@putout/engine-parser';
import * as processorYaml from '@putout/processor-yaml';
import * as processorToml from '@putout/processor-toml';
import {toJS} from '@putout/operator-json';

export function magicParse(name, content) {
    if (name.endsWith('.json')) {
        const js = toJS(content);
        const ast = parse(js);
        
        return [js, ast];
    }
    
    if (/\.ya?ml$/.test(name)) {
        const [{source: js}] = processorYaml.branch(content);
        const ast = parse(js);
        
        return [js, ast];
    }
    
    if (name.endsWith('toml')) {
        const [{source: js}] = processorToml.branch(content);
        const ast = parse(js);
        
        return [js, ast];
    }
    
    if (/\.[cm]?ts(x)?$/.test(name)) {
        const ast = parse(content, {
            isTS: true,
        });
        
        return [content, ast];
    }
    
    return [content, parse(content)];
}
