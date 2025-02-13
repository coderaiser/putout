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

const PACKAGE = {
    ...JSON,
    format: {
        ...JSON.format,
        indent: '  ',
    },
};

export const configurePrinter = (name, printerOptions) => {
    const [printer = 'putout', options = {}] = maybeArray(printerOptions);
    
    if (printer !== 'putout')
        return printerOptions;
    
    const mergedOptions = deepMerge(parseOptions(name), options);
    
    return [printer, mergedOptions];
};

function parseOptions(name) {
    const ext = name
        .split('.')
        .pop();
    
    if (ext === 'json') {
        if (name.endsWith('package.json'))
            return PACKAGE;
        
        return JSON;
    }
    
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
