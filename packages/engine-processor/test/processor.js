'use strict';

const tryToCatch = require('try-to-catch');

const {readFile} = require('fs/promises');
const {join} = require('path');

const {test, stub} = require('supertape');
const processFile = require('putout/process-file');
const {
    getFilePatterns,
    runProcessors,
} = require('..');

test('putout: engine-processor: no processor', async (t) => {
    const name = 'hello.xxx';
    const processFile = stub();
    const options = {};
    const rawSource = '';
    
    const {isProcessed} = await runProcessors({
        name,
        processFile,
        options,
        rawSource,
    });
    
    t.notOk(isProcessed, 'should not process');
    t.end();
});

test('putout: engine-processor: javascript', async (t) => {
    const name = 'hello.js';
    const options = {};
    const rawSource = `const a = 'hello'`;
    const processFile = stub().returns({
        source: rawSource,
        places: [],
    });
    
    await runProcessors({
        name,
        processFile,
        options,
        rawSource,
    });
    
    const expected = {
        name,
        options,
        rawSource,
        source: rawSource,
        startLine: 0,
    };
    
    t.calledWith(processFile, [expected], 'should not process');
    t.end();
});

test('putout: engine-processor: javascript: load', async (t) => {
    const name = 'hello.js';
    const options = {};
    const rawSource = `const a = 'hello'`;
    const processFile = stub().returns({
        source: rawSource,
        places: [],
    });
    
    const load = stub().rejects('ERROR LOAD');
    
    const [error] = await tryToCatch(runProcessors, {
        name,
        processFile,
        options,
        rawSource,
        load,
    });
    
    t.equal(error, 'ERROR LOAD');
    t.end();
});

test('putout: engine-processor: markdown: javascript', async (t) => {
    const name = join(__dirname, 'fixture/js.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    const processFile = stub().returns({
        source: rawSource,
        places: [],
    });
    
    await runProcessors({
        name,
        processFile,
        options,
        rawSource,
    });
    
    const expected = {
        name: `${name}{js}`,
        options,
        rawSource,
        source: 'const a = 5;',
        startLine: 1,
    };
    
    t.calledWith(processFile, [expected], 'should not process');
    t.end();
});

