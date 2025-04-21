'use strict';

const process = require('node:process');
const {join} = require('node:path');
const {once} = require('node:events');

const {
    readFileSync,
    writeFileSync,
    existsSync,
    unlinkSync,
} = require('node:fs');

const test = require('supertape');
const putout = require('putout');
const currify = require('currify');
const {createProgress} = require('@putout/engine-runner/progress');

const {createError} = require('./create-error');
const {preTest} = require('./pre-test');

const {
    readFixture,
    writeFixture,
    rmFixture,
} = require('./fixture');

const {isArray} = Array;
const isString = (a) => typeof a === 'string';
const isObject = (a) => typeof a === 'object';

const {keys} = Object;

global.__putout_test_fs = {
    readFileSync,
    writeFileSync,
    existsSync,
    unlinkSync,
};

const isUpdate = () => Boolean(Number(process.env.UPDATE));

const fail = (t, message) => {
    const {
        __putout_test_fail = t.fail,
    } = global;
    
    return __putout_test_fail(message);
};

module.exports = createTest;
module.exports.createTest = createTest;

const parsePlugin = (plugins) => {
    if (isArray(plugins))
        return plugins[0];
    
    return plugins;
};

function createTest(dir, maybeOptions) {
    dir = join(dir, 'fixture');
    
    const {
        extension = [],
        lint = putout,
        ...options
    } = parseOptions(maybeOptions);
    
    const plugin = parsePlugin(options.plugins);
    
    const linterOptions = {
        lint,
        extension,
    };
    
    preTest(test, plugin);
    
    return test.extend({
        transform: transform(dir, linterOptions, options),
        noTransform: noTransform(dir, linterOptions, options),
        transformCode: transformCode(linterOptions, options),
        noTransformCode: noTransformCode(linterOptions, options),
        
        progress: progress(dir, options),
        progressWithOptions: progressWithOptions(dir, options),
        
        transformWithOptions: transformWithOptions(dir, linterOptions, options),
        noTransformWithOptions: noTransformWithOptions(dir, linterOptions, options),
        
        report: report(dir, linterOptions, options),
        noReport: noReport(dir, linterOptions, options),
        noReportAfterTransform: noReportAfterTransform(dir, linterOptions, options),
        noReportAfterTransformWithOptions: noReportAfterTransformWithOptions(dir, linterOptions, options),
        reportWithOptions: reportWithOptions(dir, linterOptions, options),
        noReportWithOptions: noReportWithOptions(dir, linterOptions, options),
        reportCode: reportCode(lint, options),
        noReportCode: noReportCode(lint, options),
        format: formatSave(dir, options),
        formatMany: formatManySave(dir, options),
        noFormat: noFormat(dir, options),
    });
}

const format = currify((dir, options, t) => async (formatter, name, formatterOptions = {}) => {
    const full = join(dir, name);
    const outputName = `${full}-format`;
    const [input, isTS] = readFixture(full);
    const [expected] = readFixture(outputName);
    
    const {places} = putout(input, {
        fixCount: 1,
        isTS,
        ...options,
    });
    
    const report = putout.initReport();
    
    const result = await report(formatter, {
        formatterOptions,
        name,
        source: input,
        places,
    });
    
    const {is, output} = t.equal(result, expected);
    
    return {
        is,
        output,
        result,
    };
});

const noFormat = currify((dir, options, t) => async (formatter, name, formatterOptions = {}) => {
    const full = join(dir, name);
    const [input] = readFixture(full);
    const {places} = putout(input, options);
    
    const report = putout.initReport();
    
    const result = await report(formatter, {
        name,
        places,
        formatterOptions,
    });
    
    const {is, output} = t.equal(result, '', 'should not format');
    
    return {
        is,
        output,
        result,
    };
});

const formatMany = currify((dir, options, t) => async (formatter, names, formatterOptions = {}) => {
    const joinTwo = (a) => (b) => join(a, b);
    
    if (!isArray(names))
        throw Error(`☝️ Looks like 'formatMany()' received 'names' with type: '${typeof names}', expected: 'array'`);
    
    const fullNames = names.map(joinTwo(dir));
    
    let result = '';
    
    const count = names.length;
    const report = putout.initReport();
    
    for (let index = 0; index < count; index++) {
        const name = names[index];
        const full = fullNames[index];
        const [input] = readFixture(full);
        
        const {places} = putout(input, {
            fixCount: 1,
            ...options,
        });
        
        result += await report(formatter, {
            name,
            formatterOptions,
            source: input,
            places,
            index,
            count,
        });
    }
    
    const outputName = join(dir, `${names.join('-')}-format`);
    const [expected] = readFixture(outputName);
    
    const {is, output} = t.equal(result, expected);
    
    return {
        is,
        output,
        result,
    };
});

