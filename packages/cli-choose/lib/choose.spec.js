import {test, stub} from 'supertape';
import {choose} from './choose.js';

test('putout: cli: choose', async (t) => {
    const run = stub();
    const Select = stub().returns({
        run,
    });
    
    await choose('hello', ['one', 'two'], {
        Select,
    });
    
    t.calledWithNew(Select);
    t.end();
});
