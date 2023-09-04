__putout_processor_json({
    "language": "node_js",
    "script": [
        "npm run lint",
        "npm run coverage",
        "npm run report"
    ],
    "notifications": {
        "email": {
            "on_success": "never",
            "on_failure": "change"
        }
    },
    "sudo": false
});
