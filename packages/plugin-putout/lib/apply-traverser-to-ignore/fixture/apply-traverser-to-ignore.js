export const {
    report,
    match,
    replace,
} = ignore({
    type: __json,
    name: '.nycrc.json',
    field: 'exclude',
    list: ['*.config.*'],
});