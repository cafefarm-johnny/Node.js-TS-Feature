import { Application } from 'express';

import * as LoginController from '../controller/login.controller';

import * as LoginInterceptor from '../../interceptor/login.interceptor';

export default (app: Application) => {
    /**
     * 회원 테이블 재생성 테스트 라우트
     * @author Johnny
     * @swagger
     * /test:
     *  get:
     *      summary: 회원 테이블 재생성 테스트
     *      responses:
     *          200:
     *              description: 재생성 성공
     *              schema:
     *                  type: object
     *                  properties:
     *                      message:
     *                          type: string
     *                          example: ok
     */
    app.get('/test', LoginController.reCreateTable);

    /**
     * RSA 공개 키 요청 라우트
     * @author Johnny
     * @swagger
     * /getRSAPublicKey:
     *  get:
     *      summary: RSA 공개 키 요청
     *      responses:
     *          200:
     *              description: 요청 성공
     *              schema:
     *                  type: object
     *                  properties:
     *                      publicKey:
     *                          type: string
     *                          example: MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCty6kY07bbg8xbFRJk/Xc6kAInhj8vd/VnG5MHbBbWCikm+h7z4yGmwthUkWyKVYtm8M2xojnfzw9Id90qjsFSdKEmK0j3aLJBzQJDbWB+967/1Tndc4NGFUn1ScXRC9r4QWdO4ZqezQdy7NOtbCTYGVbwEDzrmtAd0/eiZHFn7wIDAQAB
     */
    app.get('/getRSAPublicKey', LoginController.getRSAPublicKey);

    /**
     * 비밀번호 암호화 요청 라우트
     * @author Johnny
     * @swagger
     * /passwordHash:
     *  get:
     *      summary: 비밀번호 암호화 요청
     *      responses:
     *          200:
     *              description: 요청 성공
     *              schema:
     *                  type: object
     *                  properties:
     *                      hashed:
     *                          type: string
     *                          exmaple: 5EG9Al5YnZsqoQcxAkr30v0A6WdN2MM2Lz802NODJwo=
     */
    app.get('/passwordHash', LoginController.getEncryptPassword);

    /**
     * 로그인 요청 라우트
     * @author Johnny
     * @swagger
     * /login:
     *  post:
     *      summary: 로그인 요청
     *      parameters:
     *          - in: body
     *            name: login
     *            required: true
     *            schema:
     *                type: object
     *                properties:
     *                    username:
     *                        type: string
     *                        example: test
     *                    password:
     *                        type: string
     *                        example: "12341234"
     *      responses:
     *          200:
     *              description: 요청 성공
     *              schema:
     *                  type: object
     *                  properties:
     *                      id:
     *                          type: number
     *                          example: 1034
     *                      username:
     *                          type: string
     *                          example: hong
     *                      email:
     *                          type: string
     *                          example: hong@gamil.com
     *          401:
     *              description: 중복 로그인 시도
     *              schema:
     *                  type: object
     *                  properties:
     *                      code:
     *                          type: number
     *                          example: 401
     *                      message:
     *                          type: string
     *                          example: 로그아웃 후 이용해주세요.
     */
    app.post('/login', LoginInterceptor.logoutVerify, LoginController.login);

    /**
     * 로그아웃 요청 라우트'
     * @author Johnny
     * @swagger
     * /logout:
     *  delete:
     *      summary: 로그아웃 요청
     *      responses:
     *          200:
     *              description: 요청 성공
     *              schema:
     *                  type: obejct
     *                  properties:
     *                      message:
     *                          type: string
     *                          example: 정상적으로 로그아웃이 되었습니다.
     *          401:
     *              description: 비로그인 상태에서 시도
     *              schema:
     *                  type: object
     *                  properties:
     *                      code:
     *                          type: number
     *                          example: 401
     *                      message:
     *                          type: string
     *                          exmaple: 로그인 후 이용해주세요.
     */
    app.delete(
        '/logout',
        LoginInterceptor.sessionVerify,
        LoginController.logout
    );
};
