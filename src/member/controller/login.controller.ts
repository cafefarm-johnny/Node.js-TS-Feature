import { Request, Response, NextFunction } from 'express';

import * as LoginService from '../service/login.service';

/**
 * 회원 테이블 재생성 요청
 * @author Johnny
 */
export async function reCreateTable(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        await LoginService.forceCreateTable();

        return res.json({ message: 'ok' });
    } catch (e) {
        console.error('----- login.controller :: hihi -----');
        next(e);
    }
}
