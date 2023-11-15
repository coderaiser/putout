__putout_processor_yaml({
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": [{
                "uses": "EndBug/add-and-commit@v9",
                "continue-on-error": true
            }]
        }
    }
});
