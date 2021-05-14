module.exports.traverse = ({push}) => ({
    xxx(path) {
        if (x)
            push(path);
    },
    'Identifier': push,
    TSTypeAssertion(path) {
        push(path);
    }
})
