import {
    toJS,
    fromJS,
} from '@putout/processor-json';
import stringify from 'remark-stringify';
import preset from 'remark-preset-lint-consistent';

import {run} from './rules/index.mjs';
import {visit} from 'unist-util-visit';
import {unified} from 'unified';

import {toPlace} from './parse-place.js';
import {initParseStore} from './parse-store.js';

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

export const files = [
    '*.md',
];

export const find = async (rawSource) => {
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

export const fix = async (rawSource) => {
    await parseStore.init();
    
    const {value} = await unified()
        .use(parseStore)
        .use(preset)
        .use(run, {fix: true})
        .use(stringify, stringifyOptions)
        .process(rawSource);
    
    return value;
};

export const branch = async (rawSource) => {
    const list = [];
    
    await unified()
        .use(parseStore)
        .use(collect, {
            list,
            visit,
        })
        .use(stringify)
        .process(rawSource);
    
    return list;
};

export const merge = async (rawSource, list) => {
    const newList = list.slice();
    
    const {value} = await unified()
        .use(parseStore)
        .use(apply, {
            list: newList,
            rawSource,
            visit,
        })
        .use(stringify, stringifyOptions)
        .process(rawSource);
    
    await parseStore.clear();
    
    return value;
};

const collect = ({list, visit}) => (node) => {
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
            const source = toJS(value);
            
            list.push({
                startLine,
                source,
                extension: 'json',
            });
        }
    });
};

const apply = ({list, visit}) => (node) => {
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
            
            node.value = fromJS(code);
        }
    });
};

