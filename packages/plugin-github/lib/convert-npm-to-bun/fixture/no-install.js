__putout_processor_json({
    "name": "Node CI",
    "on": ["push", "pull_request"],
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": [{
                "uses": "actions/checkout@v1"
            }, {
                "uses": "oven-sh/setup-bun@v1",
                "with": {
                    "bun-version": "latest"
                }
            }, {
                "name": "Use Node.js ${{ matrix.node-version }}",
                "uses": "actions/setup-node@v1",
                "with": {
                    "node-version": "${{ matrix.node-version }}"
                }
            }, {
                "name": "Bootstrap",
                "run": "redrun bootstrap"
            }]
        }
    }
});

__putout_processor_json({
    "name": "Node CI",
    "on": ["push", "pull_request"],
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": [{
                "uses": "actions/checkout@v1"
            }, {
                "name": "Use Node.js ${{ matrix.node-version }}",
                "uses": "actions/setup-node@v1",
                "with": {
                    "node-version": "${{ matrix.node-version }}"
                }
            }, {
                "name": "Install Redrun",
                "run": "bun i redrun -g --no-save --no-save"
            }]
        }
    }
});
