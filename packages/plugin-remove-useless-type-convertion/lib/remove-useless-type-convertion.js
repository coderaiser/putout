'use strict';

module.exports.report = () => `Useless type convertion should be avoided`;

module.exports.replace = () => ({
    '!!__a.includes(__b)': '__a.includes(__b)',
    'Boolean(__a.includes(__b))': '__a.includes(__b)',
    'String(typeof __a)' : 'typeof __a',
});

