# 🚀 I want contribute

That's awesome 👏! Make fork of a repo, clone it and run:

```
cd putout
npm install
npm run bootstrap
```

No matter what `package` you are interested in, you always have 4 little friends:
- 🦊 `lint`
- 🐺 `fix:lint`
- 🦏 `test`
- 🦛 `coverage`

You can call them from each package with `npm run` and they always come 🤙.

## 🤷 How to check if my changes do not break anything?
When your made changes, added coverage and your package is ready for publishing 📦 , run: `npm run fresh`,
in the root of the repository, it will run `lint` and `test` over all `packages`.

## 🤷 What if I'm adding new plugin?
When adding new plugin, add it to [`package.json`](https://github.com/coderaiser/putout/blob/master/packages/putout/package.json) and [`putout.json`](https://github.com/coderaiser/putout/blob/master/packages/putout/putout.json).
Update [`Built-in Transformations`](https://github.com/coderaiser/putout#built-in-transformations) and [`Plugins`](https://github.com/coderaiser/putout#plugins-1).

## 🤷 How to name commit?
Format of the commit message: **type(scope) subject**

**Type**:
- [`feature(scope) subject`](https://github.com/coderaiser/putout/commit/6155a9b8f8b44675f1956db94e3f65a202648d38)
- [`fix(scope) subject`](https://github.com/coderaiser/putout/commit/cccea1f51230bbe663cf386e407f67d0bf32a9ee)
- [`docs(scope) subject`](https://github.com/coderaiser/putout/commit/bf0ee7cae8e1ab38befc8b4586aa750b34483078)
- [`refactor(scope) subject`](https://github.com/coderaiser/putout/commit/0bd6c3400f79e70307161d95580317c1f6d63c41)
- [`test(scope) subject`](https://github.com/coderaiser/putout/issues/82)
- [`chore(scope) subject`](https://github.com/coderaiser/putout/commit/202810ae7debf78b30770cf0cb5d3cdefa83c7ec)

**Scope**:
Scope could be anything specifying place of the commit change.
For example [`@plugin-remove-unused-variables`](https://github.com/coderaiser/putout/blob/master/packages/putout/package.json), [`@putout/cli-ruler`](https://github.com/coderaiser/putout/blob/master/packages/putout/package.json), [`putout`](https://github.com/coderaiser/putout/blob/master/packages/putout/) etc...

**Subject text**:
- use imperative, present tense: “change” not “changed” nor “changes”
- don't capitalize first letter
- no dot (.) at the end
**Message body**:
- just as in <subject> use imperative, present tense: “change” not “changed” nor “changes”
- includes motivation for the change and contrasts with previous 
