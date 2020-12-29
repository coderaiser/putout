'use strict';

const fullstore = require('fullstore');
const readline = require('readline');
const {isCI} = require('ci-info');

const isStop = fullstore(false);

const IS_SET = () => true;
const IS_NOT_SET = () => false;

module.exports = (stream = process.stdin) => {
    if (!stream.isTTY || isCI)
        return {
            isHandlerSet: IS_NOT_SET,
            isStop,
        };
    
    readline.emitKeypressEvents(stream);
    stream.setRawMode(true);
    
    stream.on('keypress', onKeyPress(isStop));
    
    return {
        isHandlerSet: IS_SET,
        isStop,
    };
};

const onKeyPress = (isStop) => (str, key) => {
    const {ctrl, name} = key;
    
    if (ctrl && name === 'c')
        isStop(true);
};

module.exports._onKeyPress = onKeyPress;
