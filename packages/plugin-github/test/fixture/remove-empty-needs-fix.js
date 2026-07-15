__putout_processor_yaml({
    "jobs": {
        "deploy-test": {
            "runs-on": "ubuntu-latest"
        }
    }
});

__putout_processor_yaml({
    "jobs": {
        "deploy-test": {
            "runs-on": "ubuntu-latest"
        }
    }
});

__putout_processor_yaml({
    "jobs": {
        "deploy-test": {
            "runs-on": "ubuntu-latest",
            "needs": ["hello"]
        }
    }
});
