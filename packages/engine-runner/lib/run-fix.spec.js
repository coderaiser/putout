import {test, stub} from 'supertape';
import {tryCatch} from 'try-catch';
import fix from './run-fix.js';

test('engine-runner: fix: error', (t) => {
    const remove = () => {
        throw Error('hello');
    };
    
    const fn = (a) => a();
    
    const position = {
        line: 10,
        column: 1,
    };
    
    const path = {
        remove,
    };
    
    const is = true;
    
    const [e] = tryCatch(fix, is, fn, {
        path,
        position,
    });
    
    t.equal(e.loc, position);
    t.end();
});

test('fix: error: nested path: debug', (t) => {
    const debugFn = stub();
    
    debugFn.enabled = true;
    
    globalThis.__putout_debug = stub().returns(debugFn);
    
    const remove = () => {
        throw Error('hello');
    };
    
    const fn = (a) => a();
    
    const position = {
        line: 10,
        column: 1,
    };
    
    const path = {
        remove,
    };
    
    const is = true;
    
    const [e] = tryCatch(fix, is, fn, {
        path,
        position,
    });
    
    delete globalThis.__putout_debug;
    
    t.equal(e.loc, position);
    t.end();
});

test('fix: error: nested path: debug: nested path', (t) => {
    const {__putout_debug} = globalThis;
    const debugFn = stub();
    
    debugFn.enabled = true;
    
    globalThis.__putout_debug = stub().returns(debugFn);
    
    const remove = () => {
        throw Error('hello');
    };
    
    const fn = (a) => a();
    
    const position = {
        line: 10,
        column: 1,
    };
    
    const path = {
        path: {
            remove,
        },
    };
    
    const is = true;
    
    const [e] = tryCatch(fix, is, fn, {
        path,
        position,
    });
    
    globalThis.__putout_debug = __putout_debug;
    
    t.equal(e.loc, position);
    t.end();
});

test('fix: is: false', (t) => {
    const remove = () => {
        throw Error('hello');
    };
    
    const fn = stub();
    
    const position = {
        line: 10,
        column: 1,
    };
    
    const path = {
        remove,
    };
    
    const is = false;
    
    fix(is, fn, {
        path,
        position,
    });
    
    t.notCalled(fn, 'should not call fn');
    t.end();
});
