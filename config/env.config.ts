/* 애플리케이션 환경 설정 파일 */

import development from './env/development';

export const envConfig =
    process.env.NODE_ENV && process.env.NODE_ENV === 'development'
        ? development
        : development;
