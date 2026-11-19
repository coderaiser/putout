import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    extension: 'html',
    processors: ['html'],
});

test('putout: processor: html', async ({process}) => {
    await process('html', [
        ['remove-button', {
            report: () => '',
            replace: () => ({
                '<button>__a</button>': '',
            }),
        }],
    ]);
});

test('putout: processor: html: class', async ({process}) => {
    await process('class', [
        ['remove-button', {
            report: () => '',
            replace: () => ({
                '<button>__a</button>': '',
            }),
        }],
    ]);
});

test('putout: processor: html: semicolon', async ({noProcess}) => {
    await noProcess('no-semicolon');
});

test('putout: processor: html: doctype', async ({process}) => {
    await process('doctype', [
        ['remove-button', {
            report: () => '',
            replace: () => ({
                '<button>__a</button>': '',
            }),
        }],
    ]);
});

test('putout: processor: html: doctype: lower case', async ({process}) => {
    await process('doctype-lower', [
        ['remove-button', {
            report: () => '',
            replace: () => ({
                '<button>__a</button>': '',
            }),
        }],
    ]);
});

test('putout: processor: html: doctype: no changes', async ({noProcess}) => {
    await noProcess('doctype-no-changes');
});

test('putout: processor: html: no changes', async ({noProcess}) => {
    await noProcess('no-changes');
});

test('putout: processor: html: no changes: no new line at end', async ({noProcess}) => {
    await noProcess('no-changes-eof');
});
