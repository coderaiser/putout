'use strict';

module.exports.report = () => `Avoid useless 'typeof'`;

module.exports.replace = () => ({
    'typeof typeof __a': 'typeof __a',
});
