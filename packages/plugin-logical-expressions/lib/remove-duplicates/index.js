'use strict';

module.exports.report = () => 'Avoid duplicates in logical expressions';

module.exports.replace = () => ({
    '__a || __a': '__a',
    '__a && __a': '__a',
    
    '__a && __b && __a': '__a && __b',
    '__a && __b && __c && __a': '__a && __b && __c',
    
    '__a = __a': '__a',
});
