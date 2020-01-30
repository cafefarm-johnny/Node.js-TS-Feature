import crypto from 'crypto';
import NodeRSA from 'node-rsa';

/**
 * pbkdf2 단방향 암호화
 * @author Johnny
 * @param target 암호화할 문자열
 */
export function pbkdf2Hash(
    target: string
): Promise<{ salt: string; hashed: string }> {
    /**
     * 1. 64바이트 길이의 랜덤 salt를 생성
     * 2. 콜백함수로 Buffer 타입의 buf를 base64로 문자열 salt로 변경
     * 3. pbkdf(pwd, salt, repeat count, pwd size, hash algorithm)
     * 4. 이렇게 암호화한 값은 콜백함수로 Buffer타입인 'key'가 전달되고, 이를 base64 문자열로 인코딩한다.
     */
    return new Promise((resolve, reject) => {
        crypto.randomBytes(32, (err: Error | null, salt: Buffer): void => {
            err
                ? reject(err)
                : crypto.pbkdf2(
                      target,
                      salt.toString('base64'),
                      126683,
                      32,
                      'sha512',
                      (err: Error | null, key: Buffer): any => {
                          err
                              ? reject(err)
                              : resolve({
                                    salt: salt.toString('base64'),
                                    hashed: key.toString('base64')
                                });
                      }
                  );
        });
    });
}

/**
 * pbkdf2 단방향 암호화 해시값 비교
 * @author Johnny
 * @param target 암호화할 문자열
 * @param salt pbkdf2Hash에서 생성한 base64 문자열 소금
 */
export function pbkdf2HashCompare(
    target: string,
    salt: string
): Promise<string> {
    /**
     * 1. 동일한 해시값을 만들기 위해 pbkdf2Hash 함수에서 설정한 반복 횟수, 패스워드 길이, 해시 알고리즘을 동일하게 인자로 넘긴다.
     * 2. pbkdf2Hash 함수에서 생성한 salt를 인자로 넘긴다.
     * 3. 암호화할 문자열을 인자로 넘겨 암호화 된 값을 리턴받고 리턴받은 문자열을 base64로 인코딩한다.
     */
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(
            target,
            salt,
            126683,
            32,
            'sha512',
            (err: Error | null, key: Buffer): any => {
                err ? reject(err) : resolve(key.toString('base64'));
            }
        );
    });
}

export class RSA {
    private key: NodeRSA;

    constructor() {
        this.key = new NodeRSA({ b: 1024 });
    }

    /**
     * RSA 공개 키, 개인 키 생성
     * @author Johnny
     */
    generateKeys(): { publicKey: string; privateKey: string } {
        return {
            publicKey: this.key
                .exportKey('pkcs8-public-der')
                .toString('base64'),
            privateKey: this.key.exportKey('pkcs1-der').toString('base64')
        };
    }

    /**
     * 데이터 암호화
     * @author Johnny
     * @param data 암호화할 문자열
     * @param publicKey RSA 공개 키
     */
    encryptData(data: string, publicKey: string): string {
        this.key.importKey(
            Buffer.from(publicKey, 'base64'),
            'pkcs8-public-der'
        );
        this.key.setOptions({ encryptionScheme: 'pkcs1' }); // 암복호화 시 암호화 스케마를 맞춰줘야 함

        return data && !this.key.isEmpty() && this.key.isPublic()
            ? this.key.encrypt(data, 'base64')
            : '';
    }

    /**
     * 데이터 복호화
     * @author Johnny
     * @param data 복호화할 문자열
     * @param privateKey RSA 개인 키
     */
    decryptData(data: string, privateKey: string): string {
        this.key.importKey(Buffer.from(privateKey, 'base64'), 'pkcs1-der');
        this.key.setOptions({ encryptionScheme: 'pkcs1' });

        return data && !this.key.isEmpty() && this.key.isPrivate()
            ? this.key.decrypt(data, 'utf8')
            : '';
    }
}
