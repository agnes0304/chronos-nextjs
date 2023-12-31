# 필기깎는화석 | Chronos

<div align="center">  
   
![필기깎는화석 서비스 소개](https://github.com/agnes0304/chronos-nextjs/assets/86249667/668e4ae7-4fa1-4620-bb07-fd1d92148c0d)
</div>

## 필기깎는화석?

OCR(네이버 클로바)로 이미지를 스캔한 뒤, 파이썬의 한국어 자연어처리 패키지 Konlpy을 활용하여 키워드로 원하는 자료를 검색할 수 있도록 한 서비스입니다. 
일부 유료 자료에 대한 결제 편의성 및 신뢰도를 높일 수 있도록 AWS Simple email service를 사용하여 판매자와 구매자 간 상호 작용을 보완하였습니다. 


</br></br>


## 프로젝트 정보
- 👤 개인 / 2023년 10월 ~ (약 1개월)
- 배포링크: <a href="https://chronos.jiwoo.best">필기깎는화석</a>
- 서버 레포지토리: <a href="https://github.com/agnes0304/chronos-server">chronos-server</a>

</br></br>

## 개발 환경 및 기술 스택

<h4 align="center">Client</h4>
<div align="center">

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

</div>

<h4 align="center">Server</h4>
<div align="center">
  
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

</div>


<h4 align="center">Deployment</h4>
<div align="center">
  
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Flyio](https://img.shields.io/badge/fly.io-A682E8.svg?style=for-the-badge&logo=flyio&logoColor=white)

</div>

<h4 align="center">Others (Web services)</h4>
<div align="center">
  
![Amazon](https://img.shields.io/badge/AWS.simpleemailservice-DD344C.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Amazon](https://img.shields.io/badge/AWS.S3-569A31.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

</div>

</br></br>

## 구현 기능

### 인증 / 권한

- Supabase Authentication을 활용하여 관리자 페이지의 깃허브 로그인/로그아웃 구현
- 관리자 페이지 내 포스트 생성 및 수정
   - <a href="https://github.com/agnes0304/chronos-nextjs?tab=readme-ov-file#%EA%B4%80%EB%A6%AC%EC%9E%90-%ED%8E%98%EC%9D%B4%EC%A7%80">데모 영상 바로보기</a>
- AWS SES를 통해 판매자 ↔ 구매자 간 알림 이메일 전송 자동화
   - <a href="https://velog.io/@inmyhead/AWS-SES으로-유저에게-이메일-전송하기">관련 글 바로가기</a>
   - <a href="https://github.com/agnes0304/chronos-nextjs?tab=readme-ov-file#aws-simple-email-service-%ED%99%9C%EC%9A%A9-%EC%98%81%EC%83%81">데모 영상 바로보기</a>

</br>

### 자료 검색 및 다운로드

- 검색어 자동완성 기능 및 태그형 검색 기능 구현
- Postgres LIKE 및 사용자 지정 SQL 함수를 사용하여 검색 엔진 기능 모방 시도
- AWS S3의 Presigned-url을 활용하여 유료 자료를 구매한 고객에게 별도의 UI 제공
- 자료 구매 후 24시간 경과 시 다운로드 만료 구현
   - presigned-url의 ExpiresIn 설정
   - orders 테이블의 clickedAt 기록

</br></br>

## 데모 영상

### 🎦 관리자 페이지

![관리자페이지-min](https://github.com/agnes0304/chronos-nextjs/assets/86249667/1e5ef235-8d61-4f1d-bb9d-258b4138de3b)

</br>

### 🎦 AWS Simple Email Service 활용 영상

(웹과 모바일 동시에 화면 녹화 진행함)

#### ⬇️ 구매자가 송금 후 ```확인```버튼을 누르면 판매자에게 입금확인 요청 이메일이 전달

![입금확인메일 발송과정-min](https://github.com/agnes0304/chronos-nextjs/assets/86249667/92397800-41df-4fd6-8b75-29a50c1251a0)

</br>

#### ⬇️ 판매자가 입금확인요청 리스트에서 ```확인```버튼을 누르면 구매자에게 다운로드 가능 이메일이 전달

- 해당 이메일을 통해 바로 다운로드 페이지로 이동
- 약관 동의 후 이메일 최초 입력 시 시간이 ```clickedAt```에 기록 

![다운로드가능메일발송과정-min](https://github.com/agnes0304/chronos-nextjs/assets/86249667/8817f261-a9ae-4d56-be30-6c76c20774f1)

