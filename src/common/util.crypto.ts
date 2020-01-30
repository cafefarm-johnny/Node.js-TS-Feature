import crypto from 'crypto';
import NodeRSA from 'node-rsa';

/**
 * pbkdf2 단방향 암호화
 * @author Johnny
 * @param target 암호화할 문자열
 */
export function pbkdf2Hash(target: string): Promise<object> {
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
                      12663,
                      32,
                      'sha512',
                      (err: Error | null, key: Buffer): any => {
                          err
                              ? reject(err)
                              : resolve({
                                    salt: salt.toString('base64'),
                                    key: key.toString('base64')
                                });
                      }
                  );
        });
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
