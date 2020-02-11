# Node.js-TS-Feature

## Node.js &amp; TS &amp; Sequelize MVC 패턴 기본 구조 프로젝트

해당 프로젝트는 프로젝트 기본 구조를 잡아놓은 프로젝트입니다.

몇몇 샘플 코드도 등록되어 있어 추후 신규 개발을 들어갈 때 빠르게 작업하기 위해 만들게 되었습니다.



## **테스트용 API**

모든 예제 API 작성은 VSCode의 **REST Client** 확장 프로그램 작성법을 기준으로 설명합니다.


> 모든 API는 swagger를 통해 상세하게 제공합니다. http://localhost:8080/api-docs



### 회원 예제 API






**MEMBER 테이블 재생성 요청**
```
get http://localhost:8080/test http/1.1
```



**RSA 암호화 키 요청**
```
get http://localhost:8080/getRSAPublicKey http/1.1
```



**PBKDF2 HASH**
```
get http://localhost:8080/passwordHash http/1.1
```



**LOGIN 요청**
```
post http://localhost:8080/login http/1.1
Content-Type: application/json

{
    "username": "test",
    "password": "12341234"
}
```



**LOGOUT 요청**
```
delete http://localhost:8080/logout http/1.1
```




### 파일 업로드 예제 API


**단일 파일 업로드 요청**
```
post http://localhost:8080/file/single http/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryABCDEFG

------WebKitFormBoundaryABCDEFG
Content-Disposition: form-data; name='img'; filename='fox.jpg'
Content-Type: image/jpeg

< C:/Users/Account/Downloads/bg/fox.jpg
------WebKitFormBoundaryABCDEFG--
```


**다중 파일 업로드 요청**
```
post http://localhost:8080/file/array http/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryHIJKLMN

------WebKitFormBoundaryHIJKLMN
Content-Disposition: form-data; name='imgs'; filename='슬기1.jpg'
Content-Type: image/jpeg

< C:/Users/Account/Downloads/images/슬기1.jpg

------WebKitFormBoundaryHIJKLMN
Content-Disposition: form-data; name='imgs'; filename='슬기2.jpg'
Content-Type: image/jpeg

< C:/Users/Account/Downloads/images/슬기2.jpg

------WebKitFormBoundaryHIJKLMN
Content-Disposition: form-data; name='imgs'; filename='슬기3.jpg'
Content-Type: image/jpeg

< C:/Users/Account/Downloads/images/슬기3.jpg
------WebKitFormBoundaryHIJKLMN--
```