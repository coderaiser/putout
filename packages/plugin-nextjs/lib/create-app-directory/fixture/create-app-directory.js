// has package.json
__putout_processor_filesystem({
    "type": "directory",
    "filename": "/home/coderaiser/putout",
    "files": [{
        "type": "file",
        "filename": "/home/coderaiser/putout/package.json",
     }]
});


// no package.json
__putout_processor_filesystem({
    "type": "directory",
    "filename": "/home/coderaiser/putout",
    "files": [{
        "type": "file",
        "filename": "/home/coderaiser/putout/README.md",
     }]
});

// has app
__putout_processor_filesystem({
    "type": "directory",
    "filename": "/home/coderaiser/putout",
    "files": [{
        "type": "file",
        "filename": "/home/coderaiser/putout/package.json"
    }, {
        "type": "directory",
        "filename": "/home/coderaiser/putout/app",
        "files": []
    }]
});