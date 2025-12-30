import {test, stub} from 'supertape';
import {
    NO_FORMATTER,
    CANNOT_LOAD_FORMATTER,
} from 'putout/exit-codes';
import {getFormatter} from './formatter.js';

test('putout: cli: formatter: get formatter', async (t) => {
    const exit = stub();
    
    const {default: progress} = await import('@putout/formatter-progress');
    
    const result = await getFormatter('progress', exit);
    const expected = [progress, {}];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: formatter: get formatter: none', async (t) => {
    const exit = stub();
    
    const result = await getFormatter(undefined, exit);
    const expected = [
        stub(), {}];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: formatter: get formatter: options', async (t) => {
    const exit = stub();
    
    const formatterOptions = {
        minCount: 10,
    };
    
    const {default: progress} = await import('@putout/formatter-progress');
    
    const result = await getFormatter(['progress', formatterOptions], exit);
    const expected = [progress, formatterOptions];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: formatter: get reporter: exit: NO_FORMATTER', async (t) => {
    const exit = stub();
    await getFormatter('xxx', exit);
    
    const expected = [NO_FORMATTER, Error(`Cannot find package 'putout-formatter-xxx'`)];
    
    t.calledWith(exit, expected, 'should call exit');
    t.end();
});

test('putout: cli: formatter: get reporter: exit: CANNOT_LOAD_FORMATTER', async (t) => {
    const exit = stub();
    const createAsyncLoader = stub().returns(stub().rejects(Error('@putout/formatter-xxx: Syntax error')));
    
    await getFormatter('xxx', exit, {
        createAsyncLoader,
    });
    
    const expected = [CANNOT_LOAD_FORMATTER, Error(`@putout/formatter-xxx: Syntax error`)];
    
    t.calledWith(exit, expected, 'should call exit');
    t.end();
});

test('putout: cli: formatter: get reporter: pass load', async (t) => {
    const exit = stub();
    const simpleImport = stub().rejects(Error('simple import'));
    
    await getFormatter('xxx', exit, {
        simpleImport,
    });
    
    const expected = [CANNOT_LOAD_FORMATTER, Error(`@putout/formatter-xxx: simple import`)];
    
    t.calledWith(exit, expected, 'should call exit');
    t.end();
});
