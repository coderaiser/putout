__putout_processor_yaml({
    "jobs": {
        "build": {
            "steps": [{
                "name": "Install redrun",
                "run": "bun i redrun -g"
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
