export default function() {
    return promise();
};

 async function promise(a) {
     return Promise.reject(Error('x'));
 }
