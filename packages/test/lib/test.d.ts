import {Test as Supertape} from 'supertape';

export type Test = Supertape & {
    report: (fileName: string, message: string) => void,
    transform: (fileName: string) => void,
    end: () => void,
}

function test(message: string, fn: (t: Test) => void): void;¬

export default function createTest(dir: string, plugin: object, rules?: object): test;
