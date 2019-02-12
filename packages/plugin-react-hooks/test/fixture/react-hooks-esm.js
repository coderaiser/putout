import React, {Component} from 'react';

module.exports = FormLoginContainer;

class FormLoginContainer extends Component {
  constructor() {
        super();
        
        this.state = {
           loading: false
        };
    }
    
    onClick() {
        this.setState({
            loading: true
        });
    }
    
    render() {
        const {loading} = this.state;
        
        return (
            <FormLogin
                onClick={ onClick }
                loading={ loading }
            />
        );
    }
}

