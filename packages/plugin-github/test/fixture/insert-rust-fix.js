__putout_processor_json({
    "name": "Node CI",
    "on": ["push", "pull_request"],
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": [{
                'name': 'Install Rust',
                'run': 'rustup update',
            }],
        },
    },
});
