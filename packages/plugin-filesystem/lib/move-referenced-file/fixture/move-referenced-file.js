__putout_processor_filesystem({
    "type": "directory",
    "filename": "/",
    "files": [{
        "type": "directory",
        "filename": "/src",
        "files": [{
            "type": "file",
            "filename": "/src/hello.js",
            "content": "export const hello = 5"
        }]
    }, {
        "type": "directory",
        "filename": "/test",
        "files": [{
            "type": "file",
            "filename": "/test/hello.spec.js",
            "content": "import hello from '../src/hello.js'"
        }]
    }, {
        "type": "directory",
        "filename": "/lib",
        "files": []
    }]
});