import { Application } from 'express';

import * as LoginController from '../controller/login.controller';

export default (app: Application) => {
    /**
     * 회원 테이블 재생성 테스트 라우트
     * @author Johnny
     */
    app.get('/test', LoginController.reCreateTable);
};
