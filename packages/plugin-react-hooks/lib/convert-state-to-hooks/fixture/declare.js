class RecursiveElement extends React.Component {
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
}
