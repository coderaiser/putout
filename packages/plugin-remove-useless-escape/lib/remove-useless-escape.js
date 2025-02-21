'use strict';

const emojiRegex = require('emoji-regex');

const {types, operator} = require('putout');

const {replaceWith} = operator;
const {RegExpLiteral} = types;
const {assign} = Object;

module.exports.report = () => 'Unnecessary escape character';

module.exports.fix = (path) => {
    if (path.isStringLiteral()) {
        const {raw} = path.node;
        
        path.node.raw = unEscape(raw);
        
        return;
    }
    
    if (path.isRegExpLiteral()) {
        const {pattern, flags} = path.node;
        
        const unescaped = unescapeRegExp(pattern);
        const raw = `/${unescaped}/`;
        
        const regExpNode = assign(RegExpLiteral(unescaped, flags), {
            value: unescaped,
            raw,
            extra: {
                raw,
                rawValue: unescaped,
            },
        });
        
        replaceWith(path, regExpNode);
        return;
    }
    
    for (const tmpl of path.node.quasis) {
        const {raw} = tmpl.value;
        tmpl.value.raw = unEscape(raw);
    }
};

module.exports.traverse = ({push}) => ({
    'RegExpLiteral'(path) {
        const {raw} = path.node;
        
        if (isEscapedRegExp(raw))
            push(path);
    },
    '"__"'(path) {
        const {raw} = path.node;
        
        if (isEscaped(raw))
            push(path);
    },
    
    '`__`'(path) {
        for (const tmpl of path.node.quasis) {
            const {raw} = tmpl.value;
            
            if (isEscaped(raw))
                return push(path);
            
            if (hasQuote(raw))
                return push(path);
            
            if (raw.includes('\\"') && !raw.includes(`\\\\"`))
                return push(path);
            
            if (raw.includes(`\\'`) && !raw.includes(`\\\\'`))
                return push(path);
        }
    },
});

const createCheckRegExp = (a) => RegExp(`^((?!\\\\).)*\\\\${a}.`);

const match = (a) => a.match(emojiRegex()) || [];
const hasA = (a) => /\\\^/.test(a);
const hasDoubleQuote = (a) => createCheckRegExp('"').test(a);
const hasQuote = (a) => createCheckRegExp(`'`).test(a);
const hasComa = (a) => createCheckRegExp(',').test(a);

const hasEmoji = (a) => {
    for (const emoji of match(a)) {
        if (a.includes(`\\${emoji}`))
            return true;
    }
    
    return false;
};

function isEscaped(raw) {
    if (!raw)
        return false;
    
    if (!raw.includes('\\'))
        return false;
    
    if (raw.includes('\\h') && !raw.includes('\\\\h'))
        return true;
    
    if (/\\\\/g.test(raw))
        return false;
    
    if (/\\\//g.test(raw))
        return true;
    
    if (raw.includes('\\$'))
        return true;
    
    if (raw.includes('\\.'))
        return true;
    
    if (raw.includes('\\{'))
        return true;
    
    if (raw.includes('\\+') && !raw.includes('\\\\+'))
        return true;
    
    if (hasDoubleQuote(raw))
        return true;
    
    if (hasEmoji(raw))
        return true;
    
    if (hasA(raw))
        return true;
    
    return hasComa(raw);
}

const createEncodedRegExp = (a) => RegExp(`\\\\${a}`, 'g');

function unEscape(raw) {
    raw = raw
        .replaceAll(`\\'`, `'`)
        .replaceAll('\\/', '/')
        .replaceAll('\\+', '+')
        .replace(createEncodedRegExp(`"`), '"')
        .replaceAll('\\^', '^')
        .replaceAll('\\$', '$')
        .replaceAll('\\{', '{')
        .replaceAll('\\.', '.')
        .replace(/(\\),/, ',')
        .replaceAll('\\h', 'h');
    
    for (const emoji of match(raw)) {
        raw = raw.replace(createEncodedRegExp(emoji), emoji);
    }
    
    return raw;
}

const unescapeRegExp = (raw) => raw
    .replaceAll('\\:', ':')
    .replaceAll('\\+\\/', '+/')
    .replaceAll('\\,', ',')
    .replaceAll('\\`', '`');

const is = (a) => (b) => b.includes(`\\${a}`) && !b.includes(`\\\\${a}`);
const isRegExpColon = is(':');
const isComa = is(',');
const isRegExpSlash = (a) => a.includes('\\\\\\\\');

function isEscapedRegExp(raw) {
    if (raw.includes('\\/'))
        return false;
    
    if (raw.includes('\\`'))
        return true;
    
    return isRegExpColon(raw) || isRegExpSlash(raw) || isComa(raw);
}
