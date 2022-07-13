const MarkdownIt = require('markdown-it');
const plugin = require('..').default;

const md = new MarkdownIt();

md.use(plugin);

const testMarkdown = [
   '`#!python range(10)`',
   '`#!js console.log("Hello World")`',
].join('\n');

const html = md.render(testMarkdown);

const expectedHtml = `<p><code class="language-python">range(10)</code>
<code class="language-js">console.log(&quot;Hello World&quot;)</code></p>
`;

console.log(html);

if (html !== expectedHtml) {
   throw new Error('Expected HTML did not match actual HTML');
}
