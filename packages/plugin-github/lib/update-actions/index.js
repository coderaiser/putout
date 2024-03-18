import {updateActions} from './update-actions.js';

export default updateActions({
    'actions/checkout': 'v4',
    'actions/cache': 'v4',
    'actions/setup-node': 'v4',
    'docker/setup-buildx-action': 'v3',
    'docker/build-push-action': 'v4',
    'docker/login-action': 'v3',
    'docker/setup-qemu-action': 'v3',
    'coverallsapp/github-action': 'v2',
    'EndBug/add-and-commit': 'v9',
});
