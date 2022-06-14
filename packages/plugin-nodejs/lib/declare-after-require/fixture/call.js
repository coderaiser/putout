const configManager = cloudcmd.createConfigManager();
const {request} = require('serve-once')(cloudcmd, {
    config: {
        auth: false,
    },
    configManager,
});
