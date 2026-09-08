import {parse, print} from '@putout/engine-parser';
import * as processorYaml from '@putout/processor-yaml';
import * as processorToml from '@putout/processor-toml';
import * as processorMarkdown from '@putout/processor-markdown';
import * as processorJson from '@putout/processor-json';

const getSource = ({source}) => source;

export const processors = {
    json: wrapProcessor(processorJson),
    yaml: wrapProcessor(processorYaml),
    toml: wrapProcessor(processorToml),
    markdown: wrapProcessor(processorMarkdown),
};

export const getProcessor = (name) => {
    const processor = processors[name];
    
    if (processor)
        return processor;
    
    return {
        branch,
        merge,
    };
};

function wrapProcessor(processor) {
    return {
        branch: (content) => {
            const [js] = processor
                .branch(content)
                .map(getSource);
            
            const ast = parse(js);
            
            return {
                ast,
            };
        },
        merge: (ast, options) => {
            const js = print(ast, options);
            
            return processor.merge('', [js]);
        },
    };
}

function branch(content) {
    const ast = parse(content, {
        isTS: true,
    });
    
    return {
        ast,
    };
}

export const merge = (ast, options) => print(ast, options);
