const promise = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});

let resolve1;

const promise1 = new Promise((res, rej) => {
  resolve1 = res;
  reject1 = rej;
});
