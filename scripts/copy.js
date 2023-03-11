#!/usr/bin/env node

import {cp} from 'fs/promises';
import tryToCatch from 'try-to-catch';

const {argv, exit} = process;
const [from, to, type] = argv.slice(2);

if (!from || !to) {
    console.error(`copy [from] [to]`);
    exit(0);
}

if (type === '--nested')
    await copyNestedPlugin(from, to);

const [error] = await tryToCatch(copySimplePlugin, from, to);

if (!error) {
    exit();
}

await copyNestedPlugin(from, to);

async function copySimplePlugin(from, to) {
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
}

async function copyNestedPlugin(from, to) {
    const libFrom = `./packages/plugin-${from}/lib/`;
    const libTo = `./packages/plugin-${to}/lib/`;
    
    await cp(libFrom, libTo, {
        recursive: true,
    });
}

