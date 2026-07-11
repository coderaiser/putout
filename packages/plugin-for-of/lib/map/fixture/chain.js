export const categories = files
    .filter((name) => name[1] === 'index.js')
    .map(([catName]) => {
        const category = localRequire(`./${catName}/index.js`);
    });

