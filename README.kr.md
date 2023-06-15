# Maria Symphony Desktop

Fullstack 도메인의 frontend 개발에 더 중점을 둔 예시 프로젝트입니다.
전체 설정 프로세스를 보여주는 데 집중된 React 프로젝트 입니다.
제일 자신하는 것은 Angular이지만 이 프로젝트에서는 React를 사용하기로 했습니다. 핵심 개념을 이해하면 새로운 프레임워크로의 전환은 큰 어려움이 아니라고 생각합니다.
프로젝트에 사용된 용어들은 특별한 의미가 없습니다. 일반적이고 모호한 용어를 선택했습니다.

Backend 서비스는 쇼케이스용으로 준비된 간단한 Java 애플리케이션입니다. 
Docker 컨테이너를 생성한 후 frontend, 데이터베이스 및 backend API 간의 쉬운 연결을 위해 `docker-compose.yml` 파일을 생성했습니다.

[![Video Demo](https://img.youtube.com/vi/cSe33tnbJdU/0.jpg)](https://youtu.be/cSe33tnbJdU)

## Docker로 프로젝트를 실행하는 방법

1. 다음 명령을 사용하여 Docker 컨테이너를 시작합니다.
```
docker-compose up -d
```

2. 다음 명령을 사용하여 프로젝트를 실행합니다.
```
npm run dev
```
3. 브라우져를 열어 localhost:4200 를 입력합니다.

4. 회원 가입합니다.

5. 가입된 계정으로 로그인합니다.

6. "Generate 10 Examples" 를 클릭하거나 entity를 하나씩 직접 생성합니다.

7. 애플리케이션은 아래의 기능을 포함합니다.

   - 필터링 및 페이징 기능이 있는 Melody Entity List 페이지
   - (Add New Entity 버튼 클릭하여 이동하는) Melody Entity Create 페이지에서 직접 entity 생성
   - (Generate 10 Examples 버튼 클릭하여) 10개의 entities 자동 생성
   - (체크박스 선택된) entities 컨펌 팝업 확인 후 삭제
   - 간단한 Redux Saga 구현 (console log can be checked).
   - 401 또는 403 response에 대해 사용자를 로그아웃하고, request를 위해 토큰을 주입하는 interceptor
   - 특정 경로에 대한 액세스를 제한하는 protected router
   - 적당한 반응형 화면 (UI를 우선순위에 둔 프로젝트는 아님)
   - Prettier 코드 자동 수정 설정 (use `npm run format` to format the code)