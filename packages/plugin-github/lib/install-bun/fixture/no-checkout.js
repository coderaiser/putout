__putout_processor_json({
    "name": "Node CI",
    "on": ["push", "pull_request"],
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": [{
                "name": "Use Node.js ${{ matrix.node-version }}",
                "uses": "actions/setup-node@v1",
                "with": {
                    "node-version": "${{ matrix.node-version }}"
                }
            }, {
                "name": "Install Redrun",
                "run": "npm i redrun -g"
            }]
        }
    }
});
