import { Request, Response, NextFunction } from 'express';

import CustomError from '../error/custom.error';

/**
 * 로그아웃 검증
 * @author Johnny
 * @param req.user 로그인 세션
 */
export function logoutVerify(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.user) {
            throw new CustomError(401, '로그아웃 후 이용해주세요.');
        }

        next();
    } catch (e) {
        console.error('----- login.interceptor :: logoutVerify -----');
        next(e);
    }
}

/**
 * 세션 검증
 * @author Johnny
 * @param req.user 로그인 세션
 */
export function sessionVerify(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.user) {
            throw new CustomError(401, '로그인 후 이용해주세요.');
        }

        next();
    } catch (e) {
        console.error('----- login.interceptor :: sessionVerify -----');
        next(e);
    }
}
