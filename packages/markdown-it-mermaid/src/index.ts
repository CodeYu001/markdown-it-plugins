import type MarkdownIt from 'markdown-it';
import { Options } from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';

export default function mermaid(md: MarkdownIt) {
   function proxy(
      tokens: Token[],
      idx: number,
      options: Options,
      env: any,
      slf: Renderer
   ) {
      return slf.renderToken(tokens, idx, options);
   }

   const defaultFenceRenderer = md.renderer.rules.fence || proxy;

   md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
      const token = tokens[idx];
      if (token.info.startsWith('mermaid')) {
         return `<div class="mermaid">${token.content}</div>`;
      } else {
         return defaultFenceRenderer(tokens, idx, options, env, slf);
      }
   };
}
