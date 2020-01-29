import { PassportStatic } from 'passport';
import Member from '../src/member/model/member';
import { LoginSession } from '../src/member/interface/member.interface';

export default (passport: PassportStatic) => {
    /**
     * 시리얼라이즈
     * @author Johnny
     * @param user.id 사용자 고유번호
     */
    passport.serializeUser((user: LoginSession, done) => {
        done(null, user.id);
    });

    /**
     * 디시리얼라이즈
     * @author Johnny
     * @param id 사용자 고유번호
     */
    passport.deserializeUser(async (id: number, done) => {
        try {
            const member = await Member.findByPk(id, {
                attributes: ['id', 'username', 'email']
            });

            if (!member) {
                return done(null, false);
            }

            return done(null, { ...member.get() });
        } catch (e) {
            console.error('----- Passport deserializeUser -----');
            return done(e);
        }
    });
};
