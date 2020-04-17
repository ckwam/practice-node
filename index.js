'use strict';
const http = require('http');
const pug = require('pug')
const server = http.createServer((req, res) => {
    const now = new Date();
    console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    switch (req.method) {
        case 'GET':
            if (req.url === '/characters') {
                res.write(pug.renderFile('./form.pug', {
                    path: req.url,
                    firstItem: 'アンナ',
                    secondItem: 'アーニー',
                    thirdItem: 'ゲイル',
                    fourthItem: 'クリス',
                    fifthItem: 'ケビン',
                    sixthItem: 'マイク',
                }));
            } else if (req.url === '/roles') {
                res.write(pug.renderFile('./form.pug', {
                    path: req.url,
                    firstItem: '村人',
                    secondItem: '狩人',
                    thirdItem: '占い師',
                    fourthItem: '霊能者',
                    fifthItem: '人狼',
                    sixthItem: '狂人',
                }));
            } else {
                const fs = require('fs');
                const rs = fs.createReadStream('./index.html')
                rs.pipe(res);
                break;
            }
            res.end();
            break;
        case 'POST':
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                const decoded = decodeURIComponent(body);
                console.info('選択: ' + decoded);
                res.write('<!DOCTYPE html><html lang="ja"><body><h1>' +
                    decoded + 'が投稿されました</h1></body></html>');
                res.end();
            });
            break;
        default:
            break;
    }
}).on('error', (e) => {
    console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
    console.error('[' + new Date() + '] Client Error', e);
});
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.info('[' + new Date() + '] Listening on ' + port);
});