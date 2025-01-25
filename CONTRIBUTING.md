# 🚀 I want contribute

> **There is surely nothing other than the single purpose of the present moment. A man's whole life is a succession of moment after moment. There will be nothing else to do, and nothing else to pursue. Live being true to the single purpose of the moment.**
>
> **(c) Yamamoto Tsunetomo "Hagakure"**

That's awesome 👏! Check out [`good first issues`](https://github.com/coderaiser/putout/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22),
most likely you can do some contribution using web interface, otherwise worry not 😏.

Make fork of a repo, clone it and run:

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

You can call them from each package with `npm run` and they will always come 🤙.

## 🤷 How to write tests?

🐊**Putout** is one of projects that have 100% code coverage, it helps a lot, since when code not covered with tests, you have two choices:

- ✅ cover with tests;
- ✅ remove;

That's it! Writing tests is very simple tasks since we have own framework based on 📼[`supertape`](https://github.com/coderaiser/supertape): [`@putout/test`](https://github.com/coderaiser/putout/tree/master/packages/test#putouttest-). We have also [`@putout/plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/plugin-putout#putoutplugin-putout-) with test-based rules, that help you write as little code as possible. So how adding tests looks like?

Let's suppose you want to add test for [`@putout/plugin-remove-unreachable-code`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unreachable-code), you open [`test/remove-unreachable-code.js`](https://github.com/coderaiser/putout/blob/master/packages/plugin-remove-unreachable-code/test/remove-unreachable-code.js) and see a lot of lines that ends up with:

```js
test('plugin-remove-unreachable-code: no report: return-no-arg', (t) => {
    t.noReport('return-no-arg');
    t.end();
});
```

What you need to do is copy this 4 lines, so you have:

```diff
test('plugin-remove-unreachable-code: no report: return-no-arg', (t) => {
    t.noReport('return-no-arg');
    t.end();
});

+test('plugin-remove-unreachable-code: no report: return-no-arg', (t) => {
+    t.noReport('return-no-arg');
+    t.end();
+});
```

Then you add `fixture` named `fixture/return-with-some-of-your-case` (try to add name that mirrors the problem) and change argument of `noReport`:

```diff
test('plugin-remove-unreachable-code: no report: return-no-arg', (t) => {
    t.noReport('return-no-arg');
    t.end();
});

test('plugin-remove-unreachable-code: no report: return-no-arg', (t) => {
-   t.noReport('return-no-arg');
+   t.noReport('return-with-some-of-your-case');
    t.end();
});
```

Then you write in terminal:

```sh
$ cat > fixture/return-with-some-of-your-case.js
if (a) {
  return 'some of your case';
}
^c
$ UPDATE=1 npm run fix:lint && npm test
```

This command will fix test for you and generate fixture. Most likely you will need two types of tests:
- ✅[`noReport()`](https://github.com/coderaiser/putout/tree/master/packages/test#noreportfilename) - when rule has false possitive;
- ✅[`transform()`](https://github.com/coderaiser/putout/tree/master/packages/test#transformfilename--output-plugins) - when new case added;

The command `UPDATE=1 npm run test` will generate `fixture` for you, so you need not to worry about it, also `@putout/plugin-putout` will fix test message and other things, so you can also warry not about it 😏. Always remember that all things should be simple and automated: 🐊**Putout** fixes everything, including itself.

## 🤷 How to check if my changes do not break anything?

When your made changes, added coverage and your package is ready for publishing 📦 , run: `npm run fresh`,
in the root of the repository, it will run `lint` and `test` over all `packages`.

## 🤷 What if I'm adding new plugin?

When adding new plugin, add it to [`package.json`](https://github.com/coderaiser/putout/blob/master/packages/putout/package.json) and [`putout.json`](https://github.com/coderaiser/putout/blob/master/packages/putout/putout.json).
Update [`Built-in Transformations`](https://github.com/coderaiser/putout#built-in-transformations) and [`Plugins`](https://github.com/coderaiser/putout#plugins-1).

## 🤷 How to name commit?

Format of the commit message: **type: scope: subject**

**Type**:

- [`feature: scope: subject`](https://github.com/coderaiser/putout/commit/6155a9b8f8b44675f1956db94e3f65a202648d38)
- [`fix: scope: subject`](https://github.com/coderaiser/putout/commit/cccea1f51230bbe663cf386e407f67d0bf32a9ee)
- [`docs: scope: subject`](https://github.com/coderaiser/putout/commit/bf0ee7cae8e1ab38befc8b4586aa750b34483078)
- [`refactor: scope: subject`](https://github.com/coderaiser/putout/commit/0bd6c3400f79e70307161d95580317c1f6d63c41)
- [`test: scope: subject`](https://github.com/coderaiser/putout/issues/82)
- [`chore: scope: subject`](https://github.com/coderaiser/putout/commit/202810ae7debf78b30770cf0cb5d3cdefa83c7ec)

**Scope**:
Scope could be anything specifying place of the commit change.
For example [`@putout/plugin-remove-unused-variables`](https://github.com/coderaiser/putout/blob/master/packages/putout/package.json), [`@putout/cli-ruler`](https://github.com/coderaiser/putout/blob/master/packages/putout/package.json), [`putout`](https://github.com/coderaiser/putout/blob/master/packages/putout/) etc...

**Subject text**:

- use imperative, present tense: “change” not “changed” nor “changes”
- don't capitalize first letter
- no dot (.) at the end
  **Message body**:
- just as in <subject> use imperative, present tense: “change” not “changed” nor “changes”
- includes motivation for the change and contrasts with previous
