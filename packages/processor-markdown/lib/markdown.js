'use strict';

const once = require('once');

const {toPlace} = require('./parse-place');
const {initParseStore} = require('./parse-store');

const parseStore = initParseStore();

const text = ({value}) => value;
const stringifyOptions = {
    bullet: '-',
    listItemIndent: 'one',
    fences: true,
    tightDefinitions: true,
    handlers: {
        text,
    },
};

module.exports.files = [
    '*.md',
];

const loadDependencies = once(async () => {
    const {default: stringify} = await import('remark-stringify');
    const {default: preset} = await import('remark-preset-lint-consistent');
    const {default: jsonProcessor} = await import('@putout/processor-json');
    const {run} = await import('./rules/index.mjs');
    const {visit} = await import('unist-util-visit');
    const {unified} = await import('unified');
    
    return {
        unified,
        stringify,
        visit,
        preset,
        jsonProcessor,
        run,
    };
});

module.exports.find = async (rawSource) => {
    const {
        unified,
        stringify,
        preset,
        run,
    } = await loadDependencies();
    
    await parseStore.init();
    
    const {messages} = await unified()
        .use(parseStore)
        .use(preset)
        .use(run, {fix: false})
        .use(stringify, stringifyOptions)
        .process(rawSource);
    
    return messages
        .map(toPlace);
};

module.exports.fix = async (rawSource) => {
    const {
        unified,
        stringify,
        preset,
        run,
    } = await loadDependencies();
    
    await parseStore.init();
    
    const {value} = await unified()
        .use(parseStore)
        .use(preset)
        .use(run, {fix: true})
        .use(stringify, stringifyOptions)
        .process(rawSource);
    
    return value;
};

module.exports.branch = async (rawSource) => {
    const {
        unified,
        stringify,
        visit,
        jsonProcessor,
    } = await loadDependencies();
    
    const list = [];
    
    await unified()
        .use(parseStore)
        .use(collect, {
            list,
            visit,
            jsonProcessor,
        })
        .use(stringify)
        .process(rawSource);
    
    return list;
};

module.exports.merge = async (rawSource, list) => {
    const {
        unified,
        stringify,
        visit,
        jsonProcessor,
    } = await loadDependencies();
    
    const newList = list.slice();
    
    const {value} = await unified()
        .use(parseStore)
        .use(apply, {
            list: newList,
            rawSource,
            visit,
            jsonProcessor,
        })
        .use(stringify, stringifyOptions)
        .process(rawSource);
    
    await parseStore.clear();
    
    return value;
};

const collect = ({list, visit}) => {
    const jsonProcessor = require('@putout/processor-json');
    
    return (node) => {
        visit(node, 'code', (node) => {
            const {lang, value} = node;
            const startLine = node.position.start.line;
            
            if (/^(js|javascript)$/.test(lang)) {
                list.push({
                    startLine,
                    source: value,
                    extension: 'js',
                });
                
                return;
            }
            
            if (/^(ts|typescript)$/.test(lang)) {
                list.push({
                    startLine,
                    source: value,
                    extension: 'ts',
                });
                
                return;
            }
            
            if (lang === 'json') {
                const source = jsonProcessor.toJS(value);
                
                list.push({
                    startLine,
                    source,
                    extension: 'json',
                });
            }
        });
    };
};

const apply = ({list, visit, jsonProcessor}) => (node) => {
    visit(node, 'code', (node) => {
        const {lang} = node;
        
        if (/^(js|javascript)$/.test(lang)) {
            node.value = list.shift();
            return;
        }
        
        if (/^(ts|typescript)$/.test(lang)) {
            node.value = list.shift();
            return;
        }
        
        if (lang === 'json') {
            const code = list.shift();
            
            node.value = jsonProcessor.fromJS(code);
        }
    });
};

