import {Writable} from 'stream';

import dump from '@putout/formatter-dump';
import cliProgress from 'cli-progress';
import chalk from 'chalk';
import once from 'once';
import format from 'format-io';
import montag from 'montag';

const OK = '👌';
const {
    green,
    yellow,
    red,
} = chalk;
const formatErrorsCount = (a) => a ? red(a) : OK;

const {stderr} = process;
const {
    PUTOUT_PROGRESS_BAR = '1',
    TEST = 0,
} = process.env;

export default ({name, options, places, index, count, filesCount, errorsCount}) => {
    const {
        color = '#ea4336',
        minCount = 0,
    } = options;
    
    const memory = process.memoryUsage();
    
    const rss = format.size(memory.rss);
    const heapUsed = format.size(memory.heapUsed);
    const heapTotal = format.size(memory.heapTotal);
    
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
        return `\r${result}\n${getInfo({
            rss,
            heapUsed,
            heapTotal,
        })}`;
    }
    
    return '';
};

const getColorFn = (color) => {
    if (/^#/.test(color))
        return chalk.hex(color);
    
    return chalk[color];
};

export const _getStream = () => PUTOUT_PROGRESS_BAR !== '1' ? new Writable() : stderr;

const createProgress = once(({count, color, rss}) => {
    const colorFn = getColorFn(color);
    const bar = new cliProgress.SingleBar({
        format: `${colorFn('{bar}')} {percentage}% | {errorsCount} | {value}/{total} | {rss}`,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        clearOnComplete: true,
        stopOnComplete: true,
        stream: _getStream(),
        hideCursor: true,
    }, cliProgress.Presets.react);
    
    bar.start(count, 0, {
        rss,
        errorsCount: OK,
    });
    
    return bar;
});

const parseMemory = (memory) => {
    if (TEST)
        return {
            rss: '65.29mb',
            heapUsed: '65.29mb',
            heapTotal: '224.57mb',
        };
    
    return memory;
};

export const _parseMemory = parseMemory;

function getInfo(memory) {
    const {
        heapUsed,
        heapTotal,
        rss,
    } = parseMemory(memory);
    
    return montag`
        heap used: ${green(heapUsed)}
        heap total: ${yellow(heapTotal)}
        rss: ${red(rss)}
    
    `;
}

