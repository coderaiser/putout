__putout_processor_yaml({
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "strategy": {
                "matrix": {
                    "node-version": [
                        "20.x",
                        "22.x",
                        "24.x"
                    ]
                }
            }
        }
    }
});
