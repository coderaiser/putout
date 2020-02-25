'use strict';

module.exports.report = () => '"test.skip" should not be used';

const result = '__a(__b, __c)';

module.exports.replace = () => ({
    '__a.skip(__b, __c)': result,
    '__a["skip"](__b, __c)': result,
});

module.exports.filter = (path) => {
    const {parentPath} = path.parentPath;
    return parentPath.isProgram();
};

