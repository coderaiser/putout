'use strict';

const {initParseStore} = require('./parse-store');
const {createSimport} = require('simport');
const once = require('once');

const simport = createSimport(__filename);

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
    const {unified} = await simport('unified');
    const stringify = await simport('remark-stringify');
    const preset = await simport('remark-preset-lint-consistent');
    const jsonProcessor = await simport('@putout/processor-json');
    
    // Fix: TypeError: visit is not a function
    //
    // remark installs "uninst-util-visit" v2 using npm and has `module.exports = visit`
    // but v3 has `export const visit = () => {}`
    // and simport imports nearest version of "uninst-util-visit" which is v2
    // that's why regular import should be used here while remark not transit to v3
    const {visit} = await import('unist-util-visit');
    
    return {
        unified,
        stringify,
        visit,
        preset,
        jsonProcessor,
    };
});

module.exports.find = async (rawSource) => {
    const {
        unified,
        stringify,
        preset,
    } = await loadDependencies();
    
    parseStore.init();
    
    const {messages} = await unified()
        .use(parseStore)
        .use(preset)
        .use(stringify, stringifyOptions)
        .process(rawSource);
    
    return messages.map(toPlace);
};

module.exports.fix = async (rawSource) => {
    const {
        unified,
        stringify,
        preset,
    } = await loadDependencies();
    
    parseStore.init();
    
    const {messages, value} = await unified()
        .use(parseStore)
        .use(preset)
        .use(stringify, stringifyOptions)
        .process(rawSource);
    
    if (!messages.length)
        return rawSource;
    
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
    
    parseStore.clear();
    
    return value;
};

function toPlace({reason, line, column, source, ruleId}) {
    return {
        message: reason,
        rule: `${ruleId} (${source})`,
        position: {
            line,
            column,
        },
    };
}

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
            const source = list.shift();
            
            node.value = source;
            return;
        }
        
        if (/^(ts|typescript)$/.test(lang)) {
            const source = list.shift();
            
            node.value = source;
            return;
        }
        
        if (lang === 'json') {
            const code = list.shift();
            const source = jsonProcessor.fromJS(code);
            
            node.value = source;
        }
    });
};

