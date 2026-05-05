export const report = () => `Use 'reactTestRenderer' instead of '{createRenderer}'`;

export const replace = () => ({
    'import {createRenderer} from "react-test-renderer/shallow"': `{
        import reactTestRenderer from "react-test-renderer/shallow.js";
        const {createRenderer} = reactTestRenderer
    }`,
});
