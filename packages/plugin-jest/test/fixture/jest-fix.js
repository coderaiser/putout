expect.extend({
    fail: (a, b, c) => {
        return {
            pass: false,
        }
    }
});

jest.resetModules();
jest.advanceTimersByTime(1000);
