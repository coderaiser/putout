import {createTest} from '@putout/test/processor';
import * as css from '@putout/processor-css';

const typos = {
    files: '*.css',
    lint: (code) => [
        code,
        [{
            rule: 'typo (typos)',
            message: 'Typo: target -> target',
            position: {
                line: 1,
                column: 1,
            },
        }],
    ],
};

const test = createTest(import.meta.url, {
    extension: 'css',
    processorRunners: [typos, css],
});

test('putout: engine: processor: couple', async ({comparePlaces}) => {
    await comparePlaces('couple', [{
        message: 'Typo: target -> target',
        position: {
            column: 1,
            line: 1,
        },
        rule: 'typo (typos)',
    }, {
        message: 'Expected indentation of 4 spaces',
        position: {
            column: 1,
            line: 2,
        },
        rule: '@stylistic/indentation (stylelint)',
    }, {
        message: 'Unexpected unknown type selector "target"',
        position: {
            column: 1,
            line: 1,
        },
        rule: 'selector-type-no-unknown (stylelint)',
    }]);
});
