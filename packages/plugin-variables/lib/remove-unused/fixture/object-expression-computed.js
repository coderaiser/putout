const hi = (abc, world) => {
    [...abc].filter(({
        [world]: x
    }) => x);
}
