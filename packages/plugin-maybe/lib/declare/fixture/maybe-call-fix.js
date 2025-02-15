const maybeCall = (a, ...b) => isFn(a) && a(...b);
maybeCall(fn, 'hello');
