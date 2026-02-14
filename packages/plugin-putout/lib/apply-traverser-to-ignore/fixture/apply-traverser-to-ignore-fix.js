export const {
    report,
    fix,
    traverse,
} = ignore({
    type: __json,
    name: '.nycrc.json',
    field: 'exclude',
    list: ['*.config.*'],
});
