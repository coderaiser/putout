'use strict';

const {setVersions} = require('./set-versions');

module.exports = setVersions({
    'actions/checkout': 'v3',
    'actions/setup-node': 'v3',
    'docker/setup-buildx-action': 'v2',
    'docker/build-push-action': 'v4',
    'coverallsapp/github-action': 'v2',
    'setup-quemu-action': 'v2',
    'EndBug/add-and-commit': 'v9',
});
