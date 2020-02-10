/* multer 환경 설정 */

import multer from 'multer';
import { Request } from 'express';
import dateformat from 'dateformat';

export const imgMulter = multer({
    storage: multer.diskStorage({
        destination: (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, destination: string) => void
        ) => {
            cb(null, 'files/img');
        },
        filename: (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, filename: string) => void
        ) => {
            const fileNameExt: Array<string> = file.originalname.split('.');
            cb(
                null,
                `${fileNameExt[0]}-${dateformat(
                    Date.now(),
                    'yyyymmddhhMMss'
                )}.${fileNameExt[1]}`
            );
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});
