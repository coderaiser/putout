__putout_processor_yaml({
    "jobs": {
        "build": {
            "steps": [{
                "name": "Typos",
                "uses": "coderaiser/typos.ai@v1.1.8",
                "with": {
                    "key": "${{ secrets.TYPOS_AI_KEY }}"
                }
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
