module.exports.replace = () => ({
    '[].concat.apply([], __a)': '__a.flat()',
    '__a.__b.apply(__a, __c)' : '__a.__b(...__c)',
});

