"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rangesToArray(range) {
    const [start, end] = range.split('-').map((x) => parseInt(x));
    if (!end) {
        return [start];
    }
    else {
        if (end < start) {
            throw new Error(`Invalid range: ${range}`);
        }
        return Array.from({ length: end - start + 1 }).map((_, i) => start + i);
    }
}
function titledCode(md) {
    function proxy(tokens, idx, options, env, slf) {
        return slf.renderToken(tokens, idx, options);
    }
    const defaultFenceRenderer = md.renderer.rules.fence || proxy;
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        const [, showNumbers, start] = new RegExp(/(show-?(?:line)?-?numbers|line-?numbers)(?:="?(\d+)"?)?/, 'i').exec(token.info) || [];
        if (!showNumbers) {
            return defaultFenceRenderer(tokens, idx, options, env, slf);
        }
        else {
            const startIndex = start ? parseInt(start) : 1;
            const rendered = defaultFenceRenderer(tokens, idx, options, env, slf);
            const lines = rendered
                .replace(/<code(.*)>/, '$&\n')
                .split('\n')
                .filter((x) => x.trim().length > 0);
            const [, , modifier, highlightedLinesRaw] = new RegExp(/(highlight|hl)=(!|\?)?([\d,-]+)/, 'i').exec(token.info) || [];
            let highlightOffset = 0;
            if (modifier) {
                if (modifier === '!') {
                    highlightOffset = startIndex - 1;
                }
                else {
                    highlightOffset = 0;
                }
            }
            const highlightedLines = highlightedLinesRaw
                ? highlightedLinesRaw.split(',').flatMap(rangesToArray)
                : [];
            const code = lines.slice(1, -1);
            console.log('lines', lines);
            console.log('code', code);
            console.log('hl', highlightedLines);
            return [
                lines[0],
                ...code.map((line, index) => {
                    const shouldHighlight = highlightedLines.includes(index + 1 + highlightOffset);
                    return [
                        `<tr class="code-block--line${shouldHighlight ? ' highlight' : ''}">`,
                        `<td class="code-block--line-number">${startIndex + index}</td>`,
                        `<td class="code-block--line-content">${line}</td>`,
                        `</tr>`,
                    ].join('\n');
                }),
                lines[lines.length - 1],
            ].join('\n');
        }
    };
}
exports.default = titledCode;
//# sourceMappingURL=index.js.map