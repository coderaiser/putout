import {test, stub} from 'supertape';
import {findUp} from './find-up.js';

test('putout: cli-cache: find-up: name: array', async (t) => {
    const escalade = stub((dir, fn) => {
        fn(dir, []);
    });
    
    await findUp(['hello'], {
        cwd: '/',
        escalade,
    });
    
    t.calledWith(escalade, ['/', stub()]);
    t.end();
});

test('putout: cli-cache: find-up', async (t) => {
    const escalade = stub((dir, fn) => {
        fn(dir, []);
    });
    
    await findUp('hello', {
        cwd: '/',
        escalade,
    });
    
    t.calledWith(escalade, ['/', stub()]);
    t.end();
});
