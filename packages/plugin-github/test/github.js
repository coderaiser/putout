import {createTest} from '@putout/test';
import * as github from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['github', github],
    ],
});

test('plugin-github: transform: set-node-version', (t) => {
    t.transform('set-node-version');
    t.end();
});

test('plugin-github: transform: set-checkout-version', (t) => {
    t.transform('set-checkout-version');
    t.end();
});

test('plugin-github: transform: set-coveralls-version', (t) => {
    t.transform('set-coveralls-version');
    t.end();
});

test('plugin-github: transform: set-docker-build-push-version', (t) => {
    t.transform('set-docker-build-push-version');
    t.end();
});

test('plugin-github: transform: set-setup-node-version', (t) => {
    t.transform('set-setup-node-version');
    t.end();
});

test('plugin-github: transform: set-add-and-commit', (t) => {
    t.transform('set-add-and-commit');
    t.end();
});

test('plugin-github: transform: add-continue-on-error-to-coveralls', (t) => {
    t.transform('add-continue-on-error-to-coveralls');
    t.end();
});

test('plugin-github: transform: add-continue-on-error-to-add-and-commit', (t) => {
    t.transform('add-continue-on-error-to-add-and-commit');
    t.end();
});

test('plugin-github: transform: install-bun', (t) => {
    t.transform('install-bun');
    t.end();
});

test('plugin-github: transform: convert-npm-to-bun', (t) => {
    t.transform('convert-npm-to-bun');
    t.end();
});

test('plugin-github: transform: insert-rust', (t) => {
    t.transform('insert-rust');
    t.end();
});

test('plugin-github: transform: set-setup-qemu-version', (t) => {
    t.transform('set-setup-qemu-version');
    t.end();
});

test('plugin-github: transform: set-docker-setup-buildx-version', (t) => {
    t.transform('set-docker-setup-buildx-version');
    t.end();
});
