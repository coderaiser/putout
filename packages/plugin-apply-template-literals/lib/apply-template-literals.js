import {types} from 'putout';

const {
    isBinaryExpression,
    isTemplateLiteral,
} = types;

export const report = () => `Use template literals ('\`\`') instead of binary expressions ('+')`;

export const filter = ({parentPath}) => !isBinaryExpression(parentPath) && !isTemplateLiteral(parentPath.parentPath);

export const replace = () => ({
    '"__a" + __identifier__b + "__c"': replaceNewlines('`__a${__identifier__b}__c`', ['__a', '__c']),
    '"__a" + __b(__args) + "__c"': replaceNewlines('`__a${__b(__args)}__c`', ['__a', '__c']),
    '__identifier__a + "__b" + __identifier__c + __identifier__d': replaceNewlines('`${__identifier__a}__b${__identifier__c}${__identifier__d}`', ['__b']),
    '__identifier__a + "__b"': replaceNewlines('`${__identifier__a}__b`', ['__b']),
    '"__a" + __identifier__b': replaceNewlines('`__a${__identifier__b}`', ['__a']),
    'String(__a) + "__b"': replaceNewlines('`${__a}__b`', ['__b']),
});

const replaceNewlines = (template, names) => (vars) => {
    for (const name of names) {
        const {value} = vars[name];
        
        vars[name].value = value
            .replace('\n', '\\n')
            .replace('\r', '\\r');
    }
    
    return template;
};
