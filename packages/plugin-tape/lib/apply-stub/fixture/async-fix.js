const makeStorage = (overrides = {}) => ({
    fetchFromURL: stub().resolves(null),
    create: stub().resolves(null),
    update: stub().resolves(null),
    fork: stub().resolves(null),
    updateHash: noop,
    ...overrides,
});
