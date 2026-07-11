export const categories = files
    .filter((name) => name[1] === 'index.js')
    .map(([catName]) => {
        const category = localRequire(`./${catName}/index.js`);
    });

category.parsers = catFiles
     .filter(([parserName]) => !restrictedParserNames.has(parserName))
     .map(([parserName]) => {
         let parser = localRequire(`./${catName}/${parserName}`);
         
         if (parser.__esModule)
             parser = parser.default;
         
         parserByID[parser.id] = parser;
         parser.category = category;
         
         return parser;
     });

