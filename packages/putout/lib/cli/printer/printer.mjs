const {assign} = Object;
const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

const DefaultMarkdown = {
    format: {
        endOfFile: '',
    },
};

export const configurePrinter = (name, printerOptions) => {
    const [printer = 'putout', options = {}] = maybeArray(printerOptions);
    
    if (printer !== 'putout')
        return printerOptions;
    
    if (name.endsWith('.md{json}'))
        assign(options, DefaultMarkdown);
    else if (name.endsWith('.md{js}'))
        assign(options, DefaultMarkdown);
    else if (name.endsWith('.md{ts}'))
        assign(options, DefaultMarkdown);
    
    return [printer, options];
};
