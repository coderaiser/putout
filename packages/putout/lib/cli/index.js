import process from 'node:process';
import {createRequire} from 'node:module';
import {tryToCatch} from 'try-to-catch';
import {isCI as _isCI} from 'ci-info';
import {tryCatch} from 'try-catch';
import wraptile from 'wraptile';
import {fullstore} from 'fullstore';
import nano from 'nano-memoize';
import * as _cliStaged from '@putout/cli-staged';
import {initReport as _initReport} from '@putout/engine-reporter/report';
import {keypress as _keypress} from '@putout/cli-keypress';
import {getFormatter} from '@putout/engine-reporter/formatter';
import {
    runProcessors as _runProcessors,
    getFilePatterns as _getFilePatterns,
    getProcessorRunners as _getProcessorRunners,
    defaultProcessors,
} from '@putout/engine-processor';
import * as supportedFiles from './supported-files.js';
import _getOptions from './get-options.js';
import {argvConfig, parseArgs} from './parse-args.js';
import {getFiles as _getFiles} from './get-files.js';
import {simpleImport as _simpleImport} from './simple-import.js';
import {run} from './runner/runner.js';

const require = createRequire(import.meta.url);
const {formatter: defaultFormatter} = require('../../putout.json');
const {version, dependencies} = require('../../package.json');

const {
    OK,
    PLACE,
    STAGE,
    NO_FILES,
    CANNOT_LOAD_PROCESSOR,
    WAS_STOP,
    INVALID_OPTION,
    UNHANDLED,
    RULER_WITH_FIX,
    RULER_NO_FILES,
    INVALID_CONFIG,
    CANNOT_LINT_STAGED,
    INTERACTIVE_CANCELED,
} = require('./exit-codes');

const _getFormatter = nano.nanomemoize(getFormatter);
const {isSupported} = supportedFiles;
const {keys} = Object;
const noop = () => {};
const cwd = process.cwd();
const {env} = process;

const getEnvNames = () => !env.PUTOUT_FILES ? [] : env.PUTOUT_FILES.split(',');

const getExitCode = (wasStop) => wasStop() ? WAS_STOP : OK;
const isStr = (a) => typeof a === 'string';
const isNoop = (a) => String(a) === String(noop);

const parseIsStop = (passedIsStop, {keypress}) => {
    if (!isNoop(passedIsStop))
        return passedIsStop;
    
    const {isStop} = keypress();
    
    return isStop;
};

