const {operator: operator} = require('putout');
const {findFile} = operator;
const {removeFile} = operator;
const FS = '__putout_processor_filesystem(__object)';

module.exports.report = () => `Remove vim swap file`;

module.exports.fix = (filePath) => {
    removeFile(filePath);
};

module.exports.traverse = ({push}) => ({
    [FS](path) {
        findFile(path, '*.swp').map(push);
    },
});
