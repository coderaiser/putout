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

module.exports.traverse = ({push}) => {
    return {
        '"__"'(path) {
            const {raw} = path.node;
            
            if (!raw)
                return;
            
            if (!raw.indexOf(`'`) && /^((?!\\).)*\\"/.test(raw))
                push(path);
        },
        
        '`__`'(path) {
            for (const tmpl of path.node.quasis) {
                const {raw} = tmpl.value;
                
                if (/^((?!\\).)*(\\"|\\')/.test(raw)) {
                    return push(path);
                }
            }
        },
    };
};

