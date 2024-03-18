__putout_processor_yaml({
    "name": "Node CI",
    "on": ["push", "pull_request"],
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": [{
                "uses": "actions/checkout@v4"
            }, {
                "uses": "oven-sh/setup-bun@v1",
                "with": {
                    "bun-version": "latest"
                }
            }, {
                "name": "Set up QEMU",
                "uses": "docker/setup-qemu-action@v3",
                "with": {
                    "node-version": "${{ matrix.node-version }}"
                }
            }, {
                "name": "Build and push base-image",
                "uses": "docker/build-push-action@v5",
                "with": {
                    "context": "."
                }
            }]
        }
    }
});
