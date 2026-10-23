import * as removeDebugger from '@putout/plugin-remove-debugger';
import type {
    PutoutPlugin,
    Traverser,
    Runner,
    Runners,
} from '../lib/plugin.d.ts';

const noop = () => {};

const {report}: PutoutPlugin = removeDebugger;

report();

const runner: Runner = ({plugin}) => ({
    rule: 'runner-test',
    plugin: {
        report: plugin.report,
    },
});

const runners: Runners = {
    'putout/when': runner,
};

const traverser: Traverser = {
    report: () => '',
    traverse: (api) => ({
        DebuggerStatement: (path) => {
            api.push(path);
        },
    }),
    fix: noop,
};

const plugin: PutoutPlugin = traverser;

function getRunners(runner: Runner, runners: Runners, plugin: PutoutPlugin) {
    return [runner, runners, plugin];
}

getRunners(runner, runners, plugin);
