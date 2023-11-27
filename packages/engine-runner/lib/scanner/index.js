'use strict';

const {__filesystem} = require('@putout/operator-json');
const log = require('debug')('putout:runner:scanner');

module.exports = ({rule, plugin, msg, options}) => {
    const {
        scan,
        report,
        fix,
    } = plugin;
    
    const traverse = getTraverse({
        scan,
        rule,
    });
    
    return {
        rule,
        msg,
        options,
        plugin: {
            report,
            fix,
            traverse,
        },
    };
};

const getTraverse = ({scan, rule}) => ({push, options}) => ({
    [__filesystem](path) {
        log(rule);
        
        const rootPath = path.get('arguments.0');
        scan(rootPath, {
            push,
            options,
        });
    },
});
