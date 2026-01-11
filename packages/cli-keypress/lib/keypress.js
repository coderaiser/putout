import process from 'node:process';
import readline from 'node:readline';
import {fullstore} from 'fullstore';
import {isCI as _isCI} from 'ci-info';

const isStop = fullstore(false);

const IS_SET = () => true;
const IS_NOT_SET = () => false;

const {KEYPRESS} = process.env;

const isKeypress = (a) => a.name === '__keypress';
const isSet = (a, b) => a
    .listeners(b)
    .filter(isKeypress)
    .length;

export const keypress = (stream = process.stdin, overrides = {}) => {
    const {
        isCI = _isCI,
        keypress = KEYPRESS,
    } = overrides;
    
    if (!stream.isTTY || isCI && keypress !== '1')
        return {
            isHandlerSet: IS_NOT_SET,
            isStop,
        };
    
    readline.emitKeypressEvents(stream);
    stream.setRawMode(true);
    
    if (!isSet(stream, 'keypress'))
        stream.on('keypress', onKeyPress(isStop));
    
    return {
        isHandlerSet: IS_SET,
        isStop,
    };
};

const onKeyPress = (isStop) => function __keypress(str, key) {
    const {ctrl, name} = key;
    
    if (ctrl && name === 'c')
        isStop(true);
};

export const _onKeyPress = onKeyPress;
