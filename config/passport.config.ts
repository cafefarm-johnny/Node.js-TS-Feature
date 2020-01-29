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
        // authenticate에서 인증에 성공하면 req.login 속성에서 id값을 빼온다.
        // id를 제외한 나머지 필드 값은 쿠키로 만들어버린다.
        done(null, user.id);
    });

    /**
     * 디시리얼라이즈
     * @author Johnny
     * @param id 사용자 고유번호
     */
    passport.deserializeUser(async (id: number, done) => {
        // 클라이언트 요청이 발생할 때 마다 deserial 한다.
        try {
            // db를 조회해서 존재하는지 판단 후
            const member = await Member.findByPk(id, {
                attributes: ['id', 'username', 'email']
            });

            if (!member) {
                return done(null, false);
            }

            return done(null, { ...member.get() }); // req.user에 저장한다.
        } catch (e) {
            console.error('----- Passport deserializeUser -----');
            return done(e);
        }
    });
};
