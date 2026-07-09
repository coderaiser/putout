const options = {
    nearby: true,
};

export const declare = () => ({
    indent: ['const {indent} = printer', options],
    print: ['const {print} = printer', options],
    write: ['const {write} = printer', options],
    traverse: ['const {traverse} = printer', options],
    maybe: ['const {maybe} = printer', options],
});
