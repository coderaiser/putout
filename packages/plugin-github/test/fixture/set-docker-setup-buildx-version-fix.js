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
                "uses": "docker/setup-qemu-action@v2",
                "with": {
                    "node-version": "${{ matrix.node-version }}"
                }
            }, {
                "name": "Set up Docker Buildx",
                "uses": "docker/setup-buildx-action@v2"
            }]
        }
    }
});
