__putout_processor_json({
    "name": "Node CI",
    "on": ["push", "pull_request"],
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": [{
                "uses": "actions/checkout@v3"
            }, {
                "name": "Set up QEMU",
                "uses": "setup-qemu-action@v1",
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
