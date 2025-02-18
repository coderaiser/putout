import {test} from 'supertape';
import findCacheDir from './find-cache-dir.mjs';

test('putout: cli-cache: find-cache-dir', async (t) => {
    const dir = await findCacheDir({
        name: 'putout',
        directory: 'abc',
    });
    
    t.notOk(dir);
    t.end();
});
