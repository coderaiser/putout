const tmp = a[index];

a[index] = a[index - 1];
a[index - 1] = tmp;
