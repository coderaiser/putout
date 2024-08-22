const fn = (overrides = {}) => {
    const {code, e = {}} = overrides;
    return create(code || e);
};
