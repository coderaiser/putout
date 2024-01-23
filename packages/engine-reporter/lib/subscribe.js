import keyPress from '@putout/cli-keypress';
import {createReport} from './index.js';

export const subscribe = async ({write, cwd, args, worker, exit}) => {
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
        
        const line = await report(data);
        
        write(line || '');
        
        if (isStop())
            worker.postMessage(['stop']);
    });
};
