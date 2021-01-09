'use strict';

const {Writable} = require('stream');

const dump = require('@putout/formatter-dump');
const cliProgress = require('cli-progress');
const chalk = require('chalk');
const once = require('once');
const format = require('format-io');

const OK = '👌';
const {red} = chalk;
const formatErrorsCount = (a) => a ? red(a) : OK;

const {stderr} = process;
const {
    PUTOUT_PROGRESS_BAR = '1',
} = process.env;

module.exports = ({name, options, places, index, count, filesCount, errorsCount}) => {
    const {
        color = '#ea4336',
        minCount = 0,
    } = options;
    
    const memory = process.memoryUsage();
    
    const rss = format.size(memory.rss);
    
    const naturalIndex = index + 1;
    const result = dump({
        name,
        places,
        index,
        count,
        filesCount,
        errorsCount,
    });
    
    if (count <= minCount)
        return result;
    
    const bar = createProgress({
        count,
        color,
        rss,
    });
    
    bar.increment({
        errorsCount: formatErrorsCount(errorsCount),
        rss,
    });
    
    if (naturalIndex === count) {
        bar.stop();
        return `\r${result}`;
    }
    
    return '';
};

const getColorFn = (color) => {
    if (/^#/.test(color))
        return chalk.hex(color);
    
    return chalk[color];
};

const getStream = () => PUTOUT_PROGRESS_BAR !== '1' ? new Writable() : stderr;
module.exports._getStream = getStream;

const createProgress = once(({count, color, rss}) => {
    const colorFn = getColorFn(color);
    const bar = new cliProgress.SingleBar({
        format: `${colorFn('{bar}')} {percentage}% | {errorsCount} | {value}/{total} | {rss}`,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        clearOnComplete: true,
        stopOnComplete: true,
        stream: getStream(),
    }, cliProgress.Presets.react);
    
    bar.start(count, 0, {
        rss,
        errorsCount: OK,
    });
    
    return bar;
});

