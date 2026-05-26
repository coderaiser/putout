__putout_processor_filesystem([
    "/",
    "/test/",
    "/test/server/",
    [
        "/test/server/before.js",
        "CiAgICAgICAgaW1wb3J0IG1vZHVsZXMgZnJvbSAnLi4vLi4nCiAgICA="
    ],
    "/lib/",
    ["/lib/index.js", "CiAgICAgICAgZXhwb3J0IGNvbnN0IGEgPSAzOwogICAg"],
    "/json/",
    [
        "/package.json",
        "{\"main\": \"lib/index.js\"}"
    ]
]);
