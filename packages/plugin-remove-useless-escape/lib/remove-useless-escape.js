'use strict';

module.exports.report = () => 'Unnecessary escape character';

module.exports.fix = (path) => {
    if (path.isStringLiteral()) {
        const {raw} = path.node;
        path.node.raw = raw.replace(/\\"/g, '"');
        return;
    }
    
    for (const tmpl of path.node.quasis) {
        const {raw} = tmpl.value;
        
        tmpl.value.raw = raw
            .replace(/\\'/, `'`)
            .replace(/\\"/g, `"`);
    }
};

const hasDoubleQuote = (a) => /^((?!\\).)*\\"/.test(a);
const hasTemplateDoubleQuote = (a) => /^((?!\\).)*(\\"|\\')/.test(a);
const hasQuote = (a) => /^'/.test(a);

module.exports.traverse = ({push}) => {
    return {
        '"__"'(path) {
            const {raw} = path.node;
            
            if (!raw)
                return;
            
            if (hasQuote(raw) && hasDoubleQuote(raw))
                push(path);
        },
        
        '`__`'(path) {
            for (const tmpl of path.node.quasis) {
                const {raw} = tmpl.value;
                
                if (hasTemplateDoubleQuote(raw))
                    return push(path);
            }
        },
    };
};

