const MarkdownIt = require('markdown-it');
const plugin = require('..').default;

const md = new MarkdownIt();

md.use(plugin);

const testMarkdown = [
   '```shell',
   'some code 1',
   '```',
   '',
   '---',
   '',
   '```shell title="Some Title"',
   'some code 2',
   '```',
   '',
   '---',
   '',
   '```shell name="Some Name"',
   'some code 3',
   '```',
   '',
   '---',
   '',
   '```shell label="Some Label"',
   'some code 4',
   '```',
   '',
   '---',
   '',
   '```shell label="Some Label" title="Some Title"',
   'some code 5',
   '```',
   '',
   '---',
   '',
   '```shell title=Title',
   'some code 6',
   '```',
].join('\n');

const html = md.render(testMarkdown);

const expectedHtml = `<pre><code class="language-shell">some code 1
</code></pre>
<hr>
<div class="code-block">
<div class="code-block--title">Some Title</div>
<pre><code class="language-shell">some code 2
</code></pre>

</div><hr>
<div class="code-block">
<div class="code-block--title">Some Name</div>
<pre><code class="language-shell">some code 3
</code></pre>

</div><hr>
<div class="code-block">
<div class="code-block--title">Some Label</div>
<pre><code class="language-shell">some code 4
</code></pre>

</div><hr>
<div class="code-block">
<div class="code-block--title">Some Label" title="Some Title</div>
<pre><code class="language-shell">some code 5
</code></pre>

</div><hr>
<div class="code-block">
<div class="code-block--title">Title</div>
<pre><code class="language-shell">some code 6
</code></pre>

</div>`;

console.log(html);

if (html !== expectedHtml) {
   throw new Error('Expected HTML did not match actual HTML');
}
