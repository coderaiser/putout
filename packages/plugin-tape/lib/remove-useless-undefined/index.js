export const report = () => `Avoid useless 'returns/resolves(undefined)'`;

export const replace = () => ({
    'stub().returns(undefined)': 'stub()',
    'stub().resolves(undefined)': 'stub().resolves()',
});
