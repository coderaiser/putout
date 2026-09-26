import {operator, putout} from 'putout';

const {
    extract,
    toJS,
    fromJS,
    compare,
    sortProperties,
    indentCodeblock,
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
        
        const json = indentCodeblock(fromJS(code)).trimEnd();
        
        return `codeblock("json", \`${json}\n\`)`;
    },
});
