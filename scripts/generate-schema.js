#!/usr/bin/env node

import {readdir} from 'node:fs/promises';
import montag from 'montag';

const [plugin] = process.argv.slice(2);

if (!plugin) {
    console.log('generate-schema [plugin]');
}

const names = await readdir(process.cwd());

for (const name of names) {
    console.log(run(plugin, name));
}

function run(plugin, rule) {
    return montag`
        "${plugin}/${rule}": {
            "$ref": "#/definitions/rule"
        },
    `;
}
