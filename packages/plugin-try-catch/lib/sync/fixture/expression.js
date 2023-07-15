export const writeState = storage
    ? (state) => {
        try {
            storage.setItem(key, JSON.stringify(state));
        } catch {
            // eslint-disable-next-line no-console
            console.warn('Unable to write to local storage.');
        }
    }
    : noop;
