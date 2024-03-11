'use strict';

const {updateActions} = require('./update-actions');

module.exports = updateActions({
    'actions/checkout': 'v4',
    'actions/cache': 'v4',
    'actions/setup-node': 'v4',
    'docker/setup-buildx-action': 'v2',
    'docker/build-push-action': 'v4',
    'docker/login-action': 'v2',
    'docker/setup-qemu-action': 'v2',
    'coverallsapp/github-action': 'v2',
    'EndBug/add-and-commit': 'v9',
});
