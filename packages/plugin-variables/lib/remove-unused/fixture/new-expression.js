const obj = {};
const handler = {};

new Proxy(obj, handler);
new a.Proxy();

const accessToken = 'hello';
new DropBox({
    accessToken,
});

const t = new (function Hello() {
  this.world = '';
})();
