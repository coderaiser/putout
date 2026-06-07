# 🚀 I want contribute

> **There is surely nothing other than the single purpose of the present moment. A man's whole life is a succession of moment after moment. There will be nothing else to do, and nothing else to pursue. Live being true to the single purpose of the moment.**
>
> **(c) Yamamoto Tsunetomo "Hagakure"**

That's awesome 👏! Check out [`good first issues`](https://github.com/coderaiser/putout/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22),
most likely you can do some contribution using web interface, otherwise worry not 😏.

Install [bun](https://bun.sh/).
Make fork of a repo, clone it and run:

```
cd putout
bun install --no-save
npm run bootstrap
```

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/coderaiser/putout)

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

- ✅[`noReport()`](https://github.com/coderaiser/putout/tree/master/packages/test#noreportfilename) - when rule has false positive;
- ✅[`transform()`](https://github.com/coderaiser/putout/tree/master/packages/test#transformfilename--output-plugins) - when new case added;

The command `UPDATE=1 npm run test` will generate `fixture` for you, so you need not to worry about it, also `@putout/plugin-putout` will fix test message and other things, so you can also warry not about it 😏. Always remember that all things should be simple and automated: 🐊**Putout** fixes everything, including itself.

## 🤷 How to check if my changes do not break anything?

When your made changes, added coverage and your package is ready for publishing 📦 , run: `npm run fresh`,
in the root of the repository, it will run `lint` and `test` over all `packages`.

## 🤷 How to add a format conversion plugin (e.g., `convert-json-to-yaml`) to `@putout/plugin-filesystem`?

The `@putout/plugin-filesystem` package has an established two-layer pattern for file format conversions (e.g., `json↔yaml`, `json↔js`, `json↔toml`, `toml↔yaml`). When creating a new conversion, follow this checklist:

### 🧱 Two-layer structure

Each conversion plugin has:

1. **Outer plugin** (`lib/convert-X-to-Y/index.js`):
   - Uses `matchFiles()` from `putout`'s `operator` with pattern `__name.X -> __name.Y`
   - Handles file discovery, reading, renaming, and writing

2. **Inner convert sub-plugin** (`lib/convert-X-to-Y/convert/index.js`):
   - Uses AST template placeholders from `@putout/operator-json` (re-exported as `operator.__json`, `operator.__yaml`, etc.)
   - Exports `replace()` mapping one processor wrapper to another (e.g., `[__json]: __yaml`)

### 📁 Files to create

For a plugin named `convert-json-to-yaml`, create all of these:

| #  | File                                                         | Purpose                                                                           |
|----|--------------------------------------------------------------|-----------------------------------------------------------------------------------|
| 1  | `lib/convert-X-to-Y/index.js`                                | Outer `matchFiles` plugin                                                         |
| 2  | `lib/convert-X-to-Y/index.spec.js`                           | Spec for outer plugin                                                             |
| 3  | `lib/convert-X-to-Y/fixture/convert-X-to-Y.js`               | Filesystem fixture input                                                          |
| 4  | `lib/convert-X-to-Y/fixture/convert-X-to-Y-fix.js`           | Filesystem fixture expected output (content is base64-encoded)                    |
| 5  | `lib/convert-X-to-Y/convert/index.js`                        | Inner `replace()` sub-plugin                                                      |
| 6  | `lib/convert-X-to-Y/convert/index.spec.js`                   | Unit test for inner convert                                                       |
| 7  | `lib/convert-X-to-Y/convert/fixture/convert-X-to-Y.js`       | Convert fixture input (raw processor call)                                        |
| 8  | `lib/convert-X-to-Y/convert/fixture/convert-X-to-Y-fix.js`   | Convert fixture expected output                                                   |
| 9  | `test/convert-X-to-Y.js`                                     | Integration test                                                                  |
| 10 | `test/fixture/convert-X-to-Y.js`                             | Integration fixture input                                                         |
| 11 | `test/fixture/convert-X-to-Y-fix.js`                         | Integration fixture expected output                                               |
| 12 | `test/fixture/convert-X-to-Y-disabled.js`                    | Fixture for disabled-rule test                                                    |

### 📝 Files to modify

| #  | File                 | Change                                                                                |
|----|----------------------|---------------------------------------------------------------------------------------|
| 1  | `lib/index.js`       | Import and register rule as `'convert-X-to-Y': ['off', convertXToY]`                  |
| 2  | `test/filesystem.js` | Add a `noTransform('convert-X-to-Y-disabled')` test                                   |
| 3  | `README.md`          | Add to rules list, config example, and documentation section with ❌/✅ examples      |

### 🧪 Testing

```sh
npm run fix:lint   # auto-fix linting issues
npm run coverage   # run tests with coverage (should be 100%)
```

### 💡 Key tips

- **AST placeholders** live in `@putout/operator-json/lib/json.js`: `__json`, `__yaml`, `__toml`, `__docker`, `__filesystem`, `__ignore`.
- **`magicParse`** in `@putout/operator-match-files` handles `.json`, `.yaml`/`.yml`, `.ts`/`.tsx` etc. automatically — no extra processor wiring needed.
- **`magicPrint`** similarly handles printing back to `.json` or `.yaml` — this may need updating when adding a new output format.
- **Base64** content in fix fixtures: the filesystem processor stores file content as base64-encoded strings in fix output.
- **Converter reference patterns**: for quickly creating conversion plugins, reference existing symmetric pairs (e.g., `convert-yaml-to-json` ↔ `convert-json-to-yaml`) — the `replace()` templates simply swap the source and target placeholders.

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
For example [`@putout/plugin-variables`](https://github.com/coderaiser/putout/blob/master/packages/@putout/plugin-variables), [`@putout/cli-ruler`](https://github.com/coderaiser/putout/blob/master/packages/putout/package.json), [`putout`](https://github.com/coderaiser/putout/blob/master/packages/@putout/plugin-cli-ruler) etc...

**Subject text**:

- use imperative, present tense: “change” not “changed” nor “changes”
- don't capitalize first letter
- no dot (.) at the end
  **Message body**:
- just as in <subject> use imperative, present tense: “change” not “changed” nor “changes”
- includes motivation for the change and contrasts with previous
