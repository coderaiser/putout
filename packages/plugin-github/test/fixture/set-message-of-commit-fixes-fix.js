__putout_processor_yaml({
    "name": "Node CI",
    "permissions": {
        "contents": "write"
    },
    "on": ["push", "pull_request"],
    "jobs": {
        "build": {
            "steps": [{
                "name": "Commit fixes",
                "uses": "EndBug/add-and-commit@v10",
                "continue-on-error": true,
                "with": {
                    "message": "chore: ${{ env.NAME }}: actions: lint ☘️"
                }
            }]
        }
    }
});
