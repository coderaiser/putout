'use strict';

const montag = require('montag');
const test = require('supertape');
const stub = require('@cloudcmd/stub');
const {simpleImport} = require('./simple-import');

const {initReport} = require('../putout');

test('putout: report: no places', async (t) => {
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

