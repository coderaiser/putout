__putout_processor_yaml({
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": {
                "uses": "actions/setup-node@v4",
                "with": {
                    "node-version": "20"
                }
            }
        }
    }
});
