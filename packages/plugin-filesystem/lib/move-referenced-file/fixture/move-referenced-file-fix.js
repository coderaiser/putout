__putout_processor_filesystem({
    "type": "directory",
    "filename": "/",
    "files": [{
        "type": "directory",
        "filename": "/src",
        "files": []
    }, {
        "type": "directory",
        "filename": "/test",
        "files": [{
            "type": "file",
            "filename": "/test/hello.spec.js",
            "content": "aW1wb3J0IGhlbGxvIGZyb20gJy4uL2xpYi9oZWxsby5qcyc7Cg=="
        }]
    }, {
        "type": "directory",
        "filename": "/lib",
        "files": [{
            "type": "file",
            "filename": "/lib/hello.js",
            "content": "export const hello = 5"
        }]
    }]
});
