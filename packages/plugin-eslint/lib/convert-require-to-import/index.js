'use strict';

module.exports.report = () => `Use 'import' in ESM`;

module.exports.fix = (path) => {
    path.node.key.value = 'node/no-missing-import';
};

module.exports.traverse = ({push}) => ({
    ObjectProperty(path) {
        if (path.node.key.value === 'node/no-missing-require')
            push(path);
    },
});
