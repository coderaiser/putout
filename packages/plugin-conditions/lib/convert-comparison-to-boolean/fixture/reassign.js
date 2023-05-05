const hello = {
    world: 'abc',
};

hello.world = 'xxx';

if (hello.world === 'abc')
    console.log('ok');
