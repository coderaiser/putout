import putout from 'putout';

export default async function convertImports(source) {
    const {code} = putout(source, {
        plugins: [
            'remove-nested-blocks',
        ],
    });

    return code;
}
