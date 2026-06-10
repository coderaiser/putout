__putout_processor_yaml({
    "jobs": {
        "build": {
            "steps": [{
                "name": "Install Redrun",
                "run": "bun i redrun madrun -g"
            }, {
                "name": "Install",
                "run": "bun i -f"
            }, {
                "name": "Init Madrun",
                "run": "madrun init"
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
