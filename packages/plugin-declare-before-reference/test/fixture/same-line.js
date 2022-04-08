const AUTH_SESSION = 'xx';

export const setSession = (session) => ({
    type: AUTH_SESSION,
    payload: session,
});
