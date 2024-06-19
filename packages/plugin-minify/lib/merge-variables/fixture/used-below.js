function workLoop() {}
function flushWork() {
    return workLoop();
}
function requestCallback() {
    return flushWork;
}
const sharedConfig = { context: void 0, registry: void 0 };
function setHydrateContext(e) {
    sharedConfig.context = e;
}
var Owner = null;
function createSignal(e) {
    return [e, Object.assign({}).equals];
}
function startTransition() {
    return Owner;
}
const [transPending] = createSignal(!1);
function useTransition() {
    return [transPending, startTransition];
}
function runUserEffects(e) {
    setHydrateContext();
}
global.useTransition = useTransition
