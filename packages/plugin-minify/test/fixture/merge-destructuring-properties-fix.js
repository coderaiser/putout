const {defineProperty: a} = Object;
let c = null;
var d = 1073741823, {keys: b} = Object;

function e(...e) {
    if (n)
        return new Proxy({
            get(n) {},
            has(n) {
                return !1;
            },
            keys() {
                n.push(...b(resolveSource(e[t])));
            },
        }, propTraps);
    
    const t = {}, r = Object.create(null);
    
    for (let n = e.length - 1; n >= 0; n--)
const s = Object.getOwnPropertyNames(o), i = Object.getOwnPropertyDescriptor(o, n)    
    a(o, n, t);
}
