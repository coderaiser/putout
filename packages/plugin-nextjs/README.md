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
    "plugins": [
        "nextjs"
    ]
}
```

## Rules

Here is list of rules:

```json
{
    "rules": {
        "nextjs/remove-a-from-link": "on"
    }
}
```

## remove-a-from-link

Next.js 12: `<a>` has to be nested otherwise it's excluded, Next.js 13: `<Link>` always renders `<a>` under the hood.

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/261a315b2f1660be26f27229b9ac62b4/87b0ba6f123ef0fb7aa3e89b5fee33beedea83fe).

### ❌ Example of incorrect code

```jsx
import Link from 'next/link';

<Link href="/about">
    <a>About</a>
</Link>;

```

### ✅ Example of correct code

```jsx
import Link from 'next/link';

<Link href="/about">
  About
</Link>;
```

## License

MIT
