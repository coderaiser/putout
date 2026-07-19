const makeStorage = (overrides = {}) => ({
    fetchFromURL: async () => null,
    create: async () => null,
    update: async () => null,
    fork: async () => null,
    updateHash: noop,
    ...overrides,
});

