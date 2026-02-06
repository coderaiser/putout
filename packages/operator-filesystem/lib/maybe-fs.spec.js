import {test, stub} from 'supertape';
import {
    start,
    pause,
    writeFileContent,
    inject,
    eject,
} from './maybe-fs.js';

test('@putout/operator-filesystem: pause', (t) => {
    pause();
    
    t.ok('pause');
    t.end();
});

test('@putout/operator-filesystem: start', (t) => {
    start();
    
    t.ok('start');
    t.end();
});

test('@putout/operator-filesystem: maybe: writeContent', (t) => {
    const writeFileContentStub = stub();
    
    inject({
        writeFileContent: writeFileContentStub,
    });
    writeFileContent('x', 'y');
    
    eject();
    
    t.calledWith(writeFileContentStub, ['x', 'y']);
    t.end();
});
