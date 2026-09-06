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
            const assets = processor
                .branch(content)
                .map(getSource);
            
            const js = assets.shift();
            const ast = parse(js);
            
            return {
                assets,
                ast,
            };
        },
        merge: (ast, assets, options) => {
            const js = print(ast, options);
            
            return processor.merge(null, [js, ...assets]);
        },
    };
}

function branch(content) {
    const ast = parse(content, {
        isTS: true,
    });
    
    const assets = [content];
    
    return {
        assets,
        ast,
    };
}

export const merge = (ast, options) => print(ast, options);
