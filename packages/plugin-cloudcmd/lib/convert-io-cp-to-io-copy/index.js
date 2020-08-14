'use strict';

module.exports.report = () => 'IO.copy should be used instead of IO.cp';

const cpFrom = `
    IO.cp({
        from: __a,
        to: __b,
        names: __c,
    });
`;

const cpTo = 'IO.copy(__a, __b, __c)';

module.exports.replace = () => ({
    [cpFrom]: cpTo,
});
