# @jwevans/markdown-it-code-block-line-numbers

## Usage

```
npm i --save @jwevans/markdown-it-code-block-line-numbers
```

```typescript
import MarkdownIt from 'markdown-it';
import MarkdownItCodeBlockLineNumbers from '@jwevans/markdown-it-code-block-line-numbers';

const md = new MarkdownIt();

md.use(MarkdownItCodeBlockLineNumbers);

md.render(/* Markdown String to Render */)
```

Enable using the modifiers after the language name:
`showNumbers`, `showLineNumbers`, `show-numbers`, `show-line-numbers`, `lineNumbers`, or `line-numbers`.

Add an `="5"` after the modifier to set the starting line number to `5`.

Enable highlighting of the lines using the `highlight` or `h1` modifiers. With `=RANGES` after or add `=!RANGES` to specify the numbers starting at the given start index. Use `=?RANGES` to explicitly start the highlighting numbers at `1`. `RANGES` are specified like `1-5,7,9,12-15`. If the start of the range is less than the end of the range, an error is throw.

## Examples

~~~markdown
```js showNumbers
/* Some JavaScript Code */
```

--OR--

```js showLineNumbers
/* Some JavaScript Code */
```

--OR--

```js show-numbers
/* Some JavaScript Code */
```

--OR--

```js show-line-numbers
/* Some JavaScript Code */
```

--OR--

Starts Numbering at 5
```js show-line-numbers="5"
/* Some JavaScript Code */
```

--OR--

Starts Numbering at 5
```js show-line-numbers=5
/* Some JavaScript Code */
```

--OR--

Starts Numbering at 5 and highlights the first 3 lines and the last line
```js show-line-numbers="5" hl=?1-3,5
/* Five Lines of JavaScript Code */
```

--OR--

Starts Numbering at 5 and highlights the first 3 lines and the last line
```js show-line-numbers="5" hl=!5-7,9
/* Five Lines of JavaScript Code */
```
~~~
