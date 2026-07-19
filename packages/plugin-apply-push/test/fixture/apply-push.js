const nexted = [];
const dispatch = createMiddleware(store)((a) => nexted.push(a));
