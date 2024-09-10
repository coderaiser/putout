module.exports.traverse = ({push}) => ({
    'Identifier': push,
    TSTypeAssertion(path) {
        push(path);
    }
})
