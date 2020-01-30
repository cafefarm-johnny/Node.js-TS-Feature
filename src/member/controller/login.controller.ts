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
): Promise<Response | undefined> {
    try {
        await LoginService.forceCreateTable();

        return res.json({ message: 'ok' });
    } catch (e) {
        console.error('----- login.controller :: hihi -----');
        next(e);
    }
}

/**
 * RSA 공개 키 발급 요청
 * @author Johnny
 */
export async function getRSAPublicKey(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | undefined> {
    try {
        const {
            publicKey,
            privateKey
        }: {
            publicKey: string;
            privateKey: string;
        } = LoginService.getRSAKeys();

        req.session!.rsa = { privateKey };

        return res.json({ publicKey });
    } catch (e) {
        console.error('----- login.controller :: getRSAPublicKey -----');
        next(e);
    }
}
