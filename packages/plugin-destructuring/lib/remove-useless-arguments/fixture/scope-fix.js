module.exports.traverse = ({push, generate}) => {
    return {
        'if (__) __': onIfStatement({
            push,
        }),
    };
};

const onIfStatement = ({push}) => (path) => {};
