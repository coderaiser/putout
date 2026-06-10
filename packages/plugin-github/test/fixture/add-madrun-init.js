__putout_processor_yaml({
    "jobs": {
        "build": {
            "steps": [
                {
                    "name": "Install Redrun",
                    "run": "bun i redrun -g",
                },
                {
                    "name": "Install",
                    "run": "bun i -f",
                },
            ],
        },
    },
});

// no steps
__putout_processor_yaml({
    "jobs": {
        "build": {
        },
    },
})
