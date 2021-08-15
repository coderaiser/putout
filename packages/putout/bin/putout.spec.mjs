import {join} from 'path';
import {spawnSync} from 'child_process';

import {test} from 'supertape';
import {
    createSimport,
    createCommons,
} from 'simport';

const simport = createSimport(import.meta.url);
const {__dirname} = createCommons(import.meta.url);

const cliPath = join(__dirname, 'putout.mjs');

test('putout: bin: cli: -v', async (t) => {
    const {version} = await simport('../package.json');
    const {stdout} = spawnSync(cliPath, ['-v'], {
        encoding: 'utf8',
    });
    
    t.equal(stdout, `v${version}\n`);
    t.end();
});

test('putout: bin: cli: -h', async (t) => {
    const help = await simport('../lib/cli/help');
    const {stdout} = spawnSync(cliPath, ['-h'], {
        encoding: 'utf8',
    });
    
    t.equal(stdout, `${help()}\n`);
    t.end();
});

