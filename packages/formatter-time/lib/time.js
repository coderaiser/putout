import {Writable} from 'node:stream';
import process, {hrtime} from 'node:process';
import dump from '@putout/formatter-dump';
import cliProgress from 'cli-progress';
import chalk from 'chalk';
import once from 'once';
import format from 'format-io';
import montag from 'montag';
import {Timer} from 'timer-node';

const start = once(() => hrtime.bigint());
const end = once(() => hrtime.bigint());

const OK = '👌';
const CLOCK = '⏳';

const {
    green,
    yellow,
    red,
    blueBright,
} = chalk;

const formatErrorsCount = (a) => a ? red(a) : OK;
const {stderr} = process;

const {
    PUTOUT_PROGRESS_BAR = '1',
    TEST = 0,
} = process.env;

export default ({name, options, places, index, count, filesCount, errorsCount}) => {
    start();
    
    const {
        color = '#91e0d5',
        minCount = 0,
        clock = CLOCK,
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
    
    const {bar, timer} = createProgress({
        count,
        color,
        rss,
    });
    
    bar.increment({
        errorsCount: formatErrorsCount(errorsCount),
        rss,
        time: getTime({
            clock,
            timer,
        }),
    });
    
    if (naturalIndex === count) {
        bar.stop();
        timer.stop();
        
        return `\r${result}\n${getInfo({
            rss,
            heapUsed,
            heapTotal,
        })}`;
    }
    
    return '';
};

const getColorFn = (color) => {
    if (color.startsWith('#'))
        return chalk.hex(color);
    
    return chalk[color];
};

export const _getStream = () => PUTOUT_PROGRESS_BAR !== '1' ? new Writable() : stderr;

const createProgress = once(({count, color, rss}) => {
    const colorFn = getColorFn(color);
    
    const timer = new Timer({
        label: 'putout-timer',
    });
    
    const bar = new cliProgress.SingleBar({
        format: `${colorFn('{bar}')} {percentage}% | {errorsCount} | {value}/{total} | {time} | {rss}`,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        clearOnComplete: true,
        stopOnComplete: true,
        stream: _getStream(),
        hideCursor: true,
    }, cliProgress.Presets.react);
    
    timer.start();
    bar.start(count, 0, {
        rss,
        errorsCount: OK,
    });
    
    return {
        bar,
        timer,
    };
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
        time: ${blueBright(calcTime())}
    
    
    `;
}

export const maybeZero = (a) => a <= 9 ? '0' : '';

function calcTime() {
    const time = Math.round(Number(end() - start()) / 1e9);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    return `${maybeZero(minutes)}${minutes}:${maybeZero(seconds)}${seconds}`;
}

function getTime({clock, timer}) {
    const {m, s} = timer.time();
    const minute = `${maybeZero(m)}${m}`;
    const second = `${maybeZero(s)}${s}`;
    
    return `${clock} ${minute}:${second}`;
}
