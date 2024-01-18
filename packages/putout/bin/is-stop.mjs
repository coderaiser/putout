import fullstore from 'fullstore';

const noop = () => {};

export const createIsStop = (parentPort) => {
    if (!parentPort)
        return noop;
    
    const isStop = fullstore(false);
    
    parentPort?.on('message', ([event]) => {
        if (event === 'stop')
            isStop(true);
    });
    
    return isStop;
};
