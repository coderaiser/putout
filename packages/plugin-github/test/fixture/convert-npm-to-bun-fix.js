__putout_processor_yaml({
    "name": "Node CI",
    "permissions": {
        "contents": "write"
    },
    "on": ["push", "pull_request"],
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": [{
                "name": "Install Redrun",
                "run": "bun i redrun -g --no-save"
            }, {
                "name": "Install Redrun",
                "run": "bun i --no-save"
            }]
        }
    }
});
