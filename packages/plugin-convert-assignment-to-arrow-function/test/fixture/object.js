const segInfoMap = {};

const get = () => {
    const info = segInfoMap[segment.id] = {
        calledInSomePaths: false,
        calledInEveryPaths: false,
        validNodes: []
     };
     
     return info;
}
