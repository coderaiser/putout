const {createTest} = require('#test');
const {fixture} = createTest(__dirname);
const {test} = createTest(__dirname);

test('', (t) => {
    t.print(fixture.returnStatement);
});
