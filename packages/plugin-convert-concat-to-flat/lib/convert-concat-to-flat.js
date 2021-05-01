'use strict';

module.exports.report = () => '"flat" should be used instead of "concat"';

module.exports.replace = () => ({
    '[].concat.apply([], __a)': '__a.flat()',
    '[].concat(...__a)': '__a.flat()',
});

