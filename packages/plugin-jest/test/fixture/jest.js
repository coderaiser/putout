jest.addMatchers({
    fail: (a, b, c) => {
        return {
            pass: false,
        }
    }
});

jest.resetModuleRegistry();
jest.runTimersToTime(1000)