export default async (overrides = {}) => {
    const {
        argv,
        halt,
        log,
        write,
        logError,
        readFile,
        writeFile,
        trace = noop,
        keypress = _keypress,
        getOptions = _getOptions,
        getFiles = _getFiles,
        cliStaged = _cliStaged,
        cliCache,
        initProcessFile,
        initReport = _initReport,
        getFormatter = _getFormatter,
        isCI = _isCI,
        simpleImport = _simpleImport,
        processor = {},
    } = overrides;
    
    const isStop = parseIsStop(overrides.isStop || noop, {
        keypress,
    });
    
    trace('start');
    
    const wasStop = fullstore();
    const args = parseArgs(argv);
    
    if (args.ci && isCI) {
        args.format = 'stream';
        args.cache = false;
    }
    
    const {
        fix,
        fixCount,
        raw,
        rulesdir,
        format,
        disable,
        disableAll,
        enable,
        enableAll,
        staged,
        fresh,
        cache,
        transform,
        plugins,
    } = args;
    
    const {createExit} = await simpleImport('./exit.js');
    
    const exit = createExit({
        raw,
        halt,
        logError,
    });
    
    addOnce(process, 'unhandledRejection', wraptile(exit, UNHANDLED));
    
    const optionsList = [
        ...argvConfig.boolean,
        ...argvConfig.string,
        ...argvConfig.number,
    ];
    
    const {validateArgs} = await import('@putout/cli-validate-args');
    const validationError = await validateArgs(args, optionsList);
    
    if (validationError)
        return exit(INVALID_OPTION, validationError);
    
    if (args.version) {
        log(`v${version}`);
        return exit();
    }
    
    let newFormatter;
    
    if (args.interactive) {
        const {chooseFormatter} = await simpleImport('@putout/cli-choose-formatter');
        
        [newFormatter] = await chooseFormatter(defaultFormatter, keys(dependencies));
        
        if (!newFormatter)
            return exit(INTERACTIVE_CANCELED);
    }
    
    if (args.help) {
        const {help} = await import('./help.js');
        log(help());
        
        return exit();
    }
    
    if (isStr(args.match)) {
        const {match} = await simpleImport('@putout/cli-match');
        const {code, message} = await match({
            pattern: args.match,
            cwd,
            readFile,
            writeFile,
        });
        
        return exit(code, `--match: ${message}`);
    }
    
    if (fix && (enable || disable || enableAll || disableAll))
        return exit(RULER_WITH_FIX, Error(`'--fix' cannot be used with ruler toggler ('--enable', '--disable')`));
    
    if (enable || disable) {
        const {ruler} = await simpleImport('@putout/cli-ruler');
        
        ruler([], {
            enable,
            disable,
            readFile,
            writeFile,
        });
    }
    
    const noConfig = !args.config;
    
    const [configError, config] = tryCatch(getOptions, {
        name: `${cwd}/*`,
        rulesdir,
        noConfig,
        transform,
        plugins,
    });
    
    if (configError)
        return exit(INVALID_CONFIG, configError);
    
    const {
        formatter,
        ignore,
        processors = defaultProcessors,
    } = config;
    
    const {
        runProcessors = _runProcessors,
        getFilePatterns = _getFilePatterns,
        getProcessorRunners = _getProcessorRunners,
    } = processor;
    
    const [currentFormat, formatterOptions] = await getFormatter(newFormatter || format || formatter, exit);
    const [error, processorRunners] = await tryToCatch(getProcessorRunners, processors, simpleImport);
    
    if (error)
        return exit(CANNOT_LOAD_PROCESSOR, error);
    
    const patterns = getFilePatterns(processorRunners);
    
    supportedFiles.add(patterns);
    
    const stagedNames = [];
    
    if (staged) {
        const {get} = cliStaged;
        const {findUp} = await simpleImport('find-up');
        
        const [error, names] = await tryToCatch(get, {
            findUp,
            isSupported,
        });
        
        if (error)
            return exit(CANNOT_LINT_STAGED, `--staged: ${error.message}`);
        
        stagedNames.push(...names);
    }
    
    const globFiles = [
        ...stagedNames,
        ...args._.map(String),
        ...getEnvNames(),
    ];
    
    const [e, names] = await getFiles(globFiles, {
        ignore,
    });
    
    if (e)
        return exit(NO_FILES, e);
    
    const noFiles = !names.length;
    
    if (noFiles && (enableAll || disableAll))
        return exit(RULER_NO_FILES, Error('`path` is missing for ruler toggler (`--enable-all`, `--disable-all`)'));
    
    if (noFiles)
        return exit();
    
    const {createCache} = cliCache || await simpleImport('@putout/cli-cache');
    
    const fileCache = await createCache({
        version,
        cache,
        fresh,
    });
    
    const options = {
        fix,
        fixCount,
        raw,
        ruler: {
            disable,
            disableAll,
            enable,
            enableAll,
        },
        
        log,
        logError,
        write,
        transform,
        plugins,
    };
    
    const report = initReport();
    
    const {places, exited} = await run({
        report,
        processorRunners,
        trace,
        fix,
        exit,
        readFile,
        writeFile,
        raw,
        rulesdir,
        names,
        options,
        fileCache,
        currentFormat,
        formatterOptions,
        write,
        log,
        isStop,
        wasStop,
        noConfig,
        plugins,
        transform,
        initProcessFile,
        getOptions,
        runProcessors,
    });
    
    if (exited)
        return;
    
    fileCache.reconcile();
    
    if (enableAll || disableAll) {
        const {ruler} = await simpleImport('@putout/cli-ruler');
        
        await ruler(places, {
            enableAll,
            disableAll,
            readFile,
            writeFile,
        });
    }
    
    if (fix && staged) {
        const {set} = cliStaged;
        const {findUp} = await simpleImport('find-up');
        
        const stagedNames = await set({
            findUp,
        });
        
        if (!stagedNames.length)
            return exit(STAGE);
    }
    
    if (places.length)
        return exit(PLACE);
    
    const exitCode = getExitCode(wasStop);
    
    exit(exitCode);
};

export const _addOnce = addOnce;

function addOnce(emitter, name, fn) {
    if (!emitter.listenerCount(name))
        emitter.on(name, fn);
}
