# 🪬 Core Concepts

>  **A game of chess, is like a sword fight. You must think first, before you move.**
>
> (c) [Shaolin and Wu Tang](https://www.whosampled.com/movie/Shaolin-and-Wu-Tang/A-Game-of-Chess-Is-Like-a-Sword-Fight-(English-Version)/)


This page contains a high-level overview of some of the core concepts of 🐊**Putout**.

## What is 🐊Putout?

🐊**Putout** is a configurable linter and declarative code transformer. It helps you find and fix problems in your:
 
- ✅ JSX;
- ✅ TypeScript;
- ✅ Flow;
- ✅ Yaml;
- ✅ Markdown;
- ✅ JSON;
- ✅ Ignore;

[Processors](https://github.com/coderaiser/putout#-processors) makes this transforms possible.
Problems can be anything from [potential runtime bugs, to not following best practices](https://github.com/coderaiser/putout#-built-in-transformations) or [styling issues](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#readme).

## What logo means?

![putout](https://github.com/coderaiser/putout/blob/master/images/putout-logo.svg).

Crocodile is dengerous beast that can make drastic changes to environment it lives in. 
Balk signifies borders that makes crocodile act in a predictable way. Tamed beast can be a good friend 😏.

 ## Rules

 Rules are the core building block of 🐊**Putout** that makes code transformation. A rule validates if your code meets a certain expectation, and what to do if it does not meet that expectation. Rules can also contain additional configuration options specific to that rule.

 For example, the [`apply-array-at`](https://github.com/coderaiser/putout/tree/master/packages/plugin-apply-array-at#readme) rule lets you specify whether or not to use [`array.at()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at).
 You can set the rule to always require `array.at()`.

 🐊**Putout** contains hundreds of [built-in transformations](https://github.com/coderaiser/putout#-built-in-transformations) that you can use. You can also create custom rules or use rules that others have created with [plugins](#plugins).

 ## Configuration Files

 An 🐊**Putout** configuration file is a place where you put the configuration for 🐊**Putout** in your project. You can include [built-in rules](https://github.com/coderaiser/putout#-built-in-transformations), how you want them enforced, plugins with custom rules,
 which files you want rules to apply to, and more.

 For more information, refer to [Configuration]([./configuring/configuration-files](https://github.com/coderaiser/putout#-configuration)).

 ## Plugins

 An 🐊**Putout** plugin is an npm module that can contain a set of 🐊**Putout** rules. Often plugins include custom [rules](#rules).

For more information, refer to [Plugins API](https://github.com/coderaiser/putout#-plugins-api).

 ## Custom Processors

 An 🐊**Putout** [processor](https://github.com/coderaiser/putout#-processors) extracts JavaScript code from other kinds of files, then lets 🐊**Putout** lint the JavaScript code. Alternatively, you can use a processor to manipulate JavaScript code before parsing it with 🐊**Putout**.

 For example, [`@putout/processor-markdown`](https://github.com/coderaiser/putout/blob/master/packages/processor-markdown#readme) contains a custom processor that lets you lint JavaScript code inside of Markdown code blocks.

 ## Formatters

 An 🐊**Putout** formatter controls the appearance of the linting results in the CLI.

 For more information, refer to [Formatters](https://github.com/coderaiser/putout#-formatters).
