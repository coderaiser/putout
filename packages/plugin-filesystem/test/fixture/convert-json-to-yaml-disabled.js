__putout_processor_filesystem(["/", [
    "/actions.json",
    `
{
    "name": "Node CI",
    "on": {
        "push": {
            "branches": "master"
        }
    }
}
    `
]]);
