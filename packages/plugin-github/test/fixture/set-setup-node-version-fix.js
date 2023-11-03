__putout_processor_json({
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
                "name": "Use Node.js ${{ matrix.node-version }}",
                "uses": "actions/setup-node@v4",
                "with": {
                    "node-version": "${{ matrix.node-version }}"
                }
            }, {
                "name": "Install Redrun",
                "run": "bun i redrun -g --no-save"
            }, {
                "name": "Install",
                "run": "bun i --no-save"
            }, {
                "name": "Bootstrap",
                "run": "redrun bootstrap"
            }, {
                "name": "Lint",
                "run": "redrun lint"
            }, {
                "name": "Coverage",
                "run": "redrun coverage report"
            }, {
                "name": "Coveralls",
                "uses": "coverallsapp/github-action@v2",
                "continue-on-error": true,
                "with": {
                    "github-token": "${{ secrets.GITHUB_TOKEN }}"
                }
            }]
        }
    }
});
