__putout_processor_json({
    "bin": {
        "c8": "bin/c8.js"
    }
});

// no bin
__putout_processor_json({});
// bin not object
__putout_processor_json({
    "bin": []
});
