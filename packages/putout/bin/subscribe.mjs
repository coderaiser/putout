import process from 'node:process';
import keyPress from '@putout/cli-keypress';
import {createReport} from './report.mjs';

export const subscribe = async ({cwd, args, worker, exit}) => {
    const {isStop} = keyPress();
    const report = await createReport({
        args,
        cwd,
        exit,
    });
    
    worker.on('exit', exit);
    worker.on('message', async ([event, data]) => {
        if (event !== 'progress')
            return;
        
        if (isStop())
            data.index = data.count - 1;
        
        process.stdout.write(await report(data));
        
        if (isStop())
            worker.postMessage(['stop']);
    });
};
