const md = require('markdown-it')();

const admonitions = require('../packages/markdown-it-admonitions').default;
const lineNumbers = require('../packages/markdown-it-code-block-line-numbers').default;
const highlightInline = require('../packages/markdown-it-highlight-inline-code').default;
const mermaid = require('../packages/markdown-it-mermaid').default;
const titledCodeBlock = require('../packages/markdown-it-titled-code-blocks').default;

md.use(admonitions).use(lineNumbers).use(highlightInline).use(mermaid).use(titledCodeBlock);

const markdownString = [
'```mermaid',
'flowchart LR',
'A o--o B',
'B <--> C',
'C x--x D',
'```',
'',
'```python',
'range(10)',
'```',
'',
'```js show-line-numbers',
'console.log("Hello World")',
'another line',
'```',
'',
'```js show-line-numbers hl=1',
'console.log("Hello World")',
'another line',
'```',
'',
'```js show-line-numbers hl=1 title="Hello World"',
'console.log("Hello World")',
'another line',
'```',
'',
'```mermaid show-line-numbers title="Hello World"',
'flowchart LR',
'A o--o B',
'B <--> C',
'C x--x D',
'```',
'',
'`#!python range(10)`',
'',
'!!!note "Hello World"',
'Inside an admonition block',
'!!!',
'',
'!!!note "Hello World"',
'Inside an admonition block',
'!!!danger',
'Inside nested admonition blocks',
'!!!',
'',
'!!!',
'',
].join('\n');

const html = md.render(markdownString);

console.log(html);