/* 애플리케이션 실행 파일 */

import server from './server';

const port = process.env.port || 8080;

server.listen(port, () => {
    console.log(`app listening on port ${port} / Sample Project.`);
    console.log(`node env: ${process.env.NODE_ENV}`);
});
