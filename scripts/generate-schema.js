import {readdir} from 'node:fs/promises';
import process from 'node:process';
import montag from 'montag';

const run = (plugin, rule) => montag`
    "${plugin}/${rule}": {
        "$ref": "#/definitions/rule"
    },
`;

const [plugin] = process.argv.slice(2);

if (!plugin) {
    console.log('generate-schema [plugin]');
    process.exit();
}

const names = await readdir(process.cwd());

for (const name of names) {
    console.log(run(plugin, name));
}

