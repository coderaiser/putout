const INSTRUCTIONS = ['add'];

export const report = (path) => {
    const {id, object} = path.node;
    return `Apply nesting for '${object}.${id}'`;
};

export const fix = (path) => {
    const body = getBody(path);
    const index = body.indexOf(path.node);
    
    path.node.args = getArgs(path);
    body.splice(index - 2, 2);
};

export const traverse = ({push}) => ({
    Instr(path) {
        const {id, args} = path.node;
        
        if (args.length)
            return;
        
        const prev = getPrevSibling(path);
        
        if (INSTRUCTIONS.includes(prev.id))
            return;
        
        if (INSTRUCTIONS.includes(id))
            push(path);
    },
});

function getArgs(path) {
    const first = getPrevSibling(path, 1);
    const second = getPrevSibling(path, 2);
    
    return [first, second];
}

function getPrevSibling(path, index = 1) {
    const body = getBody(path);
    const currentIndex = body.indexOf(path.node);
    
    return body[currentIndex - index];
}

const getBody = ({parentPath, parentKey}) => parentPath.node[parentKey];
