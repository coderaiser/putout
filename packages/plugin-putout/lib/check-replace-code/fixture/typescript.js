module.exports.replace = () => ({
    'type __a = {[__b in keyof __c]: __c[__b];}': 'type __a = __c',
});
