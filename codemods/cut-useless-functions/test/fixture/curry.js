const fn = (a, b) => {
    alert(a, b);
};

const a = curry((a, b) => {
    fn(a, b);
});
