import traverse, {
    Visitor,
    Node,
    NodePath,
} from '@babel/traverse';

interface Plugin {
    report: () => string;
    fix: () => void;
    filter?: () => boolean;
    include?: () => string[];
    exclude?: () => string[];
}

type Vars = {
    [index: string]: Node
}

type ReplacerReturn = {
    [index: string]: string | ((vars: Vars, path: NodePath) => string | Node | NodePath)
}

type MatchReturn = {
    [index: string]: (vars: Vars, path: NodePath) => boolean
}

export type Replacer = Pick<Plugin, 'report'> & {
    replace: () => ReplacerReturn;
    match?: () => MatchReturn;
}

type PushParams = {
    path: NodePath,
    [index: string]: unknown
};

type Push = (path: NodePath | PushParams) => void;

type TraverseParams = {
    push: Push,
};

type TraverseFn = ({push}: TraverseParams) => Visitor;

export type Traverser = Pick<Plugin, 'report' | 'fix' | 'include' | 'exclude'| 'filter'> & {
    traverse: TraverseFn
}

type Places = object[];

interface FindParams {
    traverse: typeof traverse;
    push: Push;
}

type Find = (ast: object, {traverse, push}: FindParams) => void | Places;

export type Finder = Pick<Plugin, 'report' | 'fix' | 'include' | 'exclude'| 'filter'> & {
    find: Find,
};

export type Includer = Pick<Plugin, 'report' | 'fix' | 'include'> & Pick<Plugin, 'exclude'| 'filter'>;

