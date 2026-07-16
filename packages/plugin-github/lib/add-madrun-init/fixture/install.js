__putout_processor_yaml({
    "jobs": {
        "build": {
            "steps": [
                {
                    "name": "Install",
                    "run": [
                        "bun i redrun madrun palabra -g --no-save",
                        "palabra i kubeconform"
                    ],
                },
                {
                    "name": "Init Madrun",
                    "run": "madrun --init",
                },
            ],
        },
    },
});

