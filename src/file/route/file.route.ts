import { Application } from 'express';

import { imgMulter } from '../../../config/multer.config';

import * as FileController from '../controller/file.controller';

export default (app: Application) => {
    /*
    [Error: ENOENT: no such file or directory, open 'paht\filename.png-20200210024836']
    - 실제 path 폴더 구조가 생성되어 있지 않아서 발생하는 에러다.
    path에 해당하는 디렉토리 구조를 만들어주자.

    MulterError: Unexpected field
    RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: LIMIT_UNEXPECTED_FILE
    - 라우터에 선언한 필드명 'img'와 요청에서 전달하는 필드명이 다를 경우 발생한다. 
    ex) imgMulter.single('img')
    요청 = file = filename.png
    */

    /**
     * 단일 파일 업로드 요청 라우트
     * @author Johnny
     * @swagger
     * /file/single:
     *   post:
     *       summary: 단일 파일 업로드 요청
     *       parameters:
     *           - in: formData
     *             name: img
     *             type: string
     *             format: binary
     *             description: 파일 객체
     *       responses:
     *          200:
     *              description: 요청 성공
     *              schema:
     *                  type: object
     *                  properties:
     *                      files:
     *                          type: object
     *                          properties:
     *                              fileName:
     *                                  type: string
     *                                  example: fox.png
     *                              fileSize:
     *                                  type: number
     *                                  example: 204523
     *                              encoding:
     *                                  type: string
     *                                  example: 7bit
     */
    app.post(
        '/file/single',
        imgMulter.single('img'),
        FileController.singleFile
    );

    /**
     * 다중 파일 업로드 요청 라우트
     * @author Johnny
     * @swagger
     * /file/array:
     *  post:
     *      summary: 다중 파일 업로드 요청
     *      parameters:
     *          - in: formData
     *            name: imgs
     *            type: array<string>
     *            format: binary
     *            description: 배열 형식 파일 객체
     *      responses:
     *          200:
     *              description: 요청 성공
     *              schema:
     *                  type: object
     *                  properties:
     *                      files:
     *                          type: array
     *                          items:
     *                              type: object
     *                              properties:
     *                                  fileName:
     *                                      type: string
     *                                      example: 슬기1.jpg
     *                                  fileSize:
     *                                      type: number
     *                                      example: 132496
     *                                  encoding:
     *                                      type: string
     *                                      example: 7bit
     */
    app.post('/file/array', imgMulter.array('imgs'), FileController.multiFiles);
};
