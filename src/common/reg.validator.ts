/**
 * 이메일 정규식 검증
 * @author Johnny
 * @param email 이메일
 */
export function emailValidate(email: string = ''): boolean {
    const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    return emailReg.test(email) ? true : false;
}

/**
 * 비밀번호 정규식 검증
 * @author Johnny
 * @param password 비밀번호
 */
export function passwordRegExp(password: string = ''): boolean {
    const passwordRegExp = /^[A-Za-z0-9]{8,20}$/;
    const wordRegExp = /[A-Za-z]/;
    const numberRegExp = /[0-9]/;

    if (
        passwordRegExp.test(password) &&
        wordRegExp.test(password) &&
        numberRegExp.test(password)
    ) {
        return true;
    }

    return false;
}

/**
 * 번호 정규식 검증
 * @author Johnny
 * @param arg 번호
 */
export function numberRegExp(arg: string = ''): boolean {
    const numberRegExp = /^[0-9]*$/;

    return numberRegExp.test(arg);
}
