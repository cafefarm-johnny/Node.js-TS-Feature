import { FileInfo } from '../interface/file.interface';

/**
 * 파일 정보 조회 서비스
 * @author Johnny
 * @param files 업로드 파일 객체
 */
export function getFileInfo(
    files: Express.Multer.File | Express.Multer.File[]
): FileInfo | Array<FileInfo> {
    try {
        return files && Array.isArray(files)
            ? files.map((file) => {
                  return {
                      fileName: file.originalname,
                      fileSize: file.size,
                      encoding: file.encoding
                  };
              })
            : {
                  fileName: files.originalname,
                  fileSize: files.size,
                  encoding: files.encoding
              };
    } catch (e) {
        console.error('----- file.service :: getFileInfo -----');
        throw new Error(e);
    }
}
