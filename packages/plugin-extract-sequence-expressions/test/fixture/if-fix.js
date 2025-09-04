let a = true;

for (const b of c) {
    console.log('two');
    {
        console.log('one');
        
        if (a) {
            console.log('three');
        }
    }
}

a;
b;

if (c)
    console.log('hello, world');
