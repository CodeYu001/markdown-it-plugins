import type MarkdownIt from 'markdown-it';
import type Renderer from 'markdown-it/lib/renderer';
import type Token from 'markdown-it/lib/token';

export default function highlightInlineCode(md: MarkdownIt) {
   function proxy(
      tokens: Token[],
      idx: number,
      options: MarkdownIt.Options,
      env: any,
      slf: Renderer
   ) {
      return slf.renderToken(tokens, idx, options);
   }
   const defaultInlineCodeRenderer = md.renderer.rules.code_inline || proxy;

   const highlighter =
      md.options.highlight ||
      ((code: string, lang: string, attrs: string) =>
         md.utils.escapeHtml(code));

   md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
      const token = tokens[idx];
      const shebang = new RegExp(/^#!([\w-]+)\s+/);

      if (shebang.test(token.content)) {
         const [, lang] = shebang.exec(token.content) || [];
         const highlightedCode = highlighter(
            token.content.replace(shebang, '').trim(),
            lang,
            token.attrs?.toString() || ''
         );
         return [
            `<code class="${md.options.langPrefix}${lang}">`,
            `${highlightedCode}`,
            `</code>`,
         ].join('');
      } else {
         return defaultInlineCodeRenderer(tokens, idx, options, env, slf);
      }
   };
}
