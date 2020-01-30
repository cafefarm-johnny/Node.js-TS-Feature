import Member from '../model/member';
import { RSA, pbkdf2Hash, pbkdf2HashCompare } from '../../common/util.crypto';

/**
 * 회원 테이블 재생성 서비스
 * @author Johnny
 */
export async function forceCreateTable(): Promise<void> {
    try {
        await Member.sync({ force: true }); // force: 테이블 존재하면 drop 후 생성
        await Member.create({
            username: 'test',
            password: '12341234',
            email: 'test@gmail.com'
        });
    } catch (e) {
        console.error('----- login.service :: forceCreateTable -----');
        throw Error(e);
    }
}

/**
 * RSA 공개 키, 개인 키 생성 서비스
 * @author Johnny
 */
export function getRSAKeys(): { publicKey: string; privateKey: string } {
    const rsa = new RSA();
    const {
        publicKey,
        privateKey
    }: { publicKey: string; privateKey: string } = rsa.generateKeys();

    console.log('publicKey :', publicKey);
    console.log('privateKey :', privateKey);

    return { publicKey, privateKey };
}

/**
 * pbkdf2 암호화 서비스
 * @author Johnny
 * @param arg 암호화할 문자열
 */
export async function encrpytPBKDF2(arg: string): Promise<string> {
    try {
        const {
            salt,
            hashed
        }: { salt: string; hashed: string } = await pbkdf2Hash(arg);

        console.log('salt :', salt);
        console.log('hashed :', hashed);

        const compareHashValue: string = await pbkdf2HashCompare(arg, salt);

        console.log('compareHashValue :', compareHashValue);

        return hashed;
    } catch (e) {
        console.error('----- login.service :: encryptPBKDF2 -----');
        throw Error(e);
    }
}
