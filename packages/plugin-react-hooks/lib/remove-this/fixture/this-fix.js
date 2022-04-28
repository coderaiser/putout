const React = require('react');

class FormLoginContainer extends React.Component {
    constructor() {
        super();
    }
    
    submit(event) {
        event.preventDefault();
    }
    
    render() {
        return (
            (<FormLogin
                submit={submit}
            />)
        );
    }
}

