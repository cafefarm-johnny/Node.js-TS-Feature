import { Request, Response, NextFunction } from 'express';

import { FileInfo } from '../interface/file.interface';

import * as FileService from '../service/file.service';

/**
 * 단일 파일 처리 요청
 * @author Johnny
 * @param req.file 업로드 파일 객체
 */
export function singleFile(req: Request, res: Response, next: NextFunction) {
    try {
        const files: FileInfo | Array<FileInfo> | undefined =
            req && req.file ? FileService.getFileInfo(req.file) : undefined;

        return res.json({ files });
    } catch (e) {
        console.error('----- file.controller :: test -----');
        next(e);
    }
}

/**
 * 다중 파일 처리 요청
 * @author Johnny
 * @param req.files 업로드 파일 배열 객체
 */
export function multiFiles(req: Request, res: Response, next: NextFunction) {
    try {
        const files: FileInfo | Array<FileInfo> | undefined =
            req && req.files && Array.isArray(req.files)
                ? FileService.getFileInfo(req.files)
                : undefined;

        return res.json({ files });
    } catch (e) {
        console.error('----- file.controller :: multiFiles -----');
        next(e);
    }
}
