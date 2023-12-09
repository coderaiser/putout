__putout_processor_yaml({
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "strategy": {
                "matrix": {
                    "node-version": [
                        "18.x",
                        "20.x",
                        "21.x"
                    ]
                }
            }
        }
    }
});
