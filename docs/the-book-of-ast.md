# The book of AST

When I started dealing with **AST** I have a lot problems in understanding basic parts. I read [**ESTree**](https://github.com/estree/estree#readme) standard, I read [**Babel**](https://babeljs.io/docs/en/babel-types#) standard. They are very good! Anyways they put the information in a very hurd to understand for novice way.

So gradually I started admit some logic behind all of this. During development of 🐊**Putout** and [@putout/plugin-remove-unused-variables](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables#putoutplugin-remove-unused-variables-), I learned to work with all **AST** nodes. I thought I never finish and quit, but suddenly I covered all of them.

During development of 🎩[**ESCover**](https://github.com/coderaiser/escover#readme) I found out that a lot of nodes can be handled in the similar way, so there is a groups of them. Also it was unexpectedly for me that half a dozen nodes (with repeating structures in some of them) are enough to make a coverage tool!

With this guide I'm trying to supplement **ESTree** and **Babel** to make things a little bit easier for beginners.

Of course while using 🦎[**PutoutScript**](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#-putoutscript) you don't deal with **AST** directly most of the time.
But for edge cases this information will help you. Also 🐊[PutoutEditor](https://putout.cloudcmd.io) will help to jump in transformations on the speed of light 😏.
Have fun 🎈!

## Let's the journey begin!

Once upon a time 🐊**Putout** swim over the river of Code and suddenly...

## MemberExpression

...he was interrupted by writings on the water:

```js
Friends['🐘']; // has computed value '🐘'
Friends.elephant; // has not computed value 'elephant'
```

"Anytime you access a **property** in **object** or **index** of an **array** you using **MemberExpression**, thought the crocodile wagging his tail.

## Identifiers

"Interesting that both **object** and **property**, **array** and **index** can be **Identifier**, or any other **Expressions**", continued his thought 🐊**Putout**".

When the crocodile came ashore he saw his friend 🦏Rhino chewing the apples 🍎 and looking at code on the tree 🌳:

```js
const apple = '🍎';
```

"Hi Pal!", Rhino said, "I can't understand the difference between **Identifiers** and **Literals** could you please help me?"

"Hi, Rhino!", answered 🐊**Putout**, sure! Look

- ✅`apple` - is **Identifier**
- ✅`'🍎'` - is **StringLiteral**

But the most interesting thing is **const**, because it is a **Statement**, and other parts of this code is **Expressions**".

## Expressions and Statements

"**Expressions** and **Statements** it's like an apples 🍎 and a tree 🌳", 🐊**Putout** said to his
friend.

```js
if (fruit === '🍎') // 🌳(🍎)
    eat('🍎'); // 🦏 ❤️ 🍎
```

"An apple can grow on a branch, but branch canno grow on apple, the same goes to **Expressions** and **Statements**", continued 🐊**Putout**.

"I like red apples", Rhino answered champing apples, "And now I understand the difference! Thank's a lot!"

"Your welcome!", 🐊**Putout** said and joined in eating apples to his friend.

## ArrayExpression and ArrayPattern

Once the 🦉Owl flied to 🐊**Putout** when he leying in the sun after lunch.

"Hi greany!", owl said, "I just saw a very strange thing on the cloud! Need you help, it drives me crazy!"

"Hi feathered! Tell me what the deal?", crocodile answered rolled over to the other side.

```js
const birds = ['🦉'];
const [owl] = birds;
```

"What the difference between this two lines?", owl asked.

"First one is **ArrayExpression** with one element that is **StringLiteral** `'🦉'`", started 🐊**Putout**. "And second one is **ArrayPattern** with one element that is **Identifier** `owl`.

"So pattern always on the left side, and expression on the right side?", the owl asked thoughtfully.

"Exactly! For destructuring we always use patterns", answered 🐊**Putout**, "Same goes to **ObjectExpression** and **ObjectPattern**".

## ObjectExpression and ObjectPattern

Owl scratched her paw on the ground:

```js
const birds = {
    owl: '🦉',
};

const {owl} = birds;
```

And sayed, this is the other code I saw in the cloud, is it similar on any kind?"

"Sure!", purred crocodile, "Now `owl` is a `key` of **ObjectProperty** of **ObjectExpression** in the first line, and second line have **ObjectPattern**."

"That's so simple!", Owl said, "Thank you so much 🐊Putout! These notations can be confusing, but you always know how to unravel this tangle"!

"Always welcome!", **🐊Putout** said, merrily waving his tail.
