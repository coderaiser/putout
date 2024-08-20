function get() {
    const {name, value} = node;
    return name;
}

const {safeAlign} = require('eslint-plugin-putout/config');

module.exports = safeAlign;
