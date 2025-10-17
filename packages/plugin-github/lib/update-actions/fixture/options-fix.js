__putout_processor_yaml({
    "name": "Node CI",
    "on": ["push", "pull_request"],
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": [{
                "uses": "actions/checkout@v5"
            }, {
                "name": "Use Node.js ${{ matrix.node-version }}",
                "uses": "actions/setup-node@v4",
                "with": {
                    "node-version": "${{ matrix.node-version }}"
                }
            }, {
                "name": "Hello",
                "uses": "hello@v13"
            }]
        }
    }
});
