'use strict';

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
    
    t.equal(processedSource, rawSource, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

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
    
    t.equal(processedSource, rawSource);
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
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: engine-processor: markdown: no fix: places', async (t) => {
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
    
    t.equal(processedSource, rawSource, 'should equal');
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
    
    t.equal(processedSource, expectedSource, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(result, expected, 'should equal');
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
            column: 1,
            line: 4,
        },
        message: 'Duplicated mapping key (4:3)',
        rule: 'duplicated-mapping-key (yaml)',
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
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: engine-processor: lint + js', async (t) => {
    const options = {
    };
    
    const processorRunners = [{
        isMatch: stub().returns(true),
        process: () => {
            return [
                'hello', [],
            ];
        },
        preProcess: () => {
            return [{
                source: 'var a',
                startLine: 0,
            }];
        },
        postProcess: (content) => {
            return content;
        },
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
