const MarkdownIt = require('markdown-it');
const plugin = require('..').default;

const md = new MarkdownIt();

md.use(plugin);

const testMarkdown = [
   '',
   '!!! warning',
   '',
   'This is a warning',
   '',
   '!!!',
   '',
   '!!! note "With a Title"',
   '',
   'This is a note',
   '',
   '!!!',
   '',
   '!!! tip With Another Title',
   '',
   'This is a tip',
   '',
   '!!!',
].join('\n');

const html = md.render(testMarkdown);

const expectedHtml = `<div  class="admonition admonition-warning"><p>This is a warning</p>
</div><div  class="admonition admonition-note"><div class="admonition-title">With a Title</div><p>This is a note</p>
</div><div  class="admonition admonition-tip"><div class="admonition-title">With Another Title</div><p>This is a tip</p>
</div>`;

console.log(html);

if (html !== expectedHtml) {
   throw new Error('Expected HTML did not match actual HTML');
}
