import {createRequire} from 'node:module';
import process from 'node:process';
import {tryCatch} from 'try-catch';
import {test, stub} from 'supertape';
import {loadPlugin} from './load.js';

const {assign} = Object;

test('putout: engine-loader: load: yarn OnP support', (t) => {
    const customRequire = stub().returns('plugin');
    
    assign(customRequire, {
        resolve: stub().returns('world'),
    });
    
    const createRequire = stub().returns(customRequire);
    
    const result = loadPlugin({
        name: 'hello',
        namespace: 'putout',
        createRequire,
    });
    
    const expected = 'plugin';
    
    t.equal(result, expected);
    t.end();
});

test('putout: engine-loader: load: env: PUTOUT_YARN_PNP', (t) => {
    process.env.PUTOUT_YARN_PNP = 'hello';
    
    const [error] = tryCatch(loadPlugin, {
        name: 'hello',
        namespace: 'putout',
    });
    
    delete process.env.PUTOUT_YARN_PNP;
    
    t.match(error.message, `Cannot find module 'hello'`);
    t.end();
});

test('putout: engine-loader: load: createRequire', (t) => {
    const customRequire = stub().returns('plugin');
    
    assign(customRequire, {
        resolve: stub().returns('world'),
    });
    
    const createRequire = stub().returns(customRequire);
    
    tryCatch(loadPlugin, {
        name: '@putout/plugin-remove-debugger',
        namespace: 'putout',
        createRequire,
    });
    
    t.calledCount(createRequire, 4, 'should call for "putout" and PUTOUT_YARN_PNP');
    t.end();
});

test('putout: engine-loader: load: PUTOUT_LOAD_DIR', (t) => {
    process.env.PUTOUT_LOAD_DIR = new URL('fixture', import.meta.url).pathname;
    
    const {report} = loadPlugin({
        namespace: 'putout',
        name: 'hello',
    });
    
    delete process.env.PUTOUT_LOAD_DIR;
    
    const result = report();
    const expected = 'hello';
    
    t.equal(result, expected);
    t.end();
});

test('putout: engine-loader: load: getPath', (t) => {
    const getModulePath = stub();
    
    tryCatch(loadPlugin, {
        namespace: 'putout',
        name: 'hello',
        getModulePath,
    });
    
    const args = ['@putout/plugin-hello', {
        createRequire,
    }];
    
    t.calledWith(getModulePath, args);
    t.end();
});

test('putout: engine-loader: load: getPath: last', (t) => {
    const getModulePath = stub().returns([]);
    
    tryCatch(loadPlugin, {
        namespace: 'putout',
        name: 'hello',
        getModulePath,
    });
    
    const overrides = {
        createRequire,
    };
    
    t.calledWith(getModulePath, ['hello', overrides]);
    t.end();
});

test('putout: engine-loader: load: getPath: second', (t) => {
    const getModulePath = stub().returns([]);
    
    tryCatch(loadPlugin, {
        namespace: 'putout',
        name: 'hello',
        getModulePath,
    });
    
    const {args} = getModulePath;
    
    const overrides = {
        createRequire,
    };
    
    const expected = [
        ['@putout/plugin-hello', overrides],
        ['putout-plugin-hello', overrides],
        ['hello', overrides],
    ];
    
    t.deepEqual(args, expected);
    t.end();
});
