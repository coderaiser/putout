export const report = () => 'Unexpected "debugger" statement';

export const replace = () => ({
    debugger: '',
});

const removeDebugger= {
    report,
    replace,
}

export default removeDebugger;

