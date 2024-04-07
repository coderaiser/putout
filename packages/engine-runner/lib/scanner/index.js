'use strict';

const fullstore = require('fullstore');
const {compare} = require('@putout/compare');
const {__filesystem_name} = require('@putout/operator-json');

const {
    findFile,
    pause,
    start,
} = require('@putout/operator-filesystem');

const log = require('debug')('putout:runner:scanner');

const fromSimple = require('@putout/plugin-filesystem/from-simple');
const toSimple = require('@putout/plugin-filesystem/to-simple');

module.exports = ({rule, plugin, msg, options}, {progress}) => {
    const {
        scan,
        report,
        fix,
    } = plugin;
    
    progress.inc();
    
    const traverse = getTraverse({
        scan,
        rule,
        progress,
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

const watchPush = ({push, rule, progress}) => (...a) => {
    progress.push(rule);
    push(...a);
};

const createFileProgress = ({rule, progress}) => ({i, n}) => {
    ++i;
    const percent = `${Math.round(i / n * 100)}%`;
    
    progress.file({
        i,
        n,
        percent,
        rule,
    });
};

const createTrackFile = (fileProgress) => function*(...a) {
    const files = findFile(...a);
    const n = files.length;
    
    for (const [i, file] of files.entries()) {
        fileProgress({
            i,
            n,
        });
        yield file;
    }
};

const getTraverse = ({scan, rule, progress}) => ({push, options}) => ({
    [`${__filesystem_name}(__)`](path) {
        log(rule);
        progress.start(rule);
        
        const rootPath = path.get('arguments.0');
        const isSimple = fullstore(false);
        
        const fileProgress = createFileProgress({
            rule,
            progress,
        });
        
        const trackFile = createTrackFile(fileProgress);
        
        runSimple(fromSimple, {
            path,
            rootPath,
            isSimple,
        });
        
        scan(rootPath, {
            push: watchPush({
                push,
                rule,
                progress,
            }),
            progress: fileProgress,
            trackFile,
            options,
        });
        
        runSimple(toSimple, {
            condition: isSimple(),
            path,
            rootPath,
            isSimple,
        });
        
        progress.end(rule);
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
