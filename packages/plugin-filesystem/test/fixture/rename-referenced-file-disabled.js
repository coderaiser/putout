__putout_processor_filesystem({
    "type": "directory",
    "filename": "/",
    "files": [{
        "type": "file",
        "filename": "/hello.spec.js",
        "content": "import hello from './hello.js'"
    }, {
        "type": "file",
        "filename": "/hello.js",
        "content": "export const hello = 5"
    }]
});
