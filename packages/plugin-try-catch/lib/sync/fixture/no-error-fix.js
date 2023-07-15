export const writeState = storage ? (state) => {
    tryCatch(storage.setItem, key, JSON.stringify(state));
    // eslint-disable-next-line no-console
    console.warn('Unable to write to local storage.');
} : noop;
