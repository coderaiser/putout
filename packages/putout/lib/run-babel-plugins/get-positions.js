'use strict';

const DiffMatchPatch = require('diff-match-patch');

module.exports = (oldText, newText) => {
    const lines = diffLineMode(oldText, newText);
    const changedLines = getChangedLines(lines);
    
    return convert(changedLines);
};

function convert(lines) {
    const result = [];
    const column = 0;
    
    for (const line of lines) {
        result.push({
            line,
            column,
        });
    }
    
    return result;
}

const NOT_CHANGED = 0;
const REMOVED = -1;

function getChangedLines(lines) {
    let i = 0;
    const changedLines = [];
    let prevState = 0;
    for (const [state, line] of lines) {
        if (state === NOT_CHANGED) {
            ++i;
            continue;
        }
        
        if (state === REMOVED) {
            i += line.split('\n').length - 1;
        }
        
        if (prevState !== NOT_CHANGED) {
            prevState = state;
            continue;
        }
        
        changedLines.push(i);
        prevState = state;
    }
    
    return changedLines;
}

// https://github.com/google/diff-match-patch/wiki/Line-or-Word-Diffs
function diffLineMode(text1, text2) {
    const dmp = new DiffMatchPatch();
    const a = dmp.diff_linesToChars_(text1, text2);
    const lineText1 = a.chars1;
    const lineText2 = a.chars2;
    const {lineArray} = a;
    const diffs = dmp.diff_main(lineText1, lineText2, false);
    
    dmp.diff_charsToLines_(diffs, lineArray);
    
    return diffs;
}

