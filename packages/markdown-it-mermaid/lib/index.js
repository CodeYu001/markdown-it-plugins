"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mermaid(md) {
    function proxy(tokens, idx, options, env, slf) {
        return slf.renderToken(tokens, idx, options);
    }
    const defaultFenceRenderer = md.renderer.rules.fence || proxy;
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        if (token.info.startsWith('mermaid')) {
            return `<div class="mermaid">${token.content}</div>`;
        }
        else {
            return defaultFenceRenderer(tokens, idx, options, env, slf);
        }
    };
}
exports.default = mermaid;
//# sourceMappingURL=index.js.map