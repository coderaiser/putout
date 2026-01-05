import {test, stub} from 'supertape';
import {
    start,
    pause,
    writeFileContent,
    init,
    deinit,
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
    
    init({
        writeFileContent: writeFileContentStub,
    });
    writeFileContent('x', 'y');
    
    deinit();
    
    t.calledWith(writeFileContentStub, ['x', 'y']);
    t.end();
});
