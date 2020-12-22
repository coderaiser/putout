module.exports.init = promisify((callback) => {
    exec.series([
        async (callback) => {
            const {
                prefix,
                prefixSocket,
            } = CloudCmd;
        },
    ], callback);
});

