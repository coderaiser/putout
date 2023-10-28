const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

const DefaultMarkdown = {
    format: {
        endOfFile: '',
    },
};

const JSON = {
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
    
    if (ext === 'json')
        return [printer, JSON];
    
    if (ext === 'md{json}')
        return [printer, {
            ...DefaultMarkdown,
            ...JSON,
        }];
    
    if (ext === 'md{js}')
        return [printer, DefaultMarkdown];
    
    if (ext === 'md{ts}')
        return [printer, DefaultMarkdown];
    
    return [printer, options];
};