const formatManySave = currify((dir, options, t) => async (formatter, names, formatterOptions = {}) => {
    const runFormat = await formatMany(dir, options, t);
    
    if (!isUpdate())
        return await runFormat(formatter, names, formatterOptions);
    
    const {writeFileSync} = global.__putout_test_fs;
    
    if (!isArray(names))
        throw Error(`☝️ Looks like 'formatMany()' received 'names' with type: '${typeof names}', expected: 'array'`);
    
    const name = `${names.join('-')}-format.js`;
    const outputName = join(dir, name);
    
    const {result} = await runFormat(formatter, names, formatterOptions);
    
    writeFileSync(outputName, result);
    
    return t.pass('fixed fixture updated');
});

const formatSave = currify((dir, options, t) => async (formatter, name, formatterOptions = {}) => {
    const runFormat = format(dir, options, t);
    
    if (!isUpdate())
        return await runFormat(formatter, name, formatterOptions);
    
    const {writeFileSync} = global.__putout_test_fs;
    
    const full = join(dir, name);
    const outputName = `${full}-format.js`;
    
    const {result} = await runFormat(formatter, name, formatterOptions);
    
    writeFileSync(outputName, result);
    
    return t.pass('fixed fixture updated');
});

const toObject = (array) => {
    const result = {};
    const first = parsePlugin(array);
    
    if (isObject(first) && !isArray(first))
        return first;
    
    for (const [name, value] of array) {
        result[name] = value;
    }
    
    return result;
};

const progress = (dir, options) => (t) => async (name, expected) => {
    checkProgress(name, expected);
    
    const full = join(dir, name);
    const [input, isTS] = readFixture(full);
    
    const progress = createProgress();
    const [[result]] = await Promise.all([
        once(progress, 'file'),
        putout(input, {
            progress,
            isTS,
            ...options,
        }),
    ]);
    
    return t.deepEqual(result, expected);
};

const progressWithOptions = (dir, options) => (t) => async (name, pluginOptions, expected) => {
    const full = join(dir, name);
    const [input, isTS] = readFixture(full);
    
    const rule = parseRule(options);
    const rules = {
        [rule]: ['on', pluginOptions],
    };
    
    const progress = createProgress();
    
    const [[result]] = await Promise.all([
        once(progress, 'file'),
        putout(input, {
            rules,
            progress,
            isTS,
            ...options,
        }),
    ]);
    
    return t.deepEqual(result, expected);
};

const transform = currify((dir, linterOptions, options, t, name, transformed = null, addons = {}) => {
    const {lint, extension} = linterOptions;
    const {plugins} = options;
    const full = join(dir, name);
    const isStr = isString(transformed);
    const [input, isTS] = readFixture(full, extension);
    
    if (!isStr)
        addons = transformed;
    
    addons = addons || {};
    
    const {code} = lint(input, {
        isTS,
        ...options,
        plugins: [{
            ...toObject(plugins),
            ...addons,
        }],
    });
    
    if (input === code)
        return fail(t, `'input' === 'output', use 'noTransform()'`);
    
    if (isUpdate() && !isStr) {
        writeFixture({
            full,
            code,
            extension,
        });
        return t.pass('fixed fixture updated');
    }
    
    const [output] = isStr ? [transformed] : readFixture(`${full}-fix`, extension);
    
    return t.equal(code, output);
});

const transformWithOptions = currify((dir, linterOptions, options, t, name, pluginOptions) => {
    const {lint, extension} = linterOptions;
    
    const full = join(dir, name);
    const [input, isTS] = readFixture(full, extension);
    
    const rule = parseRule(options);
    
    const rules = {
        [rule]: ['on', pluginOptions],
    };
    
    const {code} = lint(input, {
        isTS,
        rules,
        ...options,
    });
    
    if (isUpdate()) {
        writeFixture({
            full,
            code,
            extension,
        });
        return t.pass('fixed fixture updated');
    }
    
    const [output] = readFixture(`${full}-fix`, extension);
    
    return t.equal(code, output);
});

const parseRule = ({plugins}) => {
    const [plugin] = plugins;
    
    return plugin[0] || keys(plugin)[0];
};

const noTransformWithOptions = currify((dir, linterOptions, options, t, name, ruleOptions) => {
    const {lint, extension} = linterOptions;
    const full = join(dir, name);
    const [input, isTS] = readFixture(full, extension);
    
    rmFixture(`${full}-fix`);
    
    const rule = parseRule(options);
    const rules = {
        [rule]: ['on', ruleOptions],
    };
    
    const {code} = lint(input, {
        isTS,
        rules,
        ...options,
    });
    
    if (isUpdate()) {
        writeFixture({
            full,
            code,
            extension,
        });
        
        return t.pass('source fixture updated');
    }
    
    return t.equal(code, input);
});

const noTransform = currify((dir, linterOptions, options, t, name, addons = {}) => {
    const {lint, extension} = linterOptions;
    const full = join(dir, name);
    const [fixture] = readFixture(full, extension);
    
    rmFixture(`${full}-fix`);
    
    const {plugins} = options;
    const [input, isTS] = readFixture(full, extension);
    
    const {code} = lint(input, {
        isTS,
        ...options,
        plugins: [{
            ...toObject(plugins),
            ...addons,
        }],
    });
    
    if (isUpdate()) {
        writeFixture({
            full,
            code,
            extension,
        });
        
        return t.pass('source fixture updated');
    }
    
    return t.equal(code, fixture);
});

