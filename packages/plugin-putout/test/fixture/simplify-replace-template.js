module.exports.replace = () => ({
    'if (__a) {__b} else {__c}': () => 'if (__a) __b; else __c',
    'if (__a) {__b} else {__c}': () => {
        return 'if (__a) __b; else __c';
    }
});

const a = () => 'xx';

export const replace = () => ({
    'if (__a) {__b} else {__c}': () => 'if (__a) __b; else __c',
});

export const match = () => ({
    'if (__a) {__b} else {__c}': () => 'if (__a) __b; else __c',
});