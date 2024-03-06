import {test, stub} from 'supertape';
import {readJSON} from './json.js';

test('putout: cli-choose-formatter', async (t) => {
    const readFile = stub();
    const findUp = stub();
    
    await readJSON('xxx', {
        readFile,
        findUp,
    });
    
    t.notCalled(readFile);
    t.end();
});
