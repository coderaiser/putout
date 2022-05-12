const originalFetch = global.fetch;
global.fetch = fetch;
const result = await _detectType('/hello');

global.fetch = originalFetch;
