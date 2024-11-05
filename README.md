# 3DAssetTrading

> 3D 모델 애셋 서비스

[바로가기](https://asset.monsteratech.com)

## 프로젝트 개요

### 1. 프로젝트 주제

- 3D 모델 거래 서비스

### 2. 메인/서브 기능

```
1. Search MVP : 조건(카테고리, 프로그램 등)에 따른 모델 애셋 필터링 및 모델 이름으로 검색
2. Detail MVP : 선택된 모델의 세부 정보 제공
3. Cart MVP : 장바구니에 모델 추가 및 제거
4. User MVP : Discord 회원가입, 로그인, 로그아웃, 회원 탈퇴, 프로필
```

### 3. 프로젝트 팀원

| 이름   | 역할      |
| ------ | --------- |
| 신동한 | PM / 개발 |
| 강준영 | 개발      |
| 정혜주 | 개발      |

## 프로젝트 구조

### 시스템 아키텍처

![아키텍처](/docs/architecture.png)

### ERD

![ERD](/docs/erd.png)

### 디렉토리 구조

```
3DASSETTRADING
┣ app
┃ ┣ api
┃ ┃ ┣ auth
┃ ┃ ┃ ┗ [...nextauth]
┃ ┃ ┃   ┗ route.js
┃ ┃ ┣ image
┃ ┃ ┃ ┗ [...path]
┃ ┃ ┃   ┗ route.js
┃ ┃ ┣ search
┃ ┃ ┃ ┣ [id]
┃ ┃ ┃ ┃ ┗ route.js
┃ ┃ ┃ ┗ route.js
┃ ┃ ┗ user
┃ ┃   ┗ delete
┃ ┃     ┗ route.js
┃ ┣ cart
┃ ┃ ┣ cartpage.module.css
┃ ┃ ┗ page.js
┃ ┣ detail
┃ ┃ ┣ [id]
┃ ┃ ┃ ┗ page.js
┃ ┃ ┗ detailpage.module.css
┃ ┣ error
┃ ┃ ┗ page.js
┃ ┣ explore
┃ ┃ ┣ explorepage.module.css
┃ ┃ ┗ page.js
┃ ┣ fonts
┃ ┃ ┣ GeistMonoVF.woff
┃ ┃ ┗ GeistVF.woff
┃ ┣ profile
┃ ┃ ┣ profilepage.module.css
┃ ┃ ┗ page.js
┃ ┣ signup
┃ ┃ ┣ signuppage.module.css
┃ ┃ ┗ page.js
┃ ┣ store
┃ ┃ ┣ index.js
┃ ┃ ┣ cartSlice.js
┃ ┃ ┣ languageSlice.js
┃ ┃ ┗ userSlice.js
┃ ┣ favicon.ico
┃ ┣ Footer.js
┃ ┣ Footer.module.css
┃ ┣ globals.css
┃ ┣ Header.js
┃ ┣ Header.module.css
┃ ┣ layout.js
┃ ┣ mainpage.module.css
┃ ┗ page.js
┣ components
┃ ┣ common
┃ ┃ ┣ Button.js
┃ ┃ ┣ Button.module.css
┃ ┃ ┣ Dropdown.js
┃ ┃ ┣ Slider.js
┃ ┃ ┗ Slider.module.css
┃ ┣ hook
┃ ┃ ┣ useAuth.js
┃ ┃ ┣ useFetchData.js
┃ ┃ ┣ useFetchDetailData.js
┃ ┃ ┗ useLanguageData.js
┃ ┣ widget
┃ ┃ ┣ login
┃ ┃ ┃ ┣ IsLoggedIn.js
┃ ┃ ┃ ┣ LoginModal.js
┃ ┃ ┃ ┗ LoginModal.module.css
┃ ┃ ┣ Explore.js
┃ ┃ ┣ Eye.js
┃ ┃ ┗ Language.js
┃ ┗ ClientProvider.js
┣ prisma
┃ ┣ migrations
┃ ┣ prisma.js
┃ ┗ schema.prisma
┣ public
┃ ┣ 3dmodels
┃ ┣ icons
┃ ┣ images
┃ ┗ language.json
┣ auth.js
┣ docs
┃ ┣ architecture.png
┃ ┣ erd.png
┃ ┗ wireframe.pdf
┣ .env
┣ .eslintrc.json
┣ .gitattributes
┣ .gitignore
┣ jsconfig.json
┣ next.config.mjs
┣ postcss.config.mjs
┣ tailwind.config.js
┣ package-lock.json
┣ package.json
┗ README.md
```

## 프로젝트 환경

### 1. 기술 스택

- 프레임워크 및 라이브러리
  - `Next.js` : React 기반의 서버 사이드 렌더링 및 정적 웹사이트 생성 프레임워크
  - `React` : 사용자 인터페이스 구축을 위한 JavaScript 라이브러리
  - `Redux Toolkit` : 상태 관리 라이브러리
  - `Three.js` : 3D 그래픽 렌더링 라이브러리
  - `Framer Motion` : 끝내주는 애니메이션 라이브러리
  - `rc-slider` : 슬라이더 UI 컴포넌트 라이브러리
  - `next-auth` : 인증 및 권한 관리를 위한 라이브러리
  - `Prisma` : 데이터베이스와의 상호작용을 돕는 ORM (Object-Relational Mapping) 도구
  - `mysql2` : MySQL 데이터베이스와 통신하는 라이브러리
  - `es-hangul` : 한글 검색 및 필터링을 돕는 라이브러리
- 빌드 및 개발 도구
  - `npm` : 패키지 관리 도구, 의존성 설치 및 스크립트 실행을 관리
  - `ESLint` : JavaScript 코드 품질 검사 도구

### 2. 개발 환경

```
- Node.js : v20.18.0
- npm : v10.8.2
- Visual Studio Code: v1.95.0
```

## 개발 문서

[WBS](https://docs.google.com/spreadsheets/d/1VKXxkeZoJzUnt8dinMVFNMZtRECBctodlVXIybQFLIg/edit?gid=1119871053#gid=1119871053)

[와이어프레임](/docs/wireframe.pdf)
