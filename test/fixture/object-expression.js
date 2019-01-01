const parser = {
    parse(source) {
        return cherow.parse(source, {
            loc: true,
            tokens: false,
        });
    },
};

module.exports = () => ({
    parser,
});

function spreadExample() {
    const spread = {};
    const module = {
        exports: {},
    };
    
    module.exports = {
        ...spread
    };
};
