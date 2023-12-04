'use strict';

const fullstore = require('fullstore');
const {compare} = require('@putout/compare');
const {__filesystem_name} = require('@putout/operator-json');
const {pause, start} = require('@putout/operator-filesystem');
const log = require('debug')('putout:runner:scanner');

const fromSimple = require('@putout/plugin-filesystem/from-simple');
const toSimple = require('@putout/plugin-filesystem/to-simple');

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
    ['__putout_processor_filesystem(__)'](path) {
        log(rule);
        
        const rootPath = path.get('arguments.0');
        const isSimple = fullstore(false);
        
        runSimple(fromSimple, {
            path,
            rootPath,
            isSimple,
        });
        
        scan(rootPath, {
            push,
            options,
        });
        
        runSimple(toSimple, {
            condition: isSimple(),
            path,
            rootPath,
            isSimple,
        });
    },
});

const runFix = ({fix, isSimple}) => (...a) => {
    isSimple(true);
    return fix(...a);
};

function runSimple(plugin, {path, isSimple, condition = true}) {
    const {traverse, fix} = plugin;
    
    if (!condition)
        return;
    
    const push = runFix({
        fix,
        isSimple,
    });
    
    const visitors = traverse({
        push,
    });
    
    const [visit, template] = parseVisitor(visitors);
    
    if (compare(path, template)) {
        pause();
        visit(path);
        start();
    }
}

function parseVisitor(visitors) {
    const to = visitors[`${__filesystem_name}(__object)`];
    const from = visitors[`${__filesystem_name}(__array)`];
    
    if (to)
        return [
            to,
            `${__filesystem_name}(__object)`,
        ];
    
    return [
        from,
        `${__filesystem_name}(__array)`,
    ];
}