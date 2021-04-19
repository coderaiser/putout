
function get() {
    return new Promise((resolve) => {
        setTimeout(resolve, time, value);
    });
}
