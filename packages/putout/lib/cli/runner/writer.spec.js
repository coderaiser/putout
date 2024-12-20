'use strict';

const {join} = require('node:path');
const tryToCatch = require('try-to-catch');
const mockRequire = require('mock-require');
const {test, stub} = require('supertape');

const {simpleImport} = require('../simple-import');

const {reRequire, stopAll} = mockRequire;

test('putout: cli: runner: processor throw: raw', async (t) => {
    const name = join(__dirname, 'fixture/processor.throw');
    const throwProcessor = require('./fixture/processor-throw');
    
    mockRequire('../get-options', stub().returns({
        formatter: await simpleImport('@putout/formatter-json'),
        dir: '.',
        processors: [
            ['throw-processor', throwProcessor],
        ],
    }));
    
    const {places} = await runWriter({
        name,
        currentFormat: 'json-lines',
        formatterOptions: {},
        processorRunners: [throwProcessor],
    });
    
    stopAll();
    
    const expected = [{
        message: 'preProcess',
        position: {
            column: 1,
            line: 1,
        },
        rule: 'parser',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: cli: runner: getOptions: resolve called', async (t) => {
    const getOptions = stub().throws(Error('getOptions error'));
    
    mockRequire('../get-options', getOptions);
    const {runWriter} = reRequire('./writer.js');
    
    await tryToCatch(runWriter, {
        name: '1.js',
        currentFormat: 'json-lines',
        formatterOptions: {},
    });
    
    stopAll();
    
    const [args] = getOptions.args[0];
    
    t.match(args.name, '/');
    t.end();
});

test('putout: cli: runner: ignores', async (t) => {
    mockRequire('../get-options', stub().returns({
        formatter: await simpleImport('@putout/formatter-json'),
        dir: '.',
        ignore: ['fixture'],
    }));
    
    const {places} = await runWriter({
        name: 'fixture/1.js',
        currentFormat: 'json-lines',
        formatterOptions: {},
    });
    
    stopAll();
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: cli: runner: processor: load', async (t) => {
    const name = join(__dirname, 'fixture/processor.throw');
    const processor = await import('@putout/processor-javascript');
    
    mockRequire('../get-options', stub().returns({
        formatter: await simpleImport('@putout/formatter-json'),
        dir: '.',
        processors: [
            ['processor-javascript', processor],
        ],
    }));
    
    const runProcessors = stub().resolves([
        Error('test'),
    ]);
    
    mockRequire('@putout/engine-processor', {
        runProcessors,
    });
    
    reRequire('./reader');
    
    await runWriter({
        name,
        currentFormat: 'json-lines',
        formatterOptions: {},
        processorRunners: [processor],
    });
    
    stopAll();
    
    const [args] = runProcessors.args[0];
    
    t.equal(args.load, simpleImport);
    t.end();
});

async function runWriter(options) {
    const {
        raw = false,
        rulesdir = '',
        formatterOptions = {},
        noConfig = false,
        transform = '',
        plugins = [],
        index = 0,
        fix = false,
        processorRunners = [],
        rawPlaces = [],
        name = '',
        length = 1,
        processFile = stub(),
        log = stub(),
        currentFormat = stub(),
        write = stub(),
        exit = stub(),
        readFile = stub().returns(''),
        writeFile = stub(),
        report = stub(),
        fileCache = getFileCache(),
    } = options;
    
    const {runWriter} = reRequire('./writer.js');
    
    return await runWriter({
        exit,
        raw,
        write,
        log,
        currentFormat,
        rulesdir,
        formatterOptions,
        noConfig,
        transform,
        plugins,
        index,
        fix,
        processFile,
        processorRunners,
        fileCache,
        rawPlaces,
        name,
        length,
        readFile,
        writeFile,
        report,
    });
}

function getFileCache() {
    const canUseCache = stub().returns(false);
    const getPlaces = stub().returns([]);
    const reconcile = stub();
    const setInfo = stub();
    
    const fileCache = {
        canUseCache,
        getPlaces,
        reconcile,
        setInfo,
    };
    
    return fileCache;
}
