import htmlToJsx from 'node-html-to-jsx';

const DIV_OPEN = 5;
const DIV_CLOSE = -6;

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

export const merge = (rawSource, [first]) => fromJS(first).replaceAll('className', 'class');

const SUFFIX = ';\n';

function fromJS(source) {
    if (!source.endsWith(SUFFIX))
        return source;
    
    return source.slice(0, -SUFFIX.length);
}
