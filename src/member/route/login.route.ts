import { Application } from 'express';

import * as LoginController from '../controller/login.controller';

export default (app: Application) => {
    /**
     * 회원 테이블 재생성 테스트 라우트
     * @author Johnny
     */
    app.get('/test', LoginController.reCreateTable);

    /**
     * RSA 공개 키 요청 라우트
     * @author Johnny
     */
    app.get('/getRSAPublicKey', LoginController.getRSAPublicKey);

    /**
     * 비밀번호 암호화 요청 라우트
     * @author Johnny
     */
    app.get('/passwordHash', LoginController.getEncryptPassword);
};
