import htmlToJsx from 'node-html-to-jsx';

const DIV_OPEN = 5;
const DIV_CLOSE = -6;
const DOCTYPE = /^\s*<!doctype[^>]*>\s*/i;
const CLASS_NAME = /(?<=\s)className=/g;

export const files = ['*.html'];

export const branch = (rawSource) => {
    const content = htmlToJsx(rawSource);
    const source = content
        .trim()
        .slice(DIV_OPEN, DIV_CLOSE);
    
    return [{
        source,
    }];
};

export const merge = (rawSource, [first]) => {
    const doctype = maybeDoctype(rawSource);
    const tail = getTail(rawSource);
    
    const source = fromJS(first)
        .replace(CLASS_NAME, 'class=')
        .trimEnd();
    
    return doctype + source + tail;
};

function getTail(rawSource) {
    return rawSource.slice(rawSource.trimEnd().length);
}

function maybeDoctype(rawSource) {
    const [doctype = ''] = rawSource.match(DOCTYPE) || [];
    
    return doctype;
}

const SUFFIX = ';\n';

function fromJS(source) {
    if (!source.endsWith(SUFFIX))
        return source;
    
    return source.slice(0, -SUFFIX.length);
}
