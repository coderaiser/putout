const originalFetch = global.fetch;

global.fetch = stub().returns({
    headers: [
        ['content-type', 'image/png'],
    ],
});
const result = await _detectType('/hello');

global.fetch = originalFetch;
