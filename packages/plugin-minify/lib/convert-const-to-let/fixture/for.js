for (let e = 0, n = this.length; e < n; ++e) {
    const n = this[e]();
    
    if (void 0 !== n)
        return n;
}
