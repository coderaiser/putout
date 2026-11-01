__putout_processor_yaml({
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "strategy": {
                "matrix": {
                    "node-version": [
                        "22.x",
                        "24.x",
                        "26.x",
                        ">= 27.0.0-alpha.0 <= 27.x"
                    ]
                }
            }
        }
    }
});
