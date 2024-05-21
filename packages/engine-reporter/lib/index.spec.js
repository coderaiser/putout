import {test, stub} from 'supertape';
import {createReport} from './index.js';

test('putout: engine-reporter: createReport', async (t) => {
    const exit = stub();
    const cwd = stub();
    
    await createReport({
        args: [],
        cwd,
        exit,
    });
    
    t.calledWith(exit, [12, TypeError('plugins is not iterable')]);
    t.end();
});
