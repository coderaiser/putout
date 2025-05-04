export function storage_setAppState(state) {
    try {
        localStorage.setItem('appstate', serializeAppState(state));
    } catch(error) {
        console.error(error);
    }
}

