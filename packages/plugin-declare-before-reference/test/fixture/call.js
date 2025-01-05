for (const name of names) {
    console.log(run(plugin, name));
}

const run = (plugin, rule) => montag`
    "${plugin}/${rule}": {
        "$ref": "#/definitions/rule"
    },
`;
