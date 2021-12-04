import {sep} from 'path';
import {Writable} from 'stream';

import dump from '@putout/formatter-dump';
import cliProgress from 'cli-progress';
import chalk from 'chalk';
import once from 'once';

const OK = '👌';
const {red} = chalk;
const dir = process.cwd();
const formatErrorsCount = (a) => a ? red(a) : OK;

const {stderr} = process;
const {PUTOUT_PROGRESS_BAR = '1'} = process.env;

export default ({name, options, places, index, count, filesCount, errorsCount}) => {
    const {
        color = '#6fbdf1',
        minCount = 0,
    } = options;
    
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
        name,
    });
    
    bar.increment({
        name: name.replace(`${dir}${sep}`, ''),
        errorsCount: formatErrorsCount(errorsCount),
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

const getStream = () => PUTOUT_PROGRESS_BAR === '0' ? new Writable() : stderr;
export const _getStream = getStream;

const createProgress = once(({count, color, name}) => {
    const colorFn = getColorFn(color);
    const bar = new cliProgress.SingleBar({
        format: `${colorFn('{bar}')} {percentage}% | {errorsCount} | {value}/{total} | {name}`,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        clearOnComplete: true,
        stopOnComplete: true,
        hideCursor: true,
        stream: getStream(),
    }, cliProgress.Presets.react);
    
    bar.start(count, 0, {
        name,
        errorsCount: OK,
    });
    
    return bar;
});

