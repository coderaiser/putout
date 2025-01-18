export function equal(a, b) {
    return a.type === b.type && a.value === b.value;
}

function fetchSnippet(snippetID, revisionID = 'latest') {
    return api(`/gist/${snippetID}` + (revisionID ? `/${revisionID}` : ''), {
        method: 'GET',
    });
}

function createDeclare({name, path, outputFile}) {
    return `node scripts/create-declare.mjs ${name} ${path} ${outputFile}`;
}
