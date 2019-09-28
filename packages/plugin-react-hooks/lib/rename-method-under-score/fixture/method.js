const React = require('react');

class FormLoginContainer extends React.Component {
    constructor() {
        super();
        this.submit = this._submit.bind(this);
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

