import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import * as LoginService from '../service/login.service';

import { LoginSession } from '../interface/member.interface';

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

/**
 * RSA 공개 키 발급 요청
 * @author Johnny
 */
export async function getRSAPublicKey(
    req: Request,
    res: Response,
    next: NextFunction
) {
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
) {
    try {
        const hashed = await LoginService.encrpytPBKDF2('abcdefg');

        return res.json({ hashed });
    } catch (e) {
        console.error('----- login.controller :: getEncryptPassword -----');
        next(e);
    }
}

/**
 * 로그인 요청
 * @author Johnny
 * @param req.username 사용자 아이디
 * @param req.password 사용자 비밀번호
 */
export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        // authenticate('local') -> local.strategy -> done(member) -> controller
        passport.authenticate('local', (err, member: LoginSession) => {
            if (err) {
                return next(err);
            }

            req.login(member, (err) => {
                return err
                    ? next(err)
                    : res.json({
                          id: member.id,
                          username: member.username,
                          email: member.email
                      });
            });
        })(req, res, next);
    } catch (e) {
        console.error('----- login.controller :: login -----');
        next(e);
    }
}

/**
 * 로그아웃 요청
 * @author Johnny
 */
export function logout(req: Request, res: Response, next: NextFunction) {
    try {
        req.logout();

        return res.json({ message: '정상적으로 로그아웃이 되었습니다.' });
    } catch (e) {
        console.error('----- loginController :: logout -----');
        next(e);
    }
}
