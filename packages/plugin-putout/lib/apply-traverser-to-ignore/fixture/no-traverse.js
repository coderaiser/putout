export const {
    fix,
    report,
} = ignore({
    type: __json,
    name: '.nycrc.json',
    field: 'exclude',
    list: ['*.config.*'],
});
