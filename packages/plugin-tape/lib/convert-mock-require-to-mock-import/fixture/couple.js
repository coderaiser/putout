const mockRequire = require('mock-require');
const {reRequire, stopAll} = mockRequire;

test('cloudcmd: rest: move', async (t) => {
    mockRequire('fs', unionFS);

    reRequire('@cloudcmd/rename-files');
    reRequire('@cloudcmd/move-files');
    reRequire(restPath);

    stopAll();
});

