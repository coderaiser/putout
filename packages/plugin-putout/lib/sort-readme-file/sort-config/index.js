import {operator, putout} from 'putout';

const {
    extract,
    toJS,
    fromJS,
    compare,
    sortProperties,
} = operator;

export const report = () => `Sort 'Configuration'`;

export const match = () => ({
    'codeblock("json", __a)': (vars, path) => {
        const prev = path.getPrevSibling();
        return compare(prev, 'heading(2, "Config")');
    },
});

export const replace = () => ({
    'codeblock("json", __a)': ({__a}) => {
        const source = toJS(extract(__a));
        const {code} = putout(source, {
            plugins: [
                ['sort-rules', sortProperties('rules')],
            ],
        });
        
        const json = indent(fromJS(code)).trimEnd();
        
        return `codeblock("json", \`${json}\n\`)`;
    },
});

const indent = (a, prefixCount = 4) => {
    const lines = a.split('\n');
    const result = [''];
    
    const prefix = ' '.repeat(prefixCount * 2);
    const suffix = ' '.repeat(prefixCount);
    
    for (const line of lines) {
        result.push(`${prefix}${line}`);
    }
    
    result.push(suffix);
    
    return result.join('\n');
};
