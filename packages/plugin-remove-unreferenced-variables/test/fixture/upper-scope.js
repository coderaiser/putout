const loop = once(({emitter, tests}) => {
    let done = false;
    let previousCount = 0;

    (function loop() {
        if (previousCount === tests.length) {
            done = true;
            emitter.emit('run');

            return;
        }

        previousCount = tests.length;

        // 5ms ought to be enough for anybody
        setTimeout(loop, 5);
    })();
});
