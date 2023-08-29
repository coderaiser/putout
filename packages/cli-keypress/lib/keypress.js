'use strict';

const process = require('process');
const fullstore = require('fullstore');
const readline = require('readline');
const {isCI} = require('ci-info');

const isStop = fullstore(false);

const IS_SET = () => true;
const IS_NOT_SET = () => false;

const {KEYPRESS} = process.env;

const isKeypress = (a) => a.name === '__keypress';
const isSet = (a, b) => a.listeners(b).filter(isKeypress).length;

module.exports = (stream = process.stdin) => {
    if (!stream.isTTY || isCI && KEYPRESS !== '1')
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

module.exports._onKeyPress = onKeyPress;
