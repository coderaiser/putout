'use strict';

const emojiRegex = require('emoji-regex');

module.exports.report = () => 'Unnecessary escape character';

const match = (a) => a.match(emojiRegex()) || [];

module.exports.fix = (path) => {
    if (path.isStringLiteral()) {
        const {raw} = path.node;
        
        path.node.raw = raw
            .replace(/\\"/g, '"')
            .replace(/\\\^/g, '^');
        
        for (const emoji of match(raw))
            path.node.raw = raw.replace(`\\${emoji}`, emoji);
        
        return;
    }
    
    for (const tmpl of path.node.quasis) {
        const {raw} = tmpl.value;
        
        tmpl.value.raw = raw
            .replace(/\\'/g, `'`)
            .replace(/\\"/g, `"`)
            .replace(/\\^/g, `^`);
    }
};

const hasTemplateQuote = (a) => /^(?!\\).*(\\"|\\')/.test(a);
const createRegExp = (a) => RegExp(`^((?!\\\\).)*\\\\${a}.`);

const hasA = (a) => createRegExp('\\^').test(a);
const hasDoubleQuote = (a) => createRegExp('"').test(a);
const hasEmoji = (a) => {
    for (const emoji of match(a)) {
        if (a.includes(`\\${emoji}`))
            return true;
    }
    
    return false;
};

module.exports.traverse = ({push}) => {
    return {
        '"__"'(path) {
            const {raw} = path.node;
            
            if (!raw)
                return;
            
            if (hasDoubleQuote(raw)) {
                push(path);
                return;
            }
            
            if (hasEmoji(raw)) {
                push(path);
                return;
            }
            
            if (hasA(raw)) {
                push(path);
            }
        },
        
        '`__`'(path) {
            for (const tmpl of path.node.quasis) {
                const {raw} = tmpl.value;
                
                if (hasTemplateQuote(raw))
                    return push(path);
            }
        },
    };
};

