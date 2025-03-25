import tryCatch from 'try-catch';
import regexpTree from 'regexp-tree';

const cutSlashes = (a) => a
    .split('/')
    .slice(1, -1)
    .join('/');

const whitelist = [];

const blacklist = [
    'charEscapeUnescape',
];

const options = {
    blacklist,
};

export const report = ({pattern, to}) => `RegExp /${pattern}/ can be optimized to /${to}/`;

export const fix = ({path, to, flags}) => {
    path.node.raw = `/${to}/${flags}`;
    path.node.pattern = to;
};

export const traverse = ({push}) => ({
    RegExpLiteral(path) {
        const {pattern, flags} = path.node;
        const [error, result] = tryCatch(
            regexpTree.optimize,
            RegExp(
                pattern,
                flags,
            ),
            whitelist,
            options,
        );
        
        if (error)
            return;
        
        const to = cutSlashes(result._string);
        
        if (pattern !== to && pattern.length !== to.length)
            push({
                path,
                flags,
                pattern,
                to,
            });
    },
});
