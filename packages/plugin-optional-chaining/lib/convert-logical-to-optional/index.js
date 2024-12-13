'use strict';

module.exports.report = () => 'Use optional chaining';

module.exports.replace = () => ({
    '__a && __a.__b && __a.__b.__c && __a.__b.__c.__d && __a.__b.__c.__d.__e': '__a?.__b?.__c?.__d?.__e',
    '__a && __a.__b && __a.__b.__c && __a.__b.__c.__d': '__a?.__b?.__c?.__d',
    '__a && __a.__b && __a.__b.__c': '__a?.__b?.__c',
    '__a && __a.__b': '__a?.__b',
    '__a && __a.__b.__c': '__a?.__b.__c',
    '__a && __a[__b]': '__a?.[__b]',
    '__a[__b] && __a[__b][__c]': '__a[__b]?.[__c]',
    'typeof __a === "function" && __a(__args)': '__a?.(__args)',
    'isFn(__a) && __a(__args)': '__a?.(__args)',
    'if (typeof __a === "function") __a(__args)': '__a?.(__args)',
    'if (typeof __a === "function") {__a(__args)}': '__a?.(__args)',
    '__a && __a.__b(__args)': '__a?.__b(__args)',
    '__a.__b && __a.__b[__c] && __a.__b[__c].__d(__args)': '__a.__b?.[__c]?.__d(__args)',
});
