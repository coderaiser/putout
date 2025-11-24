import {test, stub} from 'supertape';
import {
    INTERACTIVE_CANCELED,
    INVALID_CONFIG,
} from 'putout/exit-codes';
import {createReport} from './index.js';

test('putout: engine-reporter: createReport', async (t) => {
    const exit = stub();
    const cwd = stub();
    
    await createReport({
        args: [],
        cwd,
        exit,
    });
    
    t.calledWith(exit, [INVALID_CONFIG, TypeError('plugins is not iterable')]);
    t.end();
});

test('putout: engine-reporter: createReport: interactive', async (t) => {
    const interactive = true;
    const exit = stub();
    const cwd = stub();
    const getOptions = stub().returns({});
    const cliChooseFormatter = './fixture/cli-choose-formatter.js';
    
    const args = {
        interactive,
    };
    
    await createReport({
        args,
        cwd,
        exit,
        getOptions,
        cliChooseFormatter,
    });
    
    t.calledWith(exit, [INTERACTIVE_CANCELED]);
    t.end();
});

test('putout: engine-reporter: createReport: getFormatter', async (t) => {
    const exit = stub();
    const cwd = stub();
    const getOptions = stub().returns({});
    const getFormatter = stub().resolves([]);
    const cliChooseFormatter = './fixture/cli-choose-formatter-dump.js';
    
    const args = {
        interactive: true,
    };
    
    await createReport({
        args,
        cwd,
        exit,
        getOptions,
        cliChooseFormatter,
        getFormatter,
    });
    
    t.calledWith(getFormatter, ['dump', exit]);
    t.end();
});

test('putout: engine-reporter: createReport: report', async (t) => {
    const exit = stub();
    const cwd = stub();
    const getOptions = stub().returns({});
    const format = stub();
    const getFormatter = stub().resolves([format]);
    const cliChooseFormatter = './fixture/cli-choose-formatter-dump.js';
    
    const args = {};
    
    const report = await createReport({
        args,
        cwd,
        exit,
        getOptions,
        cliChooseFormatter,
        getFormatter,
    });
    
    const result = await report({
        places: [],
    });
    
    t.notOk(result);
    t.end();
});
