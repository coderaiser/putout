const test = extend({
    chainAll: (operator) => (source, expected) => {
        return operator.chain(source, expected, {
            all: true,
        });
    },
});
