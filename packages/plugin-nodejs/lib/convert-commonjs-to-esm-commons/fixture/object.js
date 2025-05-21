const expected = [{
    readFileSync: {
        declared: true,
        used: true,
    },
    require: {
        declared: false,
        used: true,
    },
    m: {
        declared: true,
        used: false,
    },
}];
