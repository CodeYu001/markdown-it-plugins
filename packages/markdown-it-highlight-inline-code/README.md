# @jwevans/markdown-it-highlight-inline-code

## Usage

```
npm i --save @jwevans/markdown-it-highlight-inline-code
```

```typescript
import MarkdownIt from 'markdown-it';
import MarkdownItHighlightInlineCode from '@jwevans/markdown-it-highlight-inline-code';

const md = new MarkdownIt();

md.use(HighlightInlineCode);

md.render(/* Markdown String to Render */)
```

~~~markdown
`#!python range(10)`

--OR--

`#!javascript console.log("Hello World!")`
~~~