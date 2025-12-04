const env = require('./env');

test('cloudcmd: server: env: bool: upper case first', (t) => {
    const {CLOUDCMD_TERMINAL} = process.env;
    const {cloudcmd_terminal} = process.env;
    
    const result = env.bool('terminal');
});
