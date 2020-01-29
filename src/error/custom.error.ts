/**
 * 커스텀 에러 객체
 * @author Johnny
 */
export default class CustomError extends Error {
    code: number; // 에러 코드
    message: string; // 에러 메시지

    constructor(code: number, message: string, ...params: Array<any>) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        this.code = code;
        this.message = message;
    }
}
