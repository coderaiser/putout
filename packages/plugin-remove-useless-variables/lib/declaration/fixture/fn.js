module.exports.init = init;

function init(fsDriver) {
    assign(maybeFS, fsDriver);
}