test('putout: engine-processor: markdown: fix', async (t) => {
    const name = join(__dirname, 'fixture', 'fix.md');
    const outputName = join(__dirname, 'fixture', 'fix-fix.md');
    const options = {
        dir: __dirname,
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    const output = await readFile(outputName, 'utf8');
    
    const {processedSource} = await runProcessors({
        name,
        fix: true,
        processFile: processFile({
            name: `${name}{js}`,
            fix: true,
        }),
        options,
        rawSource,
    });
    
    t.equal(processedSource, output);
    t.end();
});

test('putout: engine-processor: markdown: no fix', async (t) => {
    const name = join(__dirname, 'fixture/no-fix.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    
    const {processedSource} = await runProcessors({
        name,
        processFile: processFile({
            name: `${name}{js}`,
            fix: true,
        }),
        options,
        rawSource,
    });
    
    t.equal(processedSource, rawSource);
    t.end();
});

test('putout: engine-processor: markdown: no fix: is processed', async (t) => {
    const name = join(__dirname, 'fixture/no-js.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    
    const {isProcessed} = await runProcessors({
        name,
        processFile: processFile({
            name: `${name}{js}`,
            fix: false,
        }),
        options,
        rawSource,
    });
    
    t.ok(isProcessed);
    t.end();
});

test('putout: engine-processor: markdown: fix: do not return processed places', async (t) => {
    const name = join(__dirname, 'fixture/places.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    const fix = true;
    
    const {places} = await runProcessors({
        name,
        fix,
        processFile: processFile({
            name: `${name}{js}`,
            fix,
        }),
        options,
        rawSource,
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: engine-processor: markdown: no fix: return processed places', async (t) => {
    const name = join(__dirname, 'fixture/places.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    const fix = false;
    
    const {places} = await runProcessors({
        name,
        fix,
        processFile: processFile({
            name: `${name}{js}`,
            fix,
        }),
        options,
        rawSource,
    });
    
    const expected = [{
        message: 'Code blocks should be fenced',
        position: {
            column: 1,
            line: 11,
        },
        rule: 'code-block-style (remark-lint)',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

// remark-lint cannot generate the same result as it was before parse,
// it cannot distinguish "fix" and "report" either.
// So at first run with "--fix" on markdown file it will change it to simplified format.
// even if nothing found 🤦🤷
//
// In this case we can benefit from:
// - simplifying format of remark rules (which are split on fix/report with help of options(!));
// - splitting one big rule on a couple small rules;
//
// Otherwise it will mutate the tree and report all found errors, so only one big rule with
// "filter" + "fix" joined and one message is supported ☝️.
//
// Which is hard to maintain.
// So we should choose between "robotic" format 🤖 and change file with no errors found but
// easy to maintain plugins similar to ones 🐊**Putout** has.
// Or hard to maintain one big blob of processing with one message but change only on --fix.
test('putout: engine-processor: markdown: no places no fix', async (t) => {
    const name = join(__dirname, 'fixture', 'no-places-no-change.md');
    const options = {
        dir: __dirname,
        processors: [
            'markdown',
        ],
    };
    
    const fix = true;
    const rawSource = await readFile(name, 'utf8');
    const {processedSource} = await runProcessors({
        name,
        fix,
        processFile: processFile({
            name: `${name}{js}`,
            fix,
        }),
        options,
        rawSource,
    });
    
    t.notEqual(processedSource, rawSource);
    t.end();
});

test('putout: engine-processor: markdown: no fix: processed places', async (t) => {
    const name = join(__dirname, 'fixture/places.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    
    const fix = false;
    const {places} = await runProcessors({
        name,
        processFile: processFile({
            name: `${name}{js}`,
            fix,
        }),
        options,
        rawSource,
    });
    
    const expected = [{
        message: 'Code blocks should be fenced',
        rule: 'code-block-style (remark-lint)',
        position: {line: 11, column: 1},
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: engine-processor: markdown: no fix: should not change source', async (t) => {
    const name = join(__dirname, 'fixture/places.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    
    const fix = false;
    const {processedSource} = await runProcessors({
        fix,
        name,
        processFile: processFile({
            name: `${name}{js}`,
            fix,
        }),
        options,
        rawSource,
    });
    
    t.equal(processedSource, rawSource);
    t.end();
});

test('putout: engine-processor: markdown: fix: no places', async (t) => {
    const name = join(__dirname, 'fixture/places.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    
    const fix = true;
    const {places} = await runProcessors({
        fix,
        name,
        processFile: processFile({
            name: `${name}{js}`,
            fix,
        }),
        options,
        rawSource,
    });
    
    t.deepEqual(places, []);
    t.end();
});

test('putout: engine-processor: markdown: js changed', async (t) => {
    const name = join(__dirname, 'fixture/js-changed.md');
    const fixedName = join(__dirname, 'fixture/js-changed-fix.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    const expectedSource = await readFile(fixedName, 'utf8');
    
    const fix = true;
    const {processedSource} = await runProcessors({
        fix,
        name,
        processFile: processFile({
            name: `${name}{js}`,
            fix,
        }),
        options,
        rawSource,
    });
    
    t.equal(processedSource, expectedSource);
    t.end();
});

test('putout: engine-processor: yaml: no startLine', async (t) => {
    const name = join(__dirname, 'fixture/travis.yml');
    const options = {
        plugins: [
            'travis',
        ],
        processors: [
            'yaml',
        ],
    };
    
    const rawSource = await readFile(name, 'utf8');
    const {places} = await runProcessors({
        name,
        processFile: processFile({
            name: `${name}{json}`,
            fix: false,
        }),
        options,
        rawSource,
    });
    
    const expected = [{
        message: '"cache" field should exist in travis',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'travis/disable-cache',
    
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: engine: processor: yaml: duplicate: file content', async (t) => {
    const ext = '.yml';
    const name = 'duplicate';
    const inputName = join(__dirname, 'fixture', `${name}${ext}`);
    
    const rawSource = await readFile(inputName, 'utf8');
    
    const options = {
        dir: __dirname,
        processors: [
            'yaml',
        ],
    };
    
    const {processedSource} = await runProcessors({
        name: inputName,
        processFile: processFile({
            fix: false,
        }),
        options,
        rawSource,
    });
    
    t.equal(processedSource, rawSource);
    t.end();
});

test('putout: engine-processor: getFilePatterns', (t) => {
    const js = {
        files: [
            '*.js',
            '*.ts',
        ],
    };
    
    const css = {
        files: [
            '*.css',
        ],
    };
    
    const processors = [js, css];
    const result = getFilePatterns(processors);
    
    const expected = [
        '*.js',
        '*.ts',
        '*.css',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: engine-processor: yaml: duplicate', async (t) => {
    const ext = '.yml';
    const name = 'duplicate';
    const inputName = join(__dirname, 'fixture', `${name}${ext}`);
    
    const rawSource = await readFile(inputName, 'utf8');
    
    const options = {
        dir: __dirname,
        processors: [
            'yaml',
        ],
    };
    
    const {places} = await runProcessors({
        name: inputName,
        processFile: processFile({
            fix: false,
        }),
        options,
        rawSource,
    });
    
    const expected = [{
        position: {
            column: 3,
            line: 4,
        },
        message: 'Map keys must be unique',
        rule: 'yaml-parse-error (yaml)',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: engine-processor: css', async (t) => {
    const name = 'style';
    const inputName = join(__dirname, 'fixture', `${name}.css`);
    const outputName = join(__dirname, 'fixture', `${name}-fix.css`);
    
    const rawSource = await readFile(inputName, 'utf8');
    const output = await readFile(outputName, 'utf8');
    const options = {
        processors: [
            'css',
        ],
    };
    
    const fix = true;
    const {processedSource} = await runProcessors({
        fix,
        name: inputName,
        processFile: processFile({
            fix,
        }),
        options,
        rawSource,
    });
    
    t.equal(processedSource, output);
    t.end();
});

test('putout: engine-processor: md: json: options', async (t) => {
    const name = join(__dirname, 'fixture', 'readme.md');
    const options = {
        match: {
            '*.md{json}': {
                'putout-config': 'on',
            },
        },
        rules: {
            'putout-config': 'off',
        },
        plugins: [
            'putout-config',
        ],
        processors: [
            'markdown',
        ],
    };
    
    const rawSource = await readFile(name, 'utf8');
    const {places} = await runProcessors({
        name,
        processFile: processFile({
            name: `${name}{json}`,
            fix: false,
        }),
        options,
        rawSource,
    });
    
    const expected = [{
        message: 'String should be used instead of Boolean',
        position: {
            column: 18,
            line: 4,
        },
        rule: 'putout-config/convert-boolean-to-string',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: engine-processor: lint + js', async (t) => {
    const options = {};
    
    const processorRunners = [{
        isMatch: stub().returns(true),
        fix: () => 'hello',
        branch: () => [{
            source: 'var a',
            startLine: 0,
        }],
        merge: (content) => content,
    }];
    
    const rawSource = 'hello world';
    
    const fix = true;
    const {processedSource} = await runProcessors({
        fix,
        name: 'hello.md',
        processFile: processFile({
            fix,
        }),
        options,
        rawSource,
        processorRunners,
    });
    
    t.equal(processedSource, 'hello', 'should use processed source in postProcess');
    t.end();
});

test('putout: engine-processor: no fix', async (t) => {
    const options = {};
    
    const processorRunners = [{
        isMatch: stub().returns(true),
        branch: () => [{
            source: 'var a',
            startLine: 0,
        }],
        merge: (content) => content,
    }];
    
    const rawSource = 'hello world';
    
    const fix = true;
    const {processedSource} = await runProcessors({
        fix,
        name: 'hello.md',
        processFile: processFile({
            fix,
        }),
        options,
        rawSource,
        processorRunners,
    });
    
    t.equal(processedSource, 'hello world', 'should use processed source in postProcess');
    t.end();
});

test('putout: engine-processor: call merge once', async (t) => {
    const name = join(__dirname, 'fixture/call-merge-once.md');
    const nameFix = join(__dirname, 'fixture/call-merge-once-fix.md');
    
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    const fixedSource = await readFile(nameFix, 'utf8');
    
    const {processedSource} = await runProcessors({
        fix: true,
        name,
        processFile: processFile({
            name: `${name}{js}`,
            fix: true,
        }),
        options,
        rawSource,
    });
    
    t.equal(processedSource, fixedSource);
    t.end();
});

