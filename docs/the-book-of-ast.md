# The book of AST

When I started dealing with **AST** I have a lot problems in understanding basic parts. I read [**ESTree**](https://github.com/estree/estree#readme) standard, I read [**Babel**](https://babeljs.io/docs/en/babel-types#) standard. They are very good! Anyways they put the information in a very hurd to understand for novice way.

So gradually I started admit some logic behind all of this. During development of 🐊**Putout** and especially [@putout/plugin-remove-unused-variables](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables#putoutplugin-remove-unused-variables-), I learned to work with all **AST** nodes. I thought I never finish and quit, but suddenly I covered all of them.

During development of 🎩[**ESCover**](https://github.com/coderaiser/escover#readme) I found out that a lot of nodes can be handled in the similar way, so there is a groups of them. Also it was unexpectedly for me that 14 nodes (with repeating structures in some of them) are enough to make a coverage tool!

With this guide I'm trying to supplement **ESTree** and **Babel** to make things a little bit easier for beginners.

Of course while using 🦎[**PutoutScript**](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#-putoutscript) you don't deal with **AST** directly most of the time.
But for edge cases this information will be useful. Also 🐊[PutoutEditor](https://putout.cloudcmd.io) will help to jump in transformations on the speed of light 😏.
Have fun 🎈!

## Let's the journey begin!

The river of Code is a long pool of code written in water. The best place to swim for 🐊Putout. And when he not solving programming questions from friends, he usually swim or laying in the sun.

Green crocodile has friends, who makes first steps exploring the world of AST:

- 🦏 Rhino likes to eat apples and read code from an apple tree.
- 🦉 Owl likes to fly and read code from clouds.

🐊Putout was in the AST world for a long time, so he got some experience and had a wish to share his knowledge with his friends so they was on the same wave.

In AST world animals like to code, but they does it in a new way. They read others code most of the time and search for a way of transforming one peace of code to another.

For example here is the simplest transformation written in 🦎**PutoutScript**, all animals familiar with:

```sh
__a = __b * __c + __b * __d -> __a = __b * (__c + __d);
```

All it does is switching places of variables, so the code:

```js
animals = '🦉' * '🦏' + '🦉' * '🦛';
```

Will be transformed to:

```js
animals = '🦉' * ('🦏' + '🦛');
```

That was introduction part, and now let's go to the point!
Once upon a time 🐊Putout swim over the river of Code and suddenly...

## MemberExpression

...he was interrupted by writings on the water:

```js
Friends['🐘']; // has computed value '🐘'
Friends.elephant; // has not computed value 'elephant'
```

"Anytime you access a **property** in **object** or **index** of an **array** you using **MemberExpression**", thought the crocodile wagging his tail.

## Identifiers

"Interesting that both **object** with **properties** and **array** with **indexes** can be **Identifiers**, or any other **Expressions**", continued his thought 🐊Putout".

When the crocodile came ashore he saw his friend 🦏Rhino chewing the apples 🍎 and staring at code on the tree 🌳:

```js
const apple = '🍎';
```

"Hi Pal!", Rhino said, "I can't understand the difference between **Identifiers** and **Literals** could you please help me?"

"Hi, Rhino!", answered 🐊Putout, sure! Look

- ✅`apple` - is **Identifier**;
- ✅`'🍎'` - is **StringLiteral**;

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

"Your welcome!", 🐊Putout said and joined in eating apples to his friend.

## ArrayExpression and ArrayPattern

Once the 🦉Owl flied to 🐊Putout when he leying in the sun after lunch.

"Hi greany!", owl said, "I just saw a very strange thing on the cloud! Need you help, it drives me crazy!"

"Hi feathered! Tell me what the deal?", crocodile answered and rolled over to the other side.

```js
const birds = ['🦉'];
const [owl] = birds;
```

"What the difference between this two lines?", 🦉Owl asked.

"First one is **ArrayExpression** with one element that is **StringLiteral** `'🦉'`", started 🐊Putout. "And second one is **ArrayPattern** with one element that is **Identifier** `owl`.

"So pattern always on the left side, and expression on the right side?", the owl asked thoughtfully.

"Exactly! For destructuring we always use patterns", answered 🐊Putout, "same goes to **ObjectExpression** and **ObjectPattern**".

## ObjectExpression and ObjectPattern

Owl scratched her paw on the ground:

```js
const birds = {
    owl: '🦉',
};

const {owl} = birds;
```

And sayed, "Here is the other code I saw in the cloud, is it similar on any kind?"

"Sure!", purred crocodile, "Now `owl` is a `key` of **ObjectProperty** of **ObjectExpression** in the first line, and second line have **ObjectPattern**."

"That's so simple!", Owl said, "Thank you so much 🐊Putout! These notations can be confusing, but you always know how to unravel this tangle"!

"Always welcome!", 🐊Putout said, merrily waving his tail.
