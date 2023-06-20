const AUTH_SESSION = 'xx';

console.log(AUTH_SESSION);

export const setSession = (session) => ({
    type: AUTH_SESSION,
    payload,
});
