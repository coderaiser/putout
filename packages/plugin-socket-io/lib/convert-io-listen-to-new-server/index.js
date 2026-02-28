export const report = () => `Use 'new Server(server)' instead of 'io.listen(server)'`;

export const replace = () => ({
    'io.listen(__a)': 'new Server(__a)',
    'io(__a)': 'new Server(__a)',
});
