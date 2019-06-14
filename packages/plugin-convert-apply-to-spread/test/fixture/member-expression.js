const fn = (...args) => {
    this._Emitter.emit.apply(/* hello */ this._Emitter, args);
};

