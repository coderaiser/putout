__putout_processor_yaml({
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "strategy": {
                "matrix": {
                    "node-version": ["18.x", "22.x"]
                }
            }
        }
    }
});
