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
    components: {
        res: {
            Forbidden: { description: '권한이 없습니다.' },
            NotFound: { description: '존재하지 않는 정보입니다.' }
        }
    },
    // 사용 가능한 통신 방식 (http, https, ws)
    schemes: ['http'],
    // DB 모델 정의
    definitions: {
        Member: {
            type: 'object',
            properties: {
                id: { type: 'number', description: '사용자 고유번호' },
                username: { type: 'string', description: '사용자 아이디' },
                password: { type: 'string', description: '사용자 비밀번호' },
                beforePassword: {
                    type: 'string',
                    description: '사용자 이전 비밀번호'
                },
                email: { type: 'string', description: '사용자 이메일' },
                createAt: { type: 'string', description: '생성일' },
                updateAt: { type: 'string', description: '수정일' },
                deleteAt: { type: 'string', description: '삭제일' }
            }
        }
    }
};

export default {
    swaggerDefinition,
    apis: [path.join(__dirname + '/../src/**/*.ts')] // 라우트 경로 (API 위치)
} as Options;
