type oldType = {
    a: number,
    b: string,
};

type newType = oldType;

const x:newType = 5;

fn<newType>(a);
