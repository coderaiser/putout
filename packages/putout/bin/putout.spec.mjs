import {createRequire} from 'module';
import {spawnSync} from 'child_process';

import {test} from 'supertape';
const require = createRequire(import.meta.url);

const cliPath = new URL('putout.mjs', import.meta.url).pathname;

test('putout: bin: cli: -v', (t) => {
    const {version} = require('../package.json');
    const {stdout} = spawnSync(cliPath, ['-v'], {
        encoding: 'utf8',
    });
    
    t.equal(stdout, `v${version}\n`);
    t.end();
});

test('putout: bin: cli: -h', (t) => {
    const help = require('../lib/cli/help');
    const {stdout} = spawnSync(cliPath, ['-h'], {
        encoding: 'utf8',
    });
    
    t.equal(stdout, `${help()}\n`);
    t.end();
});

