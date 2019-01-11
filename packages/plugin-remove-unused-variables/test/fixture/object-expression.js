const parser = {
    parse(source) {
        return cherow.parse(source, {
            loc: true,
            tokens: false,
        });
    },
};

module.exports = () => ({
    parser,
});

function spreadExample() {
    const spread = {};
    const module = {
        exports: {},
    };
    
    module.exports = {
        ...spread
    };
};

function nestedProperty() {
    const nested = () => {};
    
    return {
        Operation:  {
            nested,
        }
    };
};

function arrayExample() {
    const propertyValue = 1;
    
    const array = [{
        run: propertyValue,
    }];
}

function assignArrayExample() {
    const assignProperty = 1;
    
    module.exports = [{
        run: assignProperty,
    }];
}

