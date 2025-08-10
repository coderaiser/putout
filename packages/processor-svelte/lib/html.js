import {lint} from '@putout/processor-css';

const createSpaceLine = (a) => Array(a).join(' ');
const addSpaces = (spacesCount) => (a) => createSpaceLine(spacesCount) + a;
const cutSpaces = (spacesCount) => (a) => a.slice(spacesCount);

export const files = [
    '*.html',
    '*.svelte',
];

export const fix = async (rawSource) => {
    const svelte = await import('svelte/compiler');
    
    const {code} = await svelte.preprocess(rawSource, {
        async style({content}) {
            const source = removePrefixSpaces(content);
            
            const [currentSource] = await lint(source, {
                fix: true,
            });
            
            const code = addPrefixSpaces({
                currentSource: currentSource.slice(0, -1),
                content,
            });
            
            return {
                code,
            };
        },
    });
    
    return code;
};

export const find = async (rawSource) => {
    const svelte = await import('svelte/compiler');
    const allPlaces = [];
    
    await svelte.preprocess(rawSource, {
        async style({content}) {
            const source = removePrefixSpaces(content);
            
            const [currentSource, places] = await lint(source, {
                fix: false,
            });
            
            const code = addPrefixSpaces({
                currentSource: currentSource.slice(0, -1),
                content,
            });
            
            const index = rawSource.indexOf(content);
            
            const startLine = getStartLine({
                rawSource,
                index,
            });
            
            const line = rawSource.split('\n')[startLine];
            const startColumn = getSpacesCount(line);
            
            for (const place of places) {
                place.position.line += startLine;
                place.position.column += startColumn;
            }
            
            allPlaces.push(...places);
            
            return {
                code,
            };
        },
    });
    
    return allPlaces;
};

export const branch = async (rawSource) => {
    const list = [];
    const svelte = await import('svelte/compiler');
    
    await svelte.preprocess(rawSource, {
        async script({content}) {
            if (!content)
                return;
            
            const source = removePrefixSpaces(content);
            const index = rawSource.indexOf(content);
            
            const startLine = getStartLine({
                rawSource,
                index,
            });
            
            list.push({
                startLine,
                source,
                extension: 'js',
            });
        },
    });
    
    return list;
};

export const merge = async (rawSource, list) => {
    const svelte = await import('svelte/compiler');
    
    const {code} = await svelte.preprocess(rawSource, {
        script({content}) {
            if (!content)
                return;
            
            const currentSource = list
                .shift()
                .trim();
            
            const code = addPrefixSpaces({
                content,
                currentSource,
            });
            
            return {
                code,
            };
        },
    });
    
    return code;
};

function addPrefixSpaces({content, currentSource}) {
    const spacesCount = getSpacesCount(content);
    
    const lastLine = content
        .split('\n')
        .pop();
    
    const code = '\n' + currentSource
        .split('\n')
        .map(addSpaces(spacesCount))
        .join('\n') +
    '\n' + lastLine;
    
    return code;
}

function removePrefixSpaces(text) {
    const lines = text
        .split('\n')
        .slice(1);
    
    const spacesCount = getSpacesCount(lines[0]);
    
    return lines
        .map(cutSpaces(spacesCount))
        .join('\n');
}

function getSpacesCount(text) {
    let i = 0;
    
    while (/\s/.test(text[i]))
        ++i;
    
    return i;
}

function getStartLine({index, rawSource}) {
    let i = 0;
    let lines = 0;
    
    while (i <= index) {
        if (rawSource[i] === '\n')
            ++lines;
        
        ++i;
    }
    
    return lines;
}
