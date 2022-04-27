__putout_processor_json({
    "language": "node_js",
    "node_js": [
        16,
        18
    ],
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
    "sudo": false,
    "cache": {
        "npm": true
    }
});
