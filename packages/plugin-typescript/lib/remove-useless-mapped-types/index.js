export const report = () => 'Avoid useless mapped types';

export const exclude = () => [
    'type __a = {readonly [__b in keyof __c]: __c[__b];}',
    'type __a = {-readonly [__b in keyof __c]: __c[__b];}',
    'type __a = {[__b in keyof __c]?: __c[__b];}',
    'type __a = {[__b in keyof __c]+?: __c[__b];}',
    'type __a = {[__b in keyof __c]-?: __c[__b];}',
];

export const replace = () => ({
    'type __a = {[__b in keyof __c]: __c[__b];}': 'type __a = __c',
});
