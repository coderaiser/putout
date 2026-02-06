export const report = () => `Use default import`;

export const replace = () => ({
    'import {default as __a} from "__b"': 'import __a from "__b"',
});
