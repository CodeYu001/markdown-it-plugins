"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function titledCode(md) {
    function proxy(tokens, idx, options, env, slf) {
        return slf.renderToken(tokens, idx, options);
    }
    const defaultFenceRenderer = md.renderer.rules.fence || proxy;
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        const title = new RegExp(/(?:title|name|label)=(?:"(.*)"|([^\s]*))/).exec(token.info);
        if (!title) {
            return defaultFenceRenderer(tokens, idx, options, env, slf);
        }
        else {
            return [
                `<div class="code-block">`,
                `<div class="code-block--title">${title[1] || title[2]}</div>`,
                defaultFenceRenderer(tokens, idx, options, env, slf),
                `</div>`,
            ].join('\n');
        }
    };
}
exports.default = titledCode;
//# sourceMappingURL=index.js.map