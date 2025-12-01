export const report = () => `Use 'spread' instead of 'apply'`;

export const replace = () => ({
    '__a.apply(null, __b)': '__a(...__b)',
    '__a.__b.apply(null, __c)': '__a.__b(...__c)',
    '__a.__b.apply(__a, __c)': '__a.__b(...__c)',
});
