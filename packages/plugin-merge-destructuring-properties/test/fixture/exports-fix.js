import {promisify} from 'node:util';
import {exec} from 'node:child_process';

export const init = promisify((callback) => {
    exec.series([
        async (callback) => {
            const {prefix, prefixSocket} = CloudCmd;
        },
    ], callback);
});
