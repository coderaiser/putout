import tryToCatch from 'try-to-catch';
import {test, stub} from 'supertape';
import formatter from '@putout/formatter-json';
import * as processorJavaScript from '@putout/processor-javascript';
import {simpleImport} from '../simple-import.js';

test('putout: cli: runner: processor throw: raw', async (t) => {
    const name = new URL('fixture/processor.throw', import.meta.url).pathname;
    const throwProcessor = await import('./fixture/processor-throw.js');
    
    const getOptions = stub().returns({
        formatter,
        dir: '.',
        processors: [
            ['throw-processor', throwProcessor],
        ],
    });
    
    const {places} = await runWriter({
        name,
        currentFormat: 'json-lines',
        formatterOptions: {},
        processorRunners: [throwProcessor],
        getOptions,
    });
    
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
    
    await tryToCatch(runWriter, {
        name: '1.js',
        currentFormat: 'json-lines',
        formatterOptions: {},
        getOptions,
    });
    
    const [args] = getOptions.args[0];
    
    t.match(args.name, '/');
    t.end();
});

test('putout: cli: runner: ignores', async (t) => {
    const getOptions = stub().returns({
        formatter,
        dir: '.',
        ignore: ['fixture'],
    });
    
    const {places} = await runWriter({
        name: 'fixture/1.js',
        currentFormat: 'json-lines',
        formatterOptions: {},
        getOptions,
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: cli: runner: processor: load', async (t) => {
    const name = new URL('fixture/processor.throw', import.meta.url).pathname;
    const getOptions = stub().returns({
        formatter,
        dir: '.',
        processors: [
            ['processor-javascript', processorJavaScript],
        ],
    });
    
    const runProcessors = stub().resolves([
        Error('test'),
    ]);
    
    await runWriter({
        name,
        currentFormat: 'json-lines',
        formatterOptions: {},
        processorRunners: [processorJavaScript],
        runProcessors,
        getOptions,
    });
    
    const [args] = runProcessors.args[0];
    
    t.equal(args.load, simpleImport);
    t.end();
});

async function runWriter(options) {
    const {
        raw = false,
        rulesdir = '',
        formatterOptions = {
        },
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
        getOptions,
        runProcessors,
    } = options;
    
    const {runWriter} = await import('./writer.js');
    
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
        getOptions,
        runProcessors,
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
