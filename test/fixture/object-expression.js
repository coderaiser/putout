const parser = {
    parse(source) {
        return cherow.parse(source, {
            loc: true,
            tokens: false,
        });
    },
};

