'use strict';

module.exports.report = () => `Use 'context.filename' instead of 'context.getFilename()'`;

module.exports.replace = () => ({
    'context.getFilename()': 'context.filename',
});

