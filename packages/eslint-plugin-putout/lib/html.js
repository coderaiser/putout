import globals from 'globals';

export default [{
    name: 'putout: html: js',
    files: ['**/*.html{js}'],
    languageOptions: {
        globals: {
            ...globals.browser,
        },
    },
}];
