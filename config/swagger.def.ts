/* Swagger 설정 파일 */

import path from 'path';
import { SwaggerDefinition, Options } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
    // swagger 정보
    info: {
        title: 'Example HTTP API Documantation.',
        version: '1.0.0',
        description: '샘플 HTTP API 정보 제공 문서입니다.'
    },
    // 기본 루트 경로
    basePath: '/',
    contact: { email: 'npcdja@gmail.com' },
    // 모든 API에 대한 공통 정의
    components: { res: {} },
    // 사용 가능한 통신 방식 (http, https, ws)
    schemes: ['http'],
    // DB 모델 정의
    definitions: {}
};

export default {
    swaggerDefinition,
    apis: [path.join(__dirname + '/../src/**/*.ts')] // 라우트 경로 (API 위치)
} as Options;
