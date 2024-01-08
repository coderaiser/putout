const noop = () => {};
const a = () => b;

module.exports.fix = (path) => {
    path.remove(path);
};
