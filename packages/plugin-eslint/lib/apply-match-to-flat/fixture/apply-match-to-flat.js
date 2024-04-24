import x from 'x';

export default [
     ...safeAlign, {
         files: ['*.d.ts'],
         rules: {
             'no-var': 'off',
         },
     }, {
         files: ['*.spec.*'],
         rules: {
             'node/no-extraneous-import': 'off',
         },
     },
 ];