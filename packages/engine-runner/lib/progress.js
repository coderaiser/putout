'use strict';

const {EventEmitter} = require('node:events');

module.exports.createProgress = () => {
    let pluginsCount = 0;
    let pluginsIndex = 0;
    
    const progress = new EventEmitter();
    
    progress.reset = () => {
        pluginsIndex = 0;
        pluginsCount = 0;
    };
    
    progress.file = ({i, n, percent, rule}) => {
        progress.emit('file', {
            i,
            n,
            rule,
            percent,
        });
    };
    
    progress.inc = () => {
        ++pluginsCount;
    };
    
    progress.start = (rule) => {
        ++pluginsIndex;
        progress.emit('start', {
            pluginsIndex,
            pluginsCount,
            rule,
        });
    };
    
    progress.push = (rule) => {
        progress.emit('push', {
            pluginsIndex,
            pluginsCount,
            rule,
        });
    };
    
    progress.end = (rule) => {
        progress.emit('end', {
            rule,
            pluginsIndex,
            pluginsCount,
        });
    };
    
    return progress;
};
