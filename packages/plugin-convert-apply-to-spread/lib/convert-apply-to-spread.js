'use strict';

module.exports.report = () => `Use 'spread' instead of 'apply'`;

module.exports.replace = () => ({
    '__a.apply(null, __b)': '__a(...__b)',
    '__a.__b.apply(null, __c)': '__a.__b(...__c)',
    '__a.__b.apply(__a, __c)': '__a.__b(...__c)',
});
