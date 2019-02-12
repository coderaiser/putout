const React = require('react');
const {Component} = React;

module.exports = FormLoginContainer;

class FormLoginContainer extends Component {
  constructor() {
        super();
        
        this.state = {
           loading: false
        };
        
        this.onClick = this._onClick.bind(this);
    }
    
    _onClick() {
        this.setState({
            loading: true
        });
    }
    
    render() {
        const {loading} = this.state;
        
        return (
            <FormLogin
                onClick={ this.onClick }
                loading={ loading }
            />
        );
    }
}

