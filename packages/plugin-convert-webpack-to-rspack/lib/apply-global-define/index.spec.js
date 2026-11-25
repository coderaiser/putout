import {createTest} from '@putout/test';
import * as applyGlobalDefine from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-global-define', applyGlobalDefine],
    ],
});

test('putout: plugin-convert-webpack-to-rspack: apply-global-define: report: global-define', (t) => {
    t.report('global-define', `Use 'DefinePlugin' to replace 'global' with 'globalThis': 'node.global' does not work for ESM modules`);
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-global-define: transform: global-define', (t) => {
    t.transform('global-define');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-global-define: transform: plugins', (t) => {
    t.transform('plugins');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-global-define: no transform: defined', (t) => {
    t.noTransform('defined');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-global-define: no transform: target-node', (t) => {
    t.noTransform('target-node');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-global-define: no transform: not-config', (t) => {
    t.noTransform('not-config');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-global-define: no transform: plugins-variable', (t) => {
    t.noTransform('plugins-variable');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-global-define: no transform: output-only', (t) => {
    t.noTransform('output-only');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-global-define: no transform: defined-destructured', (t) => {
    t.noTransform('defined-destructured');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-global-define: no transform: target-node-array', (t) => {
    t.noTransform('target-node-array');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-global-define: transform: target-web', (t) => {
    t.transform('target-web');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-global-define: transform: define-other', (t) => {
    t.transform('define-other');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-global-define: no transform: export-not-object', (t) => {
    t.noTransform('export-not-object');
    t.end();
});
