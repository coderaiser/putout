const q = 1,
  signalOptions = {};
function createSignal(e, n) {
  return Object.assign({}, signalOptions, n);
}
const transPending = createSignal(!q);
console.log(transPending[q] && transPending);
