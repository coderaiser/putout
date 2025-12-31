__putout_processor_yaml({
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "strategy": {
                "matrix": {
                    "node-version": [
                        "22.x",
                        "24.x",
                        "25.x"
                    ]
                }
            }
        }
    }
});
