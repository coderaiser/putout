'use strict';

const {
    generate,
    operator,
    template,
    types,
} = require('putout');

const {
    compare,
    getTemplateValues,
} = operator;

const {isProgram} = types;
const ON_ANY = `__e.on(__o, (__r) => __body)`;
const ON_ANY_NO_RESULT = `__e.on(__o, () => __body)`;
const ON_END = `__e.on('end', () => __body)`;
const ON_ERROR = `__e.on('error', (__r) => __body)`;
const once = template(`const [%%result%%] = await once(%%emitter%%, %%event%%)`);
const onceEnd = template(`await once(%%emitter%%, 'end')`);
const onceError = template(`const [%%error%%] = await once(%%emitter%%, 'error')`);
const onceAnyNoResult = template(`await once(%%emitter%%, %%event%%)`);

module.exports.report = () => '"await once" should be used';

module.exports.match = () => ({
    'test(__a, (__args) => __body)': match,
    'test(__a, async (__args) => __body)': match,
});

module.exports.replace = () => ({
    'test(__a, (__args) => __body)': replace,
    'test(__a, async (__args) => __body)': replace,
});

function match({__body}) {
    for (const codeLine of __body.body) {
        const {
            expression = codeLine,
        } = codeLine;
        
        if (compare(expression, ON_END))
            return true;
        
        if (compare(expression, ON_ANY))
            return true;
        
        if (compare(expression, ON_ANY_NO_RESULT))
            return true;
    }
    
    return false;
}

function replace({__a}, path) {
    declareOnce(path);
    
    const arg = path.get('arguments.1').node;
    
    arg.async = true;
    
    const {body} = arg.body;
    const n = body.length;
    
    for (let i = 0; i < n; i++) {
        let nodes = [];
        const current = body[i];
        const {
            expression = current,
        } = current;
        
        if (compare(expression, ON_ERROR))
            nodes = getErrorNodes(expression);
        else if (compare(expression, ON_END))
            nodes = getEndNodes(expression);
        else if (compare(expression, ON_ANY))
            nodes = getAnyNodes(expression);
        else if (compare(expression, ON_ANY_NO_RESULT))
            nodes = getAnyNoResultNodes(expression);
        else
            continue;
        
        body.splice(i, 1, ...nodes);
    }
    
    const {code} = generate(arg.body);
    
    return `test('${__a.value}', async (t) => ${code})`;
}

function getEndNodes(expression) {
    const {__e, __body} = getTemplateValues(expression, ON_END);
    
    const nodes = [
        onceEnd({
            emitter: __e,
        }),
        ...__body.body,
    ];
    
    return nodes;
}

function getErrorNodes(expression) {
    const {
        __e,
        __r,
        __body,
    } = getTemplateValues(expression, ON_ERROR);
    
    const nodes = [
        onceError({
            emitter: __e,
            error: __r,
        }),
        ...__body.body,
    ];
    
    return nodes;
}

function getAnyNodes(expression) {
    const {
        __e,
        __o,
        __r,
        __body,
    } = getTemplateValues(expression, ON_ANY);
    
    const nodes = [
        once({
            emitter: __e,
            event: __o,
            result: __r,
        }),
        ...__body.body,
    ];
    
    return nodes;
}

function getAnyNoResultNodes(expression) {
    const {
        __e,
        __o,
        __body,
    } = getTemplateValues(expression, ON_ANY_NO_RESULT);
    
    const nodes = [
        onceAnyNoResult({
            emitter: __e,
            event: __o,
        }),
        ...__body.body,
    ];
    
    return nodes;
}

const declareOnce = (path) => {
    if (path.scope.bindings.once)
        return;
    
    const {node} = path.findParent(isProgram);
    const {body} = node;
    
    body.unshift(template.ast(`const {once} = require('events')`));
};
