const run = (plugin, rule) => montag`
    "${plugin}/${rule}": {
        "$ref": "#/definitions/rule"
    },
`;

for (const name of names) {
    console.log(run(plugin, name));
}
