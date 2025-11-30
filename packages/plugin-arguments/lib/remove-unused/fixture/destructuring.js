module.exports.traverse = ({push, generate}) => {
    return {
        'if (__) __': onIfStatement({
            push,
            generate,
        }),
    };
};

const onIfStatement = ({push}) => (path) => path;
