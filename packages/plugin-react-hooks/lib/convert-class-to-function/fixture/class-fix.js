const React = require('react');

function FormLoginContainer(props) {
    function submit(event) {
        event.preventDefault();
    }

    return (
        <FormLogin
            submit={this.submit}
        />
    );
}
