import {join} from 'path';
import {once} from 'events';
import {fork} from 'child_process';

import {test} from 'supertape';
import {
    createSimport,
    createCommons,
} from 'simport';

const simport = createSimport(import.meta.url);
const {__dirname} = createCommons(import.meta.url);

const cliPath = join(__dirname, 'putout.mjs');

test('putout: cli: -v', async (t) => {
    const {version} = await simport('../package.json');
    const child = fork(cliPath, ['-v']);
    
    const [message] = await once(child, 'message');
    
    t.equal(message, `v${version}`);
    t.end();
});

test('putout: cli: -h', async (t) => {
    const help = await simport('../lib/cli/help');
    const child = fork(cliPath, ['-h']);
    
    const [message] = await once(child, 'message');
    
    t.equal(message, help());
    t.end();
});

