'use strict';

module.exports.report = () => `Remove useless String conversion`;

module.exports.replace = () => ({
    '[__a, String(await __b(__args))]': '[__a, await __b(__args)]',
});
