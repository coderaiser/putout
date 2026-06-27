export function isSimpleRegExp(regexp: RegExp): boolean;

export function getStringFromRegExp(node: {
    pattern: string;
}): string;

type RegExpTransformer = {
    report: (path?: unknown) => string;
    traverse: (api: {
        push: (path?: unknown) => void;
    }) => Record<string, (path?: unknown) => void>;
    fix: (path?: unknown) => void;
};

export function transformRegExp(str: string, regExpTransformer: RegExpTransformer): [string, {
    message: string;
    position: {
        column: number;
        offset: number;
        line: number;
    };
}[]];

