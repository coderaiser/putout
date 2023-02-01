let a = 0;
const fn = currify(() => {
  for (const b of list)
    a += b;
});

const fn2 = currify(() => {
  for (const [i, b] of list.entries())
    a += i;
});

