const loop = once(({emitter, tests}) => {
    let previousCount = 0;

    (function loop() {
        if (previousCount === tests.length) {
            emitter.emit('run');

            return;
        }

        previousCount = tests.length;

        // 5ms ought to be enough for anybody
        setTimeout(loop, 5);
    })();
});
