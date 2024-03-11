__putout_processor_yaml({
    "name": "Node CI",
    "on": ["push", "pull_request"],
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": [{
                "uses": "actions/cache@v4",
                "with": {
                    "path": [
                        "~/.cargo/bin/"
                    ]
                }
            }]
        }
    }
});
