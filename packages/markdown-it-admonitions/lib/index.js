"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Types are from: https://github.com/squidfunk/mkdocs-material
 * Licensed under the MIT License.
 */
const types = [
    'note',
    'abstract',
    'summary',
    'tldr',
    'info',
    'todo',
    'tip',
    'hint',
    'important',
    'success',
    'check',
    'done',
    'question',
    'help',
    'faq',
    'warning',
    'caution',
    'attention',
    'failure',
    'fail',
    'missing',
    'danger',
    'error',
    'bug',
    'example',
    'quote',
    'cite',
].join('|');
const regex = new RegExp(`^\\s*(${types})\\s+(.*)\\s*$`, 'gi');
/*
 * Taken from markdown-it-container
 * https://github.com/markdown-it/markdown-it-container
 * Licensed under the MIT license (https://github.com/markdown-it/markdown-it-container/blob/master/LICENSE)
 */
const min_markers = 3;
const marker_str = '!';
const marker_char = marker_str.charCodeAt(0);
const marker_len = marker_str.length;
function validate(params, markup) {
    return (params
        .trim()
        .split(/\s+/)[0]
        .match(new RegExp(`^(${types})$`, 'gi')) !== null);
}
function admonition(md) {
    md.block.ruler.before('fence', 'admonition', (state, startLine, endLine, silent) => {
        var pos, nextLine, marker_count, markup, params, token, old_parent, old_line_max, auto_closed = false, start = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
        if (marker_char !== state.src.charCodeAt(start)) {
            return false;
        }
        for (pos = start + 1; pos <= max; pos++) {
            if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
                break;
            }
        }
        marker_count = Math.floor((pos - start) / marker_len);
        if (marker_count < min_markers) {
            return false;
        }
        pos -= (pos - start) % marker_len;
        markup = state.src.slice(start, pos);
        params = state.src.slice(pos, max);
        if (!validate(params, markup)) {
            return false;
        }
        if (silent) {
            return true;
        }
        // Search for the end of the block
        //
        nextLine = startLine;
        for (;;) {
            nextLine++;
            if (nextLine >= endLine) {
                // unclosed block should be autoclosed by end of document.
                // also block seems to be autoclosed by end of parent
                break;
            }
            start = state.bMarks[nextLine] + state.tShift[nextLine];
            max = state.eMarks[nextLine];
            if (start < max && state.sCount[nextLine] < state.blkIndent) {
                // non-empty line with negative indent should stop the list:
                // - ```
                //  test
                break;
            }
            if (marker_char !== state.src.charCodeAt(start)) {
                continue;
            }
            if (state.sCount[nextLine] - state.blkIndent >= 4) {
                // closing fence should be indented less than 4 spaces
                continue;
            }
            for (pos = start + 1; pos <= max; pos++) {
                if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
                    break;
                }
            }
            // closing code fence must be at least as long as the opening one
            if (Math.floor((pos - start) / marker_len) < marker_count) {
                continue;
            }
            // make sure tail has spaces only
            pos -= (pos - start) % marker_len;
            pos = state.skipSpaces(pos);
            if (pos < max) {
                continue;
            }
            // found!
            auto_closed = true;
            break;
        }
        old_parent = state.parentType;
        old_line_max = state.lineMax;
        // this will prevent lazy continuations from ever going past our end marker
        state.lineMax = nextLine;
        token = state.push('admonition_open', 'div', 1);
        token.attrJoin('class', 'admonition');
        token.markup = markup;
        token.block = true;
        token.info = params;
        token.map = [startLine, nextLine];
        state.md.block.tokenize(state, startLine + 1, nextLine);
        token = state.push('admonition_close', 'div', -1);
        token.markup = state.src.slice(start, pos);
        token.block = true;
        state.parentType = old_parent;
        state.lineMax = old_line_max;
        state.line = nextLine + (auto_closed ? 1 : 0);
        return true;
    }, {
        alt: ['paragraph', 'reference', 'blockquote', 'list'],
    });
    md.renderer.rules.admonition_open = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const data = token.info.trim().split(/\s+/);
        const type = data[0];
        const title = data.filter((_, i) => i !== 0).join(' ');
        if (type)
            token.attrJoin('class', `admonition-${type}`);
        const titleHtml = title
            ? `<div class="admonition-title">${title
                .replace(/^(")/, '')
                .replace(/(")$/, '')}</div>`
            : '';
        return `<div ${self.renderAttrs(token)}>${titleHtml}`;
    };
    md.renderer.rules.admonition_close = (tokens, idx, options, env, self) => {
        return '</div>';
    };
}
exports.default = admonition;
//# sourceMappingURL=index.js.map