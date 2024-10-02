function notUsed() {
    const a = [];
    
    const paths = [];
    
    for (const [key, name] of tuples) {}
}

function noBinding() {
    b.push(2);
}

function used() {
    const a = [];
    a.push(3);
    
    return a;
}

function destructured(putoutConfig) {
    const {processors} = putoutConfig;
    processors.push('hello');
}

const collect = ({collector}) => {
    collector.push(propertyPath);
};
