const noop = () => {};
const log = noop;

const x = {
    #default_stateChangeHandler(state, oldState) {
        log(`state change: ${oldState} -> ${state}`);
    }
};
