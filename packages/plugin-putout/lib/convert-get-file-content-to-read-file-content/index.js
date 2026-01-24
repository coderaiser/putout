export const report = () => `To read file content use 'readFileContent' instead of 'getFileContent'`;

export const replace = () => ({
    'getFileContent(__a)': 'readFileContent(__a)',
});
