const React = require('react');
const {Component} = React;

module.exports = FormLoginContainer;

class FormLoginContainer extends Component {
    constructor() {
        super();
        const [loading, setLoading] = useState(false);
    }
    
    onClick() {
        setLoading(true);
    }
    
    render() {
        return (
            <FormLogin
                onClick={onClick}
                loading={loading}
            />
        );
    }
}
