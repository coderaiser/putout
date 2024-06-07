'use strict';

module.exports.report = () => `Add 'places' array to 'comparePlaces()'`;

module.exports.replace = () => ({
    'comparePlaces(__a)': 'comparePlaces(__a, [])',
});
