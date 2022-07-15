class RecursiveElement extends React.Component {
    constructor(props) {
        super(props);
        
        if (props.value && typeof props.value === 'object') {
            deepOpen = false;
            open = false;
        }
    }
    
    render() {
        const {props} = this;
        return (
            <Element
                {...props}
            />
        );
    }
}
