module.exports.report = () => `Avoid 'debugger' statement`;

module.exports.fix = (path) => {
    return '';
};

module.exports.include = () => [
    'DebuggerStatement',
];

module.exports.filter = (path) => {
    return true;
};
