import process from 'node:process';
import readline from 'node:readline';
import Queue from 'enquirer/lib/queue.js';
import keypress from 'enquirer/lib/keypress.js';

keypress.listen = (options = {}, onKeypress) => {
    const {stdin} = options;
    
    if (!stdin || stdin !== process.stdin && !stdin.isTTY)
        throw Error('Invalid stream passed');
    
    const rl = readline.createInterface({
        terminal: true,
        input: stdin,
    });
    
    readline.emitKeypressEvents(stdin, rl);
    
    const queue = new Queue((buf, key) => onKeypress(buf, keypress(buf, key), rl));
    const {isRaw} = stdin;
    
    if (stdin.isTTY)
        stdin.setRawMode(true);
    
    stdin.on('keypress', queue.enqueue);
    rl.resume();
    
    const off = () => {
        if (stdin.isTTY)
            stdin.setRawMode(isRaw);
        
        stdin.removeListener('keypress', queue.enqueue);
        queue.destroy();
        rl.close();
    };
    
    return off;
};
