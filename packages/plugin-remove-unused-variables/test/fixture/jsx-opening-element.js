const React = require('react');
const App = require('./App');

export default function Main() {
    const str = 'hello';
    return (
        <App
            message={str}
        />
    );
};

