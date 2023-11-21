# @putout/plugin-nextjs [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-nextjs.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-nextjs "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to migrate to latest version of [Next.js](https://beta.nextjs.org/docs/upgrade-guide#migrating-from-pages-to-app). *Not Bundled*.

## Install

```
npm i putout @putout/plugin-nextjs -D
```

Add `.putout.json` with:

```json
{
    "plugins": ["nextjs"]
}
```

## Rules

Here is list of rules:

```json
{
    "rules": {
        "nextjs/create-app-directory": "on",
        "nextjs/remove-a-from-link": "on",
        "nextjs/convert-page-to-head": "on",
        "nextjs/move-404-to-not-found": "on",
        "nextjs/update-tsconfig": "off",
        "nextjs/update-tsconfig-file": "on"
    }
}
```

## remove-a-from-link

Next.js 12: `<a>` has to be nested otherwise it's excluded, Next.js 13: `<Link>` always renders `<a>` under the hood.

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/261a315b2f1660be26f27229b9ac62b4/87b0ba6f123ef0fb7aa3e89b5fee33beedea83fe).

### ❌ Example of incorrect code

```jsx
import Link from 'next/link';

export default function Nav() {
    <Link href="/about">
        <a>
            About
        </a>
    </Link>;
}
```

### ✅ Example of correct code

```jsx
import Link from 'next/link';

export default function Nav() {
    <Link href="/about">
        About
    </Link>;
}
```

## convert-page-to-head

In the pages directory, the next/head React component is used to manage `<head>` HTML elements such as title and meta . In the app directory, `next/head` is replaced with a new `head.js` special file.

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/81a2a85e4550ba4cddc688fef9570f7a/6aa066348a6124a7a6681f46105586acbeb9eb65).

### ❌ Example of incorrect code

```jsx
import Head from 'next/head';

export default function Page() {
    return (
        <>
            <Head>
                <title>
                    My page title
                </title>
            </Head>
        </>
    );
}
```

### ✅ Example of correct code

```jsx
export default function Head() {
    return (
        <>
            <title>
                My page title
            </title>
        </>
    );
}
```

## create-app-directory

> For new applications, we recommend using the **App Router**. This router allows you to use React's latest features and is an evolution of the Pages Router based on community feedback.
>
> (c) [nextjs.org](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/fe8ac935f041f836191cb90aa861d8ac/2f80e09719302e98b661b8c1594b07b039e86863).

```diff
+app/
```

## move-404-to-not-found

> `pages/404.js` has been replaced with the `not-found.js` file.
>
> (c) [nextjs.org](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/9ac3f7f910bc13e48097c7a5411908b9/5e81896d24186364302f8967637e998df7e8b755).

```diff
-app/pages/404.js
+app/not-found.js
```

## update-tsconfig

> If you're using **TypeScript**, you need to update your `tsconfig.json` file with the following changes to make it compatible with Next.js.
>
> (c) [nextjs.org](https://nextjs.org/docs/app/building-your-application/upgrading/from-vite)

Add `./dist/types/**/*.ts` and `./next-env.d.ts` to the include array.

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/a55a6e3dbcd082a5fdddf8591bb605dc/13ae7aa178edc7ff7b792e6ad717af16de9da83a).

`tsconfig.json`:

```diff
{
-    "includes": []
+    "includes": ["./dist/types/**/*.ts", "./next-env.d.ts"]
}
```

The rule disabled by default. To enable use [`update-tsconfig-file`](#update-tsconfig-file) or update `.putout.json` with:

```json
{
    "match": {
        "tsconfig.json": {
            "nexts/update-ts-config": "on"
        }
    },
    "plugins": ["nextjs"]
}
```

## update-tsconfig-file

Enables [`update-tsconfig`](#update-tsconfig) for [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) without using [`match`](https://github.com/coderaiser/putout/tree/v33.9.2#match).

Run [`redlint`](https://github.com/putoutjs/redlint#readme) to generate `.filesystem.json` and then lint.
Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/9ee63542b7a7d70fce8e0739524e5301/74139f2bd98e29dea40c99708f509976201ffb4f).

## License

MIT
