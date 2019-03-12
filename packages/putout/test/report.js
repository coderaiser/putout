'use strict';

const test = require('supertape');
const chalk = require('chalk');
const stub = require('@cloudcmd/stub');

const {report} = require('..');

test('putout: report: no places', (t) => {
    const reporter = stub();
    const expected = {
        count: 1,
        errorsCount: 0,
        filesCount: 1,
        index: 0,
        name: 'hello',
        places: [],
    };
    
    report(reporter, {
        name: 'hello',
        places: [],
    });
    
    t.ok(reporter.calledWith(expected), 'should call reporter');
    t.end();
});

test('putout: report: end', (t) => {
    const line = 1;
    const column = 1;
    const position = {
        line,
        column,
    };
    
    const {enabled} = chalk;
    chalk.enabled = false;
    
    const message = 'hello';
    const rule = 'remove-hello';
    
    const places = [{
        message,
        position,
        rule,
    }];
    
    const result = report({
        name: 'hello',
        places,
    });
    
    const expected = [
        'hello\n 1:1  error   hello  remove-hello \n',
        '✖ 1 errors in 1 files',
        '  fixable with the `--fix` option\n',
    ].join('\n');
    
    chalk.enabled = enabled;
    
    t.equal(expected, result, 'should equal');
    t.end();
});

test('putout: report: find', (t) => {
    const line = 1;
    const column = 1;
    const position = {
        line,
        column,
    };
    
    const {enabled} = chalk;
    chalk.enabled = false;
    
    const message = 'hello';
    const rule = 'remove-hello';
    
    const places = [{
        message,
        position,
        rule,
    }];
    
    const reporter = require('../lib/report-find');
    const result = report(reporter, {
        name: 'hello',
        places,
    });
    
    const expected = [
        'hello\n 1:1  error   hello  remove-hello \n',
        '✖ 1 errors in 1 files',
        '  fixable with the `--fix` option\n',
    ].join('\n');
    
    chalk.enabled = enabled;
    
    t.equal(expected, result, 'should equal');
    t.end();
});

