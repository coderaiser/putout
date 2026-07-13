# @putout/plugin-nestjs [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-nestjs.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-nestjs "npm"

> Nest is a modern framework designed to build efficient, scalable web applications
>
> (c) [nestjs.com](https://nestjs.com/)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability tosupport nestjs. *Not Bundled*.

## Install

```
npm i putout @putout/plugin-nestjs -D
```

## Rules

- ✅ [declare](#declare);

## Config

```json
{
    "rules": {
        "nestjs/declare": "on"
    },
    "plugin": ["nestjs"]
}
```

## declare

Add Nestjs declaration on top of a file.

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a4f4099e9408fd6315cc1f72dafa2259/6baa344ed7976d92704e564f627abb00aeef6269).

### ❌ Example of incorrect code

```ts
@Injectable()
export class GistService {
    constructor(private readonly githubService: GithubService) {}
    
    load(gistId: string, revisionId?: string) {
        return this.githubService.load(gistId, revisionId);
    }
}
```

### ✅ Example of correct code

```ts
import {Injectable} from '@nestjs/common';

@Injectable()
export class GistService {
    constructor(private readonly githubService: GithubService) {}
    
    load(gistId: string, revisionId?: string) {
        return this.githubService.load(gistId, revisionId);
    }
}
```

## License

MIT
