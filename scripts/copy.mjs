#!/usr/bin/env node

import {cp} from 'fs/promises';

const {argv, exit} = process;
const [from, to] = argv.slice(2);

if (!from || !to) {
    console.error(`copy [from] [to]`);
    exit(1);
}

const libFrom = `./packages/plugin-${from}/lib/${from}.js`;
const testFrom = `./packages/plugin-${from}/test/${from}.js`;
const fixtureFrom = `./packages/plugin-${from}/test/fixture`;

const libTo = `./packages/plugin-${to}/lib/${from}/index.js`;
const testTo = `./packages/plugin-${to}/lib/${from}/index.spec.js`;
const fixtureTo = `./packages/plugin-${to}/lib/${from}/fixture`;

await cp(libFrom, libTo);
await cp(testFrom, testTo);
await cp(fixtureFrom, fixtureTo, {
    recursive: true,
});

