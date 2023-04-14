'use strict';

module.exports.report = () => 'Avoid useless mapped types';

module.exports.exclude = () => [
    'type __a = {readonly [__b in keyof __c]: __c[__b];}',
    'type __a = {-readonly [__b in keyof __c]: __c[__b];}',
    'type __a = {[__b in keyof __c]?: __c[__b];}',
    'type __a = {[__b in keyof __c]+?: __c[__b];}',
    'type __a = {[__b in keyof __c]-?: __c[__b];}',
];

module.exports.replace = () => ({
    'type __a = {[__b in keyof __c]: __c[__b];}': 'type __a = __c',
});
