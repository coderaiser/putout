const {assign} = Object, transPending = createSignal(!q);
const q = 1, signalOptions = {};
function createSignal(e, n) {
    return assign({}, signalOptions, n);
}

console.log(transPending[q] && transPending);
