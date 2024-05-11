__putout_processor_filesystem([
    '/',
    ['/App.js', `
        // App.js
        requires: [
           'app.view.List'
        ];
    `],
    ['/AppViewList.js', `
        // AppViewList.js
        app.definitions[ 'app.view.List' ] = {
        }
    `],
]);
