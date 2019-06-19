'use strict';

module.exports.report = () => 'Empty import statement';

module.exports.fix = (path) => {
    path.remove();
};

const isCSS = (a) => /\.css/.test(a);

module.exports.traverse = ({push}) => {
    return {
        ImportDeclaration(path) {
            const {
                specifiers,
                source,
            } = path.node;
            const {value} = source;
            
            if (!specifiers.length && !isCSS(value))
                push(path);
        },
    };
};

