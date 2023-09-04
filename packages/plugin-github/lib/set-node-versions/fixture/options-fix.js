__putout_processor_json({
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "strategy": {
                "matrix": {
                    "node-version": [
                        "18.x",
                        "22.x"
                    ]
                }
            }
        }
    }
});
