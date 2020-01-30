module.exports = {
    preset: 'ts-jest', // TS 프리셋 설정
    testEnvironment: 'node', // Node.js 테스환경
    verbose: true, // 테스트가 완료된 다음 결과 출력
    coverageReporters: ['text-summary', 'html'], // 테스팅 커버릿지 레포트 설정 (테스트가 필요한 범위 보고서)
    reporters: [
        // 테스트 결과 레포트 외부 모듈 등록
        'default',
        ['./node_modules/jest-html-reporter', { pageTitle: 'Test Reporter' }]
    ],
    testResultsProcessor: './node_modules/jest-html-reporter' // 테스트 결과 처리기 모듈 설정
};
