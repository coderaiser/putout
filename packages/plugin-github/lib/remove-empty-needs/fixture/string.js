__putout_processor_yaml({
    "jobs": {
        "deploy-test": {
            "runs-on": "ubuntu-latest",
            "needs": 'build-and-push'
        }
    }
});
