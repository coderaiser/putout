type oldType = {
    a: number,
    b: string,
};

type newType = oldType<X>;

const x:newType = 5;
