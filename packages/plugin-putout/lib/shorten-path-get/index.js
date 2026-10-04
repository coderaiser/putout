export const report = () => `Shorten 'path.get()'`;

export const replace = () => ({
    'path.get("__a")[__b].get("__c")': ({__a, __b, __c}) => {
        return `path.get('${__a.value}.${__b.value}.${__c.value}')`;
    },
});
