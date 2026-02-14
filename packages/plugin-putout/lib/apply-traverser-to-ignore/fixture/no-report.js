export const {
    match,
    replace,
} = ignore({
    type: __json,
    name: '.nycrc.json',
    field: 'exclude',
    list: ['*.config.*'],
});
