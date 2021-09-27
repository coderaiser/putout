const {
    template
} = require('putout');

module.exports.fix = (path) => {
    path.node = template.ast('hello');
}
