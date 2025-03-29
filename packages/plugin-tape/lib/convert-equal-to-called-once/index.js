export const report = (path) => {
    const arg = path.get('arguments.0');
    return `Use 't.calledOnce(${arg.get('object')})' instead of '${path}'`;
};

export const replace = () => ({
    't.equal(__a.callCount, 1)': 't.calledOnce(__a)',
    't.equal(__a.callCount, 1, __b)': 't.calledOnce(__a, __b)',
});
