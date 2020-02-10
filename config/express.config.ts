/* express 프레임워크에 대한 설정 */

import express from 'express';
import session from 'express-session';

import morgan from 'morgan'; // 로거 미들웨어
import compression from 'compression'; // 응답 압축 지원 모듈
import methodOverride from 'method-override'; // HTTP 동사 지원 모듈 (PUT, PATCH, DELETE, OPTIONS)
import helmet from 'helmet'; // 통합 보안 모듈
import passport from 'passport';
import cors from 'cors';
import dateFormat from 'dateformat';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import swaggerOptions from './swagger.def';

import passportConfig from './passport.config';
import localStrategy from './local.strategy';

import loginRoute from '../src/member/route/login.route';
import fileRoute from '../src/file/route/file.route';

import ErrorHandler from '../src/error/error.handler';

export default (): express.Express => {
    const app: express.Express = express();

    if (process.env.NODE_ENV === 'development') {
        // 요청 로그 설정
        app.use(
            morgan(
                (
                    tokens: morgan.TokenIndexer,
                    req: express.Request,
                    res: express.Response
                ): string | undefined | null => {
                    return [
                        'Reqeust START -------------------------------------------------------------------------------------------------------------------------------------------------------------\n',
                        // * iso 'YYYY-MM-DD'T'hh:mm:ss.ms'Z
                        // * clf 'DD/MM/YYYY':'hh:mm:ss +ms'
                        // * web 'day', 'DD' 'MM' 'YYYY' 'hh:mm:ss' GMT
                        tokens.date(req, res, 'iso'),
                        '/ HTTP Method: ',
                        tokens.method(req, res),
                        '/ URL: ',
                        tokens.url(req, res),
                        '\nRequest END ---------------------------------------------------------------------------------------------------------------------------------------------------------------'
                    ].join(' ');
                },
                {
                    // 로그를 Request 시점에 기록하는 옵션.
                    // 디폴트는 Response 시점에 기록한다. default: false
                    immediate: true
                }
            )
        );
        // 응답 로그 설정
        app.use(
            morgan(
                (
                    tokens: morgan.TokenIndexer,
                    req: express.Request,
                    res: express.Response
                ): string | undefined | null => {
                    return [
                        'Response START ------------------------------------------------------------------------------------------------------------------------------------------------------------\n',
                        tokens.date(req, res, 'iso'),
                        '/ STATUS: ',
                        tokens.status(req, res),
                        '/ Content-Length: ',
                        tokens.res(req, res, 'content-length'),
                        '-',
                        '/ Response-Time: ',
                        tokens['response-time'](req, res),
                        'ms',
                        '\nResponse END --------------------------------------------------------------------------------------------------------------------------------------------------------------'
                    ].join(' ');
                }
            )
        );
    } else if (process.env.NODE_ENV === 'production') {
        app.use(
            morgan(
                (
                    tokens: morgan.TokenIndexer,
                    req: express.Request,
                    res: express.Response
                ): string | undefined | null => {
                    return [
                        'Reqeust START -------------------------------------------------------------------------------------------------------------------------------------------------------------\n',
                        tokens.date(req, res, 'iso'),
                        '/ HTTP Method: ',
                        tokens.method(req, res),
                        '/ URL: ',
                        tokens.url(req, res),
                        // '/ STATUS: ', tokens.status(req, res),
                        // '/ Content-Length: ', tokens.res(req, res, 'content-length'), '-',
                        // '/ Response-Time: ', tokens['response-time'](req, res), 'ms',
                        '\nRequest END ---------------------------------------------------------------------------------------------------------------------------------------------------------------'
                    ].join(' ');
                },
                {
                    // 로그를 Request 시점에 기록하는 옵션.
                    // 디폴트는 Response 시점에 기록한다. default: false
                    immediate: true
                    // stream: fs.createWriteStream(path.join(__dirname, '../log/access.log'), {
                    //     flags: 'a'
                    // })
                }
            )
        );
        app.use(compression());
    }

    // * https://www.npmjs.com/package/dateformat
    // dateFormat으로 파싱한 날짜 포맷 표기 방식 커스텀
    dateFormat.i18n = {
        dayNames: [
            '일',
            '월',
            '화',
            '수',
            '목',
            '금',
            '토',
            '일요일',
            '월요일',
            '화요일',
            '수요일',
            '목요일',
            '금요일',
            '토요일'
        ],
        monthNames: [
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월',
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        timeNames: ['a', 'p', 'am', 'pm', 'A', 'P', '오전', '오후']
    };

    // http 모듈만 사용했을 때, req.on('data', (chunk) => { body += chunk; }) 같은 이벤트를 직접 등록해줘야 한다.
    // extended 옵션을 true로 할 경우 qs 모듈을, false일 시 query-string 모듈을 사용한다. 차이점은 아래의 링크 확인
    // https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0/45690436#45690436
    app.use(
        express.urlencoded({
            extended: true
        })
    ); // URL Encode, FormData 지원 | extended: 객체안에 객체를 파싱할 지 여부
    app.use(express.json()); // JSON 데이터 형식 처리 지원
    app.use(methodOverride()); // PUT, DELETE와 같은 HTTP 메소드 지원
    app.use(helmet()); // xss 스크립팅 공격 방지, 클라이언트 MIME 스니핑 방지, X-Powered-By 헤더 제거 등
    app.use(
        session({
            secret: 's2o5m8e14t4h2i4n66g22s6',
            name: 'something-session',
            resave: false,
            saveUninitialized: true
        })
    ); // express-session 설정
    app.use(
        cors({
            // origin: ['http://domain:port', 'http://domain2:port2'],
            credentials: true,
            methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
            allowedHeaders: [
                'Origin',
                'Accept',
                'X-Requested-With',
                'Content-Type',
                'Set-Cookie',
                'Authorization'
            ]
        })
    ); // cross-origin 설정
    app.use(express.static('files')); // 정적 파일 서비스 설정
    app.use(passport.initialize()); // 패스포트 초기화
    app.use(passport.session()); // 패스포트 세션 사용 설정
    app.use(
        '/api-docs',
        swaggerUI.serve,
        swaggerUI.setup(swaggerJSDoc(swaggerOptions))
    ); // swagger HTML UI 설정 및 활성화

    passportConfig(passport);
    localStrategy(passport);

    loginRoute(app);
    fileRoute(app);

    app.use(ErrorHandler);

    return app;
};
