

module.exports.scan = (path, {push, trackFile}) => {
    trackFile(path, '*.swp').map(push);
};