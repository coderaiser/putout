class RecursiveElementextends extends React.Component {
    render() {
        const {props} = this;
        
        return (
            <Element
                {...props}
            />
        );
    }
}
