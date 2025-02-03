import deepMerge from 'deepmerge';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

const DefaultMarkdown = {
    format: {
        endOfFile: '',
    },
};

const JSON = {
    format: {
        quote: '"',
    },
    semantics: {
        trailingComma: false,
    },
};

export const configurePrinter = (name, printerOptions) => {
    const [printer = 'putout', options = {}] = maybeArray(printerOptions);
    const ext = name
        .split('.')
        .pop();
    
    if (printer !== 'putout')
        return printerOptions;
    
    const mergedOptions = deepMerge(parseOptions(ext), options);
    
    return [printer, mergedOptions];
};

function parseOptions(ext) {
    if (ext === 'json')
        return JSON;
    
    if (ext === 'yml{json}')
        return JSON;
    
    if (ext === 'md{json}')
        return {
            format: {
                ...DefaultMarkdown.format,
                ...JSON.format,
            },
            semantics: {
                ...DefaultMarkdown.semantics,
                ...JSON.semantics,
            },
        };
    
    if (ext === 'md{js}')
        return DefaultMarkdown;
    
    if (ext === 'md{ts}')
        return DefaultMarkdown;
    
    return {};
}
