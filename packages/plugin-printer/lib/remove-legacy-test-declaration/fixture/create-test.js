module.exports.createTest = (dir) => {
    const fixture = readFixtures(dir);
    const test = extend({
        print: printExtension,
    });
};

