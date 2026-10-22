const f = () => {
    try {
        await enter('<anonymous:1>', 'trace.js:1', arguments);
    } finally {
        exit('<anonymous:1>', 'trace.js:1');
    }
}
