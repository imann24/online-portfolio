const http = require('node:http');
const path = require('node:path');
const sirv = require('sirv');

const serve = sirv(path.resolve(__dirname, '..'), { dev: true });

http.createServer((request, response) => {
    let pathname;
    try {
        pathname = decodeURIComponent(request.url.split('?')[0]);
    } catch {
        response.writeHead(400).end();
        return;
    }

    // sirv's development mode doesn't apply its production dotfile filter.
    if (pathname.split(/[\\/]/).some(segment => segment.startsWith('.'))) {
        response.writeHead(404).end();
        return;
    }

    serve(request, response);
}).listen(8080, 'localhost', () => {
    console.log('Portfolio available at http://localhost:8080');
});