const transformCode = currify((linterOptions, options, t, input, output, isTS = false) => {
    const {lint} = linterOptions;
    const {code} = lint(input, {
        isTS,
        ...options,
    });
    
    return t.equal(code, output);
});

const noTransformCode = currify((linterOptions, options, t, input) => {
    const {lint} = linterOptions;
    const {code} = lint(input, options);
    
    return t.equal(code, input);
});

const getMessage = ({message}) => message;

const report = (dir, linterOptions, options) => (t) => (name, message, plugins) => {
    const {lint, extension} = linterOptions;
    checkReport(name, message);
    
    const full = join(dir, name);
    const [source, isTS] = readFixture(full, extension);
    
    const addT = reportCode(lint, {
        isTS,
        ...options,
    });
    
    const run = addT(t);
    
    return run(source, message, plugins);
};

const noReport = currify((dir, linterOptions, options, t, name) => {
    const {lint, extension} = linterOptions;
    const full = join(dir, name);
    const [source, isTS] = readFixture(full, extension);
    
    rmFixture(`${full}-fix`);
    
    return noReportCode(lint, {
        isTS,
        ...options,
    }, t, source);
});

module.exports._createNoReport = noReport;

const noReportAfterTransform = currify((dir, linterOptions, options, t, name, addons = {}) => {
    const {lint, extension} = linterOptions;
    const full = join(dir, name);
    const [source, isTS] = readFixture(full, extension);
    
    return noReportCodeAfterTransform(lint, {
        isTS,
        ...options,
    }, t, source, addons);
});

module.exports._createNoReportAfterTransform = noReportAfterTransform;

const noReportAfterTransformWithOptions = currify((dir, linterOptions, options, t, name, ruleOptions) => {
    const {lint, extension} = linterOptions;
    const full = join(dir, name);
    const [source, isTS] = readFixture(full, extension);
    const rule = parseRule(options);
    
    const rules = {
        [rule]: ['on', ruleOptions],
    };
    
    return noReportCodeAfterTransform(lint, {
        isTS,
        ...options,
        rules: {
            ...options.rules,
            ...rules,
        },
    }, t, source);
});

module.exports._createNoReportAfterTransformWithOptions = noReportAfterTransformWithOptions;

const reportWithOptions = currify((dir, linterOptions, options, t, name, message, ruleOptions) => {
    const {lint, extension} = linterOptions;
    const full = join(dir, name);
    const [source, isTS] = readFixture(full, extension);
    
    const rule = parseRule(options);
    
    const rules = {
        [rule]: ['on', ruleOptions],
    };
    
    const addT = reportCode(lint, {
        ...options,
        rules,
        isTS,
    });
    
    const run = addT(t);
    
    return run(source, message);
});

const noReportWithOptions = currify((dir, linterOptions, options, t, name, ruleOptions) => {
    const {lint, extension} = linterOptions;
    const full = join(dir, name);
    const [source, isTS] = readFixture(full, extension);
    
    rmFixture(`${full}-fix`);
    
    const rule = parseRule(options);
    const rules = {
        [rule]: ['on', ruleOptions],
    };
    
    return noReportCode(lint, {
        isTS,
        ...options,
        rules,
    }, t, source);
});

const reportCode = (lint, options) => (t) => (source, message, addons) => {
    const {plugins} = options;
    const {places} = lint(source, {
        fix: false,
        ...options,
        plugins: [{
            ...toObject(plugins),
            ...addons,
        }],
    });
    
    const resultMessages = places.map(getMessage);
    
    if (isArray(message))
        return t.deepEqual(resultMessages, message);
    
    return t.equal(resultMessages[0], message);
};

const noReportCode = currify((lint, options, t, source) => {
    const {places} = lint(source, {
        fix: false,
        ...options,
    });
    
    return t.deepEqual(places, [], 'should not report');
});

const noReportCodeAfterTransform = currify((lint, options, t, source, addons = {}) => {
    const {plugins} = options;
    const {places} = lint(source, {
        fix: true,
        ...options,
        plugins: [{
            ...toObject(plugins),
            ...addons,
        }],
    });
    
    return t.deepEqual(places, [], 'should not report after transform');
});

function parseOptions(plugin) {
    if (!plugin.plugins)
        return {
            plugins: [plugin],
        };
    
    return plugin;
}

function checkReport(name, message) {
    if (!isString(message) && !message) {
        const help = `☝️ Looks like you forget to pass the 'message' for 'report()' operator`;
        const source = `report(name: string, message: string): Operator`;
        const values = {
            name,
            message,
        };
        
        throw Error(createError(help, source, values));
    }
}

function checkProgress(name, expected) {
    if (!isString(name)) {
        const message = `☝️ Looks like you forget to pass the 'name' of a fixture for 'progress()' operator.`;
        const signature = 'await progress(name: string, expected: ExpectedProgress): Operator';
        const values = {
            name,
            expected,
        };
        
        throw Error(createError(message, signature, values));
    }
}
