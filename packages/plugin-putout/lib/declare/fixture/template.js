module.exports.fix = (path) => {
    path.node = template.ast('hello');
}
