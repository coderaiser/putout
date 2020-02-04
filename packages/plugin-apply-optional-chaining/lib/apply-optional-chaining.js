'use strict';

module.exports.report = () => 'Optional chaining should be used';

module.exports.replace = () => ({
    '__a && __a.__b && __a.__b.__c && __a.__b.__c.__d && __a.__b.__c.__d.__e': '__a?.__b?.__c?.__d?.__e',
    '__a && __a.__b && __a.__b.__c && __a.__b.__c.__d': '__a?.__b?.__c?.__d',
    '__a && __a.__b && __a.__b.__c': '__a?.__b?.__c',
    '__a && __a.__b': '__a?.__b',
    'typeof a === "function" && a(__args)': 'a?.(__args)',
    'if (typeof a === "function") a(__args)': 'a?.(__args)',
    'if (typeof a === "function") {a(__args)}': 'a?.(__args)',
});

