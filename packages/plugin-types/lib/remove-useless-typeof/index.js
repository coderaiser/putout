'use strict';

module.exports.report = () => `Useless typeof should be avoided`;

module.exports.replace = () => ({
    'typeof typeof __a': 'typeof __a',
});

