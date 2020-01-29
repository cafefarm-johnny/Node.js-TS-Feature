import { Request, Response, NextFunction } from 'express';
import CustomError from './custom.error';

/**
 * 커스텀 에러 핸들러
 * @author Johnny
 */
export default (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err.code) {
        return res.status(err.code).json({ error: err });
    }

    return res
        .status(500)
        .json({ error: new CustomError(500, 'Internal Server Error') });
};
