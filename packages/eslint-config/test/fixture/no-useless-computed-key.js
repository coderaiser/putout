export const replace = {
    ['section("@select", select(__args))']: ({__args}, path) => {
        __args.unshift('id');
        return path;
    },
};
