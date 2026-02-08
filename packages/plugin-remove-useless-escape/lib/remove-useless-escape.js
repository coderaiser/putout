import emojiRegex from 'emoji-regex';

export const report = () => 'Unnecessary escape character';

export const fix = (path) => {
    if (path.isStringLiteral()) {
        const {raw} = path.node;
        
        path.node.raw = unEscape(raw);
        
        return;
    }
    
    for (const tmpl of path.node.quasis) {
        const {raw} = tmpl.value;
        tmpl.value.raw = unEscape(raw);
    }
};

export const traverse = ({push}) => ({
    '"__"'(path) {
        const {raw} = path.node;
        
        if (isEscaped(raw))
            push(path);
    },
    
    '`__`'(path) {
        for (const tmpl of path.node.quasis) {
            const {raw} = tmpl.value;
            
            if (raw.includes('$'))
                return;
            
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
    
    if (raw.includes('\\z') && !raw.includes('\\\\z'))
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
        .replaceAll('\\h', 'h')
        .replaceAll('\\z', 'z');
    
    for (const emoji of match(raw)) {
        raw = raw.replace(createEncodedRegExp(emoji), emoji);
    }
    
    return raw;
}
