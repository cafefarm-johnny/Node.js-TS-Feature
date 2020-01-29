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
            cb(
                null,
                `${file.originalname}-${dateformat(
                    Date.now(),
                    'yyyymmddhhMMss'
                )}`
            );
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});
