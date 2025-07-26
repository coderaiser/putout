declare namespace MaybeIndent {
    type inc = (condition: boolean) => void;
    type dec = (condition: boolean) => void;
    
    export {
        inc,
        dec,
    };
}

