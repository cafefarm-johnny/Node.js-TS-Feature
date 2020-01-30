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

/**
 * 비밀번호 pbkdf2 암호화 요청 예제
 * @author Johnny
 */
export async function getEncryptPassword(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | undefined> {
    try {
        const hashed = await LoginService.encrpytPBKDF2('abcdefg');

        return res.json({ hashed });
    } catch (e) {
        console.error('----- login.controller :: getEncryptPassword -----');
        next(e);
    }
}
