module.exports.init = init;

function init(fsDriver) {
    assign(maybeFS, fsDriver);
}

const visit = (path) => {
    found = true;
    path.stop();
};

const visitors = {};

for (const item of items) {
    visitors[item] = visit;
}
