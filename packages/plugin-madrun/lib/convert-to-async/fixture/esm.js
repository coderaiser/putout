import {run} from 'madrun';

export default {
    'test': () => 'tape test/*.js',
    'watch:test': () => run('watcher', run('test')),
    'watcher': () => 'nodemon -w lib -w test -x',
};

