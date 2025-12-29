import {test, stub} from 'supertape';
import {createRequire} from './module.js';

const noop = () => {};

test('@putout/engine-loader: module', (t) => {
    const module = {};
    
    const result = createRequire('hello', {
        module,
    });
    
    t.deepEqual(result, noop);
    t.end();
});

test('@putout/engine-loader: module: call', (t) => {
    const module = {};
    const fn = createRequire('hello', {
        module,
    });
    
    const result = fn();
    
    t.notOk(result);
    t.end();
});

test('@putout/engine-loader: module: createRequire', (t) => {
    const module = {
        createRequire: stub,
    };
    
    const result = createRequire('hello', {
        module,
    });
    
    t.deepEqual(result, stub());
    t.end();
});
