import http from './supertest';
import NodeRSA from 'node-rsa';

export async function getSession(): Promise<Array<string>> {
    const rsaRes = await http.get('/getRSAPublicKey');

    const rsaSession: Array<string> = rsaRes.header['set-cookie'];

    const key = new NodeRSA({ b: 1024 });
    key.importKey(
        Buffer.from(rsaRes.body.publicKey, 'base64'),
        'pkcs8-public-der'
    );

    key.setOptions({ encryptionScheme: 'pkcs1' });

    const username = key.encrypt('test01', 'base64');
    const password = key.encrypt('1111', 'base64');

    const response = await http
        .post('/api/login')
        .send({
            username,
            password,
            url: 'www.wlotto.net'
        })
        .set('Cookie', rsaSession);

    // console.log('rsaSession :', rsaSession);
    // console.log('response.header :', response.header);
    // const worldsponSession: Array<string> = response.header['set-cookie'][0]
    //     .split(',')
    //     .map((cookie: string) => {
    //         return cookie.split(';')[0];
    //     });

    const worldsponSession: Array<string> = rsaSession.map((cookie: string) => {
        return cookie.split(';')[0];
    });

    return worldsponSession;
}
