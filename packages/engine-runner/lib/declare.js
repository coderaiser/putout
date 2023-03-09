'use strict';

const {declare} = require('@putout/operator-declare');

module.exports = ({rule, plugin, msg, options}) => ({
    rule,
    plugin: declare(plugin.declare),
    msg,
    options,
});
