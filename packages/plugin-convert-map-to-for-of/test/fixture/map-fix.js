for (const a of list) {
    alert('hello');
};

const a = list.map((a) => {
    alert('hello');
});

list.map((a) => 'hello');

list.map((a) => {
    alert('hello');
    return 5;
});

