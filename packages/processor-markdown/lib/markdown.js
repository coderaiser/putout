import {toJS, fromJS} from '@putout/operator-json';
import stringify from 'remark-stringify';
import preset from 'remark-preset-lint-consistent';
import remarkFrontmatter from 'remark-frontmatter';
import {visit} from 'unist-util-visit';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import removeDependenciesStatusBadge from './rules/remove-dependencies-status-badge.js';
import removeTrailingWhitespacesFromHeading from './rules/remove-trailing-whitespaces-from-heading.js';
import mergeHeadingSpceces from './rules/merge-heading-spaces.js';
import {run} from './rules/index.js';
import {toPlace} from './parse-place.js';

const plugins = [
    removeDependenciesStatusBadge,
    removeTrailingWhitespacesFromHeading,
    mergeHeadingSpceces,
];

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

export const files = ['*.md'];
export const find = async (rawSource, options = {}) => {
    if (!rawSource.length)
        return [];
    
    const {messages} = await unified()
        .use(remarkParse)
        .use(preset)
        .use(run, {
            fix: false,
            plugins: [
                ...plugins,
                ...options.plugins || [],
            ],
        })
        .use(stringify, stringifyOptions)
        .use(remarkFrontmatter, ['yaml', 'toml'])
        .process(rawSource);
    
    return messages.map(toPlace);
};
export const fix = async (rawSource, options = {}) => {
    const {value} = await unified()
        .use(remarkParse)
        .use(preset)
        .use(stringify, stringifyOptions)
        .use(remarkFrontmatter, ['yaml', 'toml'])
        .use(run, {
            fix: true,
            plugins: [
                ...plugins,
                ...options.plugins || [],
            ],
        })
        .process(rawSource);
    
    return value;
};
export const branch = async (rawSource) => {
    const list = [];
    
    await unified()
        .use(remarkParse)
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
        .use(remarkParse)
        .use(apply, {
            list: newList,
            rawSource,
            visit,
        })
        .use(stringify, stringifyOptions)
        .process(rawSource);
    
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
        
        if (lang === 'jsx') {
            list.push({
                startLine,
                source: value,
                extension: 'jsx',
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
        
        if (lang === 'tsx') {
            list.push({
                startLine,
                source: value,
                extension: 'tsx',
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
        
        if (/^(jsx?|javascript)$/.test(lang)) {
            node.value = list.shift();
            return;
        }
        
        if (/^(tsx?|typescript)$/.test(lang)) {
            node.value = list.shift();
            return;
        }
        
        if (lang === 'json') {
            const code = list.shift();
            node.value = fromJS(code).slice(0, -1);
        }
    });
};
