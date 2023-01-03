# 옥타그노시스 검사 프로그램

![npm](https://img.shields.io/badge/Node.js-v14.16.0-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![yarn](https://img.shields.io/badge/Yarn-v1.22.4-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![webpack](https://img.shields.io/badge/Webpack-v5.21.2-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)

## 개발 환경 설정

```bash
# 패키지 설치
yarn

# 프로젝트 실행
yarn start

# 프로젝트 빌드
yarn build
```

## url 설계
## - 보안
1. 로그인  : /auth/login
2. 회원가입 : /auth/sign-up


## - 검사
1. 시작 페이지 : /inpections/{inspectionIdx}/pages/start
2. 검사 페이지  : /inpections/{inspectionIdx}/pages/{page}
1. 완료 페이지 : /inpections/{inspectionIdx}/pages/end

## - 결과 
1. 