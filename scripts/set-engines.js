#!/usr/bin/env node

import {
    readFile,
    writeFile,
} from 'node:fs/promises';

const {parse, stringify} = JSON;

console.log(process.cwd());

const data = await readFile('./package.json', 'utf8');
const json = parse(data);

json.engines.node = '>=16';

await writeFile('./package.json', stringify(json, null, 2) + '\n');
