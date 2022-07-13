import type MarkdownIt from 'markdown-it';
import type Renderer from 'markdown-it/lib/renderer';
import type Token from 'markdown-it/lib/token';

export default function titledCode(md: MarkdownIt) {
   function proxy(
      tokens: Token[],
      idx: number,
      options: MarkdownIt.Options,
      env: any,
      slf: Renderer
   ) {
      return slf.renderToken(tokens, idx, options);
   }
   const defaultFenceRenderer = md.renderer.rules.fence || proxy;

   md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
      const token = tokens[idx];
      const title = new RegExp(/(?:title|name|label)=(?:"(.*)"|([^\s]*))/).exec(
         token.info
      );

      if (!title) {
         return defaultFenceRenderer(tokens, idx, options, env, slf);
      } else {
         return [
            `<div class="code-block">`,
            `<div class="code-block--title">${title[1] || title[2]}</div>`,
            defaultFenceRenderer(tokens, idx, options, env, slf),
            `</div>`,
         ].join('\n');
      }
   };
}
