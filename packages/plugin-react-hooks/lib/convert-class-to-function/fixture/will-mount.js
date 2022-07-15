class RecursiveElement extends React.Component {
    name = 'hello';
    constructor(props) {
        super(props);
        
        let {deepOpen} = props;
        let open = shouldAutoFocus(props);
        
        if (props.value && typeof props.value === 'object') {
            if (openValues.has(props.value)) {
                deepOpen = false;
                open = false;
            }
            
            addValue(props.value);
        }
        
        this.state = {
            deepOpen,
            open,
        };
    }
    
    componentWillUnmount() {
        const {value} = this.props;
        
        if (value && typeof value === 'object') {
            removeValue(value);
        }
    }
    
    UNSAFE_componentWillReceiveProps(props) {
        let {deepOpen} = props;
        let open = shouldAutoFocus(props);
        
        if (!this.props.value !== props.value) {
            if (this.props.value && typeof this.props.value === 'object') {
                removeValue(this.props.value);
            }
            
            if (props.value && typeof props.value === 'object') {
                if (openValues.has(props.value)) {
                    deepOpen = false;
                    open = false;
                }
                
                addValue(props.value);
            }
        }
        
        this.setState({deepOpen, open});
    }
    
    render() {
        const {props} = this;
        return (
            <Element
                {...props}
                open={this.state.open}
                deepOpen={this.state.deepOpen}
            />
        );
    }
}
