"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function highlightInlineCode(md) {
    function proxy(tokens, idx, options, env, slf) {
        return slf.renderToken(tokens, idx, options);
    }
    const defaultInlineCodeRenderer = md.renderer.rules.code_inline || proxy;
    const highlighter = md.options.highlight ||
        ((code, lang, attrs) => md.utils.escapeHtml(code));
    md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        const shebang = new RegExp(/^#!([\w-]+)\s+/);
        if (shebang.test(token.content)) {
            const [, lang] = shebang.exec(token.content) || [];
            const highlightedCode = highlighter(token.content.replace(shebang, '').trim(), lang, token.attrs?.toString() || '');
            return [
                `<code class="${md.options.langPrefix}${lang}">`,
                `${highlightedCode}`,
                `</code>`,
            ].join('');
        }
        else {
            return defaultInlineCodeRenderer(tokens, idx, options, env, slf);
        }
    };
}
exports.default = highlightInlineCode;
//# sourceMappingURL=index.js.map