export const report = () => 'Latest Jest API should be used';

export const replace = () => ({
    'jest.addMatchers(__args)': 'expect.extend(__args)',
    'jest.resetModuleRegistry(__args)': 'jest.resetModules(__args)',
    'jest.runTimersToTime(__args)': 'jest.advanceTimersByTime(__args)',
});
