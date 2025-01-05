for (const name of names) {
    console.log(run(plugin, name));
}

function run(plugin, rule) {
    return montag`
        "${plugin}/${rule}": {
            "$ref": "#/definitions/rule"
        },
    `;
}

function x() {
    for (const name of names) {
        b();
    }

    function b() {
        return c;
    }
}
