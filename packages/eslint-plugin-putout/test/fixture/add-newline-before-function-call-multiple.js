const test = require('supertape');
const fs = require('fs');
const {getColumns} = require('./columns');


test('columns: prod', (t) => {
    const columns = getColumns({
        isDev: false,
    });

    t.equal(columns[''], '');
    t.end();
});

