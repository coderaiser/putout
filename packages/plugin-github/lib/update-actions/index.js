import {updateActions} from './update-actions.js';

export const {
    report,
    fix,
    traverse,
} = updateActions({
    'actions/checkout': 'v5',
    'actions/cache': 'v5',
    'actions/setup-node': 'v6',
    'docker/setup-buildx-action': 'v4',
    'docker/build-push-action': 'v7',
    'docker/login-action': 'v4',
    'docker/setup-qemu-action': 'v4',
    'coverallsapp/github-action': 'v2',
    'EndBug/add-and-commit': 'v9',
    'oven-sh/setup-bun': 'v2',
});
