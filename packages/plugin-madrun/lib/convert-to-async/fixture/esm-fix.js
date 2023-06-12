import {run} from 'madrun';

export default {
    'test': () => 'tape test/*.js',
    'watch:test': async () => await run('watcher', await run('test')),
    'watcher': () => 'nodemon -w lib -w test -x',
};
