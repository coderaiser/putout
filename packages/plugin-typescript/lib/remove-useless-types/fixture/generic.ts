type oldType<A> = {
    a: A;
    b: string;
};
type newType = oldType<X>;

const x: newType = 5;
