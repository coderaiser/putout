const mockRequire = require('mock-require');
const {reRequire} = mockRequire;

test('', () => {
    mockRequire('a', stub);
});
