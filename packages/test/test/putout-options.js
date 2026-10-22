import {createTest} from '../lib/test.js';

const noop = () => {};

const testRunners = createTest(import.meta.url, {
    runners: {
        when: (a) => ({
            ...a,
            plugin: {
                ...a.plugin,
                traverse: ({push}) => ({
                    DebuggerStatement(path) {
                        push(path);
                    },
                }),
            },
        }),
    },
    plugins: [
        ['when', {
            report: noop,
            fix: noop,
            when: noop,
        }],
    ],
});

testRunners('test: runners', (t) => {
    t.noReport('when', [
        ['when', {
            report: noop,
            fix: noop,
            when: noop,
        }],
    ]);
    t.end();
});
