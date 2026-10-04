export const report = () => `Use Logical Expression instead of Optional Chaining`;

export const replace = () => ({
    'for (const __a of __b(__args)?.__c || []) __d': `{
        const {__c} = __b(__args) || {};
        for (const __a of __c || []) __d;
    }`,
});
