'use strict';

module.exports.report = () => 'Nullish coalescing should be used';

module.exports.replace = () => ({
    'const __a = __b || __c': 'const __a = __b ?? __c',
    '__a = typeof __a === "undefined" ? __b : __a': '__a = __a ?? __b',
    '__a = __a === undefined ? __b : __a': '__a = __a ?? __b',
});

