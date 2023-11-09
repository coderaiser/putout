'use strict';

const isCorrectPlugin = require('./is-correct-plugin');
const {entries} = Object;
const {isArray} = Array;

const maybeTuple = (a) => isArray(a) ? a : ['on', a];
const maybeEntries = (a) => isArray(a) ? a : entries(a).pop();

module.exports._maybeEntries = maybeEntries;

module.exports.preTest = function preTest(test, plugin) {
    const [name, {
        report,
        find,
        traverse,
        include,
        exclude,
        fix,
        rules,
        replace,
        filter,
        match,
        declare,
    }] = maybeEntries(plugin);
    
    const options = {
        checkDuplicates: false,
    };
    
    if (rules) {
        test(`${name}: rules is an object`, (t) => {
            t.equal(typeof rules, 'object', 'should export "rules" object');
            t.end();
        }, options);
        
        const entries = Object.entries(rules);
        
        for (const [entryName, pluginTuple] of entries) {
            const [, plugin] = maybeTuple(pluginTuple);
            
            preTest(test, {
                [`${name}/${entryName}`]: plugin,
            });
        }
        
        return;
    }
    
    if (!declare)
        test(`${name}: report: is function`, (t) => {
            t.equal(typeof report, 'function', `should export 'report' function`);
            t.end();
        }, options);
    
    test(`${name}: plugins should be of type: replace, template, traverse or find`, (t) => {
        const result = isCorrectPlugin({
            find,
            fix,
            
            traverse,
            
            include,
            exclude,
            
            filter,
            match,
            replace,
            
            declare,
        });
        
        t.ok(result, `should export 'replace', 'find', 'traverse', 'include', 'exclude', or 'declare' function`);
        t.end();
    }, options);
};
