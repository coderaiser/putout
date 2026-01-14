import {fullstore} from 'fullstore';
import {compare} from '@putout/compare';
import {__filesystem_name} from '@putout/operator-json';
import {
    findFile,
    pause,
    start,
} from '@putout/operator-filesystem';
import * as fromSimple from '@putout/plugin-filesystem/from-simple';
import * as toSimple from '@putout/plugin-filesystem/to-simple';
import {createDebug} from '../debug.js';

const log = createDebug('putout:runner:scanner');

export const scan = ({rule, plugin, msg, options}, {progress}) => {
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
            shouldConvert: true,
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
            shouldConvert: isSimple(),
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

function runSimple(plugin, {path, isSimple, shouldConvert = true}) {
    const {traverse, fix} = plugin;
    
    if (!shouldConvert)
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
