type FsDriver = {
    renameFile: (oldName: string, newName: string) => void;
    removeFile: (name: string) => void;
    copyFile: (from: string, to: string) => void;
    createDirectory: (name: string) => void;
    readFileContent: (name: string) => string;
    writeFileContent: (name: string, content: string) => void;
};

export const renameFile: (oldName: string, newName: string) => void;
export const removeFile: (name: string) => void;
export const copyFile: (from: string, to: string) => void;
export const createDirectory: (name: string) => void;
export const readFileContent: (name: string) => string;
export const writeFileContent: (name: string, content: string) => void;
export const inject: (fsDriver: Partial<FsDriver>) => void;
export const pause: () => void;
export const start: () => void;
export function eject(): void;

