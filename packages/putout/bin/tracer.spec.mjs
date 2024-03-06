import {createRequire} from 'node:module';
import {spawnSync} from 'node:child_process';
import {test} from 'supertape';

const require = createRequire(import.meta.url);
const cliPath = new URL('tracer.mjs', import.meta.url).pathname;

test('putout: bin: cli: tracer -v', (t) => {
    const {version} = require('../package.json');
    const {stdout} = spawnSync(cliPath, ['-v'], {
        encoding: 'utf8',
    });
    
    t.equal(stdout, `v${version}\n`);
    t.end();
});

test('putout: bin: cli: tracer: -h', (t) => {
    const help = require('../lib/cli/help');
    const {stdout} = spawnSync(cliPath, ['-h'], {
        encoding: 'utf8',
    });
    
    t.equal(stdout, `${help()}\n`);
    t.end();
});
