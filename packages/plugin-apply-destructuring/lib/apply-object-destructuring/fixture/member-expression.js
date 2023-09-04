const objectA = {
    property: '',
};

const objectB = {
    property: 'foo',
};

const property = objectA.property || objectB.property;

console.log(property); // prints "foo" (the value from objectB)
