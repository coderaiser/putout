__putout_processor_filesystem([
    '/',
    ['/package.json', `{
        "type": "module"
    }`],
    '/lib/',
    '/lib/tokenize/',
    ['/lib/tokenize/is.jsx', `
        export const isPrev = (path) => {
        function PageJoin({staticContext}) {
            return (
                <AppContainer
                    form="join"
                    title="Join to IOCMD"
                    message={message}
                    link={link}
                    text="Already have an account?"
                    tabIndex="5"
                />
            );
        };
    `],
    '/lib/tokenize/expressions/',
    ['/lib/tokenize/expressions/spread-element.jsx', `
        import AppContainer from '../is.js';
    `],
]);
