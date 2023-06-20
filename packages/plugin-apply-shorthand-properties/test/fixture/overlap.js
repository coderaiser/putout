const config = require('../config').createConfig();

test('distribute: export', async (t) => {
    const defaultConfig = {};
    
    const {port, done} = await connect({
        config: defaultConfig,
        configManager: config,
    });
    
    const url = `http://localhost:${port}/distribute?port=${1111}`;
    const socket = io.connect(url);
    
    socket.on('accept', () => {
        config('vim', false);
        config('auth', true);
    });
});
