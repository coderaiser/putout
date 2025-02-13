module.exports.match = () => ({
    '(__a) => typeof __a === "__b"': ({}, path) => !path.node.returnType,
});

module.exports.replace = () => ({
    '(__a) => typeof __a === "__b"': ({}, path) => !path.node.returnType,
});


const a = {
    'hello': ({}, path) => !path.node.returnType,
}
