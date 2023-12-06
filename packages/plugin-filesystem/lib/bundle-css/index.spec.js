'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['bundle-css', plugin],
    ],
});

test('packages: bundle-css: report', (t) => {
    t.reportWithOptions('bundle-css', `Minify css`, {
        groups: [
            ['__:columns/__', [
                'name-size-date.css',
                'name-size.css',
            ]],
            ['__:modules/__', [
                'view.css',
                'terminal.css',
                'config.css',
                'help.css',
                'user-menu.css',
            ]],
            ['main.css', [
                'reset.css',
                'main.css',
                'supports.css',
                'query.css',
                'style.css',
                'urls.css',
                'icons.css',
            ]],
            '1:1',
        ],
    });
    t.end();
});

test('packages: bundle-css: no report: no-css', (t) => {
    t.noReport('no-css');
    t.end();
});

test('packages: bundle-css: no report: has-dist', (t) => {
    t.noReport('has-dist');
    t.end();
});

test('packages: bundle-css: transform', (t) => {
    t.transformWithOptions('bundle-css', {
        groups: [
            ['__:columns/__', [
                'name-size-date.css',
                'name-size.css',
            ]],
            ['__:modules/__', [
                'view.css',
                'terminal.css',
                'config.css',
                'help.css',
                'user-menu.css',
            ]],
            ['main.css', [
                'reset.css',
                'main.css',
                'supports.css',
                'query.css',
                'style.css',
                'urls.css',
                'icons.css',
            ]],
            '1:1',
        ],
    });
    t.end();
});

test('packages: bundle-css: no report: no-groups', (t) => {
    t.noReport('no-group', 'no-groups');
    t.end();
});

test('packages: bundle-css: single', (t) => {
    t.transformWithOptions('single', {
        groups: ['main.css'],
    });
    t.end();
});
