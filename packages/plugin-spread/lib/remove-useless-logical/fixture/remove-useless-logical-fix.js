const state = {
    ...base,
    ...overrides,
    workbench: {
        ...base.workbench,
        ...overrides.workbench,
    },
};
