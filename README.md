# Booking Event
Event를 생성하고 Event 참석을 예약 및 취소하는 애플리케이션

## 기능
- 로그인
- 회원가입
- 이벤트 조회
- 이벤트 생성
- 이벤트 예약
- 이벤트 예약 취소

## 사용 기술
- Front-End : React, Apollo Client
- Back-End : Apollo Server, Express, Graphql
- Database : MongoDB
- Deployed : Heroku

## Start producton mode
1. 레포지토리의 소스코드 pull
2. npm i
3. .env에서 DB_USER(MongoDB user 입력), DB_PASSWORD(MongoDB password 입력), SECRET_KEY, NODE_ENV(production 입력) 설정
4. npm start
5. localhost:4000에서 확인
6. 만약 client를 수정했다면 cd client && npm run build 선행 필요

## Start development mode
1. 레포지토리의 소스코드 pull
2. npm i
3. .env에서 DB_USER(MongoDB user 입력), DB_PASSWORD(MongoDB password 입력), SECRET_KEY, NODE_ENV(dev 입력) 설정
4. npm run dev
5. localhost:4000/graphql에서 playground 확인
6. cd client && npm start
7. localhost:3000에서 client 확인

## Reference
- [Apollo Graphql의 공식 문서](https://www.apollographql.com)
- [Graphql의 공식 문서](https://graphql.org)
- [Academind 채널의 Graphql 강좌](https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w)
