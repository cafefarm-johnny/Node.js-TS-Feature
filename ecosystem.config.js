/**
 * PM2 설정 스크립트
 * * 실행 방법:
 * * 1. pm2 명령어로 실행한다. (pm2 start ./ecosystem.config.js)
 * ! 주의사항: ecosystem.config.js 대상을 지정할 때 현재 디렉토리(./)를 지정하지 않을 경우 실행 오류가 발생할 수 있다.
 * @author Johnny
 */
module.exports = {
    apps: [
        {
            name: 'sample-project',
            script: './src/app.js',
            env: {
                NODE_ENV: 'production',
                port: 7766
            },
            watch: true,
            error_file: './log/err.log',
            out_file: './log/out.log',
            log_file: './log/combined.log',
            time: true
        }
    ]
};
