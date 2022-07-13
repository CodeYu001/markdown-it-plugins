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
   '```shell showNumbers',
   'some code 2',
   '```',
   '',
   '---',
   '',
   '```shell showLineNumbers',
   'some code 3',
   '```',
   '',
   '---',
   '',
   '```shell show-line-numbers',
   'some code 4',
   '```',
   '',
   '---',
   '',
   '```shell lineNumbers="5"',
   'some code 5',
   '```',
   '',
   '---',
   '',
   '```shell line-numbers=4',
   'some code 6',
   '```',
   '',
   '```shell line-numbers="5" highlight=!5-7,9',
   'some code 7 line 1 (5)',
   'some code 7 line 2 (6)',
   'some code 7 line 3 (7)',
   'some code 7 line 4 (8)',
   'some code 7 line 5 (9)',
   '```',
   '',
   '```shell line-numbers="7" hl=?1-3,5',
   'some code 8 line 1',
   'some code 8 line 2',
   'some code 8 line 3',
   'some code 8 line 4',
   'some code 8 line 5',
   '```',
].join('\n');

const html = md.render(testMarkdown);

const expectedHtml = `<pre><code class="language-shell">some code 1
</code></pre>
<hr>
<pre><code class="language-shell">
<tr class="code-block--line">
<td class="code-block--line-number">1</td>
<td class="code-block--line-content">some code 2</td>
</tr>
</code></pre><hr>
<pre><code class="language-shell">
<tr class="code-block--line">
<td class="code-block--line-number">1</td>
<td class="code-block--line-content">some code 3</td>
</tr>
</code></pre><hr>
<pre><code class="language-shell">
<tr class="code-block--line">
<td class="code-block--line-number">1</td>
<td class="code-block--line-content">some code 4</td>
</tr>
</code></pre><hr>
<pre><code class="language-shell">
<tr class="code-block--line">
<td class="code-block--line-number">5</td>
<td class="code-block--line-content">some code 5</td>
</tr>
</code></pre><hr>
<pre><code class="language-shell">
<tr class="code-block--line">
<td class="code-block--line-number">4</td>
<td class="code-block--line-content">some code 6</td>
</tr>
</code></pre><pre><code class="language-shell">
<tr class="code-block--line highlight">
<td class="code-block--line-number">5</td>
<td class="code-block--line-content">some code 7 line 1 (5)</td>
</tr>
<tr class="code-block--line highlight">
<td class="code-block--line-number">6</td>
<td class="code-block--line-content">some code 7 line 2 (6)</td>
</tr>
<tr class="code-block--line highlight">
<td class="code-block--line-number">7</td>
<td class="code-block--line-content">some code 7 line 3 (7)</td>
</tr>
<tr class="code-block--line">
<td class="code-block--line-number">8</td>
<td class="code-block--line-content">some code 7 line 4 (8)</td>
</tr>
<tr class="code-block--line highlight">
<td class="code-block--line-number">9</td>
<td class="code-block--line-content">some code 7 line 5 (9)</td>
</tr>
</code></pre><pre><code class="language-shell">
<tr class="code-block--line highlight">
<td class="code-block--line-number">7</td>
<td class="code-block--line-content">some code 8 line 1</td>
</tr>
<tr class="code-block--line highlight">
<td class="code-block--line-number">8</td>
<td class="code-block--line-content">some code 8 line 2</td>
</tr>
<tr class="code-block--line highlight">
<td class="code-block--line-number">9</td>
<td class="code-block--line-content">some code 8 line 3</td>
</tr>
<tr class="code-block--line">
<td class="code-block--line-number">10</td>
<td class="code-block--line-content">some code 8 line 4</td>
</tr>
<tr class="code-block--line highlight">
<td class="code-block--line-number">11</td>
<td class="code-block--line-content">some code 8 line 5</td>
</tr>
</code></pre>`;

console.log(html);

if (html !== expectedHtml) {
   throw new Error('Expected HTML did not match actual HTML');
}
