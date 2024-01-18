'use strict';

const tryToCatch = require('try-to-catch');
const montag = require('montag');
const {test, stub} = require('supertape');

const {simpleImport} = require('./simple-import.cjs');
const initReport = require('./report.cjs');

test('putout: report: no places', async (t) => {
    const reporter = stub();
    const report = initReport();
    
    const formatterOptions = {
        hello: 'world',
    };
    
    const [error] = await tryToCatch(report, reporter, {
        name: 'hello',
        source: '',
        formatterOptions,
        rule: 'filesystem/remove-file',
    });
    
    const expected = `☝️ Looks like for 'places: Places[]' you passed the wrong type: 'undefined'`;
    
    t.equal(error.message, expected);
    t.end();
});

test('putout: report: places not array', async (t) => {
    const reporter = stub();
    const report = initReport();
    
    const formatterOptions = {
        hello: 'world',
    };
    
    await report(reporter, {
        name: 'hello',
        places: [],
        source: '',
        formatterOptions,
        rule: 'filesystem/remove-file',
    });
    
    const expected = {
        count: 1,
        options: formatterOptions,
        errorsCount: 0,
        filesCount: 0,
        index: 0,
        name: 'hello',
        places: [],
        source: '',
        rule: 'filesystem/remove-file',
    };
    
    t.calledWith(reporter, [expected], 'should call reporter');
    t.end();
});

test('putout: report: dump', async (t) => {
    const line = 1;
    const column = 1;
    
    const position = {
        line,
        column,
    };
    
    const message = 'hello';
    const rule = 'remove-hello';
    
    const places = [{
        message,
        position,
        rule,
    }];
    
    const formatter = await simpleImport('@putout/formatter-dump');
    const report = initReport();
    
    const formatted = await report(formatter, {
        name: 'hello',
        places,
    });
    
    const stripAnsi = await simpleImport('strip-ansi');
    const result = stripAnsi(formatted);
    
    const expected = montag`
        hello
         1:1  error   hello  remove-hello 
        
        ✖ 1 errors in 1 files
          fixable with the \`--fix\` option
    
    `;
    
    t.equal(result, expected);
    t.end();
});
