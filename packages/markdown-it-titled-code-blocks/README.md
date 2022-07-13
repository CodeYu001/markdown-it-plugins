# @jwevans/markdown-it-titled-code-blocks

## Usage

```
npm i --save @jwevans/markdown-it-titled-code-blocks
```

```typescript
import MarkdownIt from 'markdown-it';
import MarkdownItTitledCodeBlocks from '@jwevans/markdown-it-titled-code-blocks';

const md = new MarkdownIt();

md.use(MarkdownItTitledCodeBlocks);

md.render(/* Markdown String to Render */)
```

## Examples

~~~markdown
```js title="Example 1"
/* Some JavaScript Code */
```

--OR--

```js name="Example 1"
/* Some JavaScript Code */
```

--OR--

```js label="Example 1"
/* Some JavaScript Code */
```

--OR--

```js title=Example
/* Some JavaScript Code */
```
~~~