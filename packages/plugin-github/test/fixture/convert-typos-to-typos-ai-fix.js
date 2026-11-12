__putout_processor_yaml({
    "jobs": {
        "build": {
            "steps": [{
                "name": "Typos",
                "uses": "coderaiser/typos.ai@v2.0.0"
            }]
        }
    }
});

// no steps
__putout_processor_yaml({
    "jobs": {
        "build": {}
    }
});
