__putout_processor_json({
    "name": "Node CI",
    "on": ["push", "pull_request"],
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": [{
                "uses": "actions/checkout@v3"
            }, {
                "name": "Use Node.js ${{ matrix.node-version }}",
                "uses": "actions/setup-node@v3",
                "with": {
                    "node-version": "${{ matrix.node-version }}"
                }
            }, {
                "name": "Login to Docker Hub",
                "uses": "docker/login-action@v2"
            }]
        }
    }
});
