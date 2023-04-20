const React = require('react');

class FormLoginContainer extends React.Component {
    constructor() {
        super();
        this.submit = this._submit.bind(this);
    }
    
    submit(event) {
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
