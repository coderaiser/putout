import jsesc from 'jsesc';

export function getStringFromRegExp({pattern}) {
    return jsesc(pattern, {
        quotes: 'single',
        escapeseq: true,
    });
}
