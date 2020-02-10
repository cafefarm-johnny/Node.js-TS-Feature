import { Request } from 'express';
import { PassportStatic } from 'passport';
import { Strategy } from 'passport-local';

import Member from '../src/member/model/member';

import * as LoginService from '../src/member/service/login.service';

import CustomError from '../src/error/custom.error';
import { pbkdf2HashCompare } from '../src/common/util.crypto';

/**
 * 패스포트 로컬 전략
 * @author Johnny
 */
export default (passport: PassportStatic) => {
    console.log('local.strategy');
    passport.use(
        new Strategy(
            {
                usernameField: 'username',
                passwordField: 'password',
                session: true,
                passReqToCallback: true
            },
            async (req: Request, username: string, password: string, done) => {
                try {
                    if (
                        !username ||
                        username.length <= 0 ||
                        !password ||
                        password.length <= 0
                    ) {
                        throw new CustomError(
                            400,
                            '입력 폼을 입력 후 시도해주세요.'
                        );
                    }

                    username = username.toLowerCase();
                    password = password.toLowerCase();

                    const member = await Member.findOne({
                        attributes: [
                            'id',
                            'username',
                            'password',
                            'passwordSalt',
                            'email'
                        ],
                        where: {
                            username
                        }
                    });

                    if (!member) {
                        throw new CustomError(404, '존재하지 않는 계정입니다.');
                    }

                    const hashedInputPassword = await pbkdf2HashCompare(
                        password,
                        member.getDataValue('passwordSalt')
                    );

                    console.log('member :', member.getDataValue('password'));
                    console.log('hashedInputPassword :', hashedInputPassword);

                    if (
                        member.getDataValue('password') !== hashedInputPassword
                    ) {
                        throw new CustomError(
                            400,
                            '패스워드가 일치하지 않습니다.'
                        );
                    }

                    return done(null, {
                        id: member.getDataValue('id'),
                        username: member.getDataValue('username'),
                        email: member.getDataValue('email')
                    });
                } catch (e) {
                    console.error('----- local.strategy -----');
                    return done(e);
                }
            }
        )
    );
};
