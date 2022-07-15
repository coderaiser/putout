class RecursiveElement extends React.Component {
    render() {
        const {props} = this;
        return (
            <Element
                {...props}
            />
        );
    }
}

