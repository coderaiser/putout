# Putout

Run 🐊[**Putout**](https://github.com/coderaiser/putout#built-in-transforms) rules from [**ESLint**](https://eslint.org/).

And can be [configured](https://eslint.org/docs/user-guide/configuring#configuring-rules) according to [**Putout** configuration](https://github.com/coderaiser/putout#configuration).

For example, if you want to disable the rule [remove-unused-variables](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables) you can use:

```json
{
    "rules": {
        "putout/putout": ["error", {
            "rules": {
                "remove-unused-variables": "off"
            }
        }]
    }
}
```
