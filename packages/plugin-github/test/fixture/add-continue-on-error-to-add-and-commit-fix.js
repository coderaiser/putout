__putout_processor_yaml({
    name: "Node CI",
    "permissions": {
        "contents": "write"
    },
    on: ["push", "pull_request"],
    jobs: {
        build: {
            "runs-on": "ubuntu-latest",
            "steps": [{
                "uses": "actions/checkout@v7"
            }, {
                "uses": "oven-sh/setup-bun@v2",
                "with": {
                    "bun-version": "latest"
                }
            }, {
                "name": "Use Node.js ${{ matrix.node-version }}",
                "uses": "actions/setup-node@v7",
                "with": {
                    "node-version": "${{ matrix.node-version }}"
                }
            }, {
                "name": "Commit fixes",
                "uses": "EndBug/add-and-commit@v10",
                "continue-on-error": true
            }]
        }
    }
});
