'use strict';

const {readFile} = require('fs').promises;
const {promisify} = require('util');
const WorkerPool = require('./worker_pool.js');

const tryCatch = require('try-catch');
const once = require('once');

const getFormatter = once(_getFormatter);
const report = require('../../report')();
const stub = () => () => {};

const {exit, stdout} = process;
const write = stdout.write.bind(stdout);

module.exports = promisify(async (names, options, fn) => {
    let finished = 0;
    const pool = new WorkerPool('./task_processor.js');
    
    const {
        dir,
        format,
        formatter = 'dump',
    } = options;
    
    const currentFormat = getFormatter(format || formatter, exit);
    
    const {length} = names;
    for (const name of names) {
        const source = await readFile(name, 'utf8');
        const task = {
            name,
            source,
            options,
            length,
        };
        const mainResult = [];
        pool.runTask(task, (error, result) => {
            if (error)
                return fn(error);
            
            const {
                source,
                allPlaces,
                resolvedName,
            } = result;
            
            mainResult.push(allPlaces);
            
            const line = report(currentFormat, {
                name: resolvedName,
                places: result,
                index: finished,
                count: length,
                source,
            });
            
            write(line || '');
            
            if (++finished === names.length) {
                pool.close();
                fn(null, mainResult);
            }
        });
    }
});

module.exports._getFormatter = _getFormatter;
function _getFormatter(name, exit) {
    let e;
    let reporter;
    
    if (name === 'none')
        return stub();
    
    [e, reporter] = tryCatch(require, `@putout/formatter-${name}`);
    
    if (!e)
        return reporter;
    
    [e, reporter] = tryCatch(require, `putout-formatter-${name}`);
    
    if (e)
        exit(e);
    
    return reporter;
}

