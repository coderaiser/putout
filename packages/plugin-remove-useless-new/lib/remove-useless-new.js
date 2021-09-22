'use strict';

module.exports.report = () => `Avoid useless operator 'new'`;

module.exports.replace = () => ({
    'new Error(__args)': 'Error(__args)',
    'new Boolean(__a)': 'Boolean(__a)',
    'new Number(__a)': 'Number(__a)',
    'new String(__a)': 'String(__a)',
    'new Array(__args)': 'Array(__args)',
    'new Symbol(__a)': 'Symbol(__a)',
});

