const React = require('react');

class FormLoginContainer extends React.Component {
    constructor() {
        super();
    }
    
    _submit(event) {
        event.preventDefault();
    }
    
    render() {
        return (
            <FormLogin
                submit={this.submit}
            />
        );
    }
}
