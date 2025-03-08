<div align="center">
<img src="https://github.com/user-attachments/assets/5dc85992-7605-4d7d-9690-511b7e203c4d" style="width:300px">


### 매일의 기록으로 프로젝트와 경험 정리를 도와주는 AI 서비스 <뽀글 (Bbogle)>

</div>

---

## 프로젝트 개요

- **프로젝트 명**: 뽀글 (Bbogle)  
- **프로젝트 기간**: 2024.10.14 ~ 2024.11.19 (6주)

---

## 멤버 소개

| 이름     | GitHub ID | 역할                     |
|----------|-----------|--------------------------|
| 김선하   | [@kimzonah](https://github.com/kimzonah) | Back-end |
| 김태한   | [@Taehankk](https://github.com/Taehankk)   | Front-end |
| 문범수   | [@ANSmoon](https://github.com/ANSmoon)   | AI |
| 박예본   | [@shanaid](https://github.com/shanaid)   | Back-end , INFRA |
| 이지혜   | [@C0Zl](https://github.com/C0Zl)   | Front-end |
| 홍선주   | [@hhsssu](https://github.com/hhsssu)   | Front-end |

---

## 개발 환경

- **Front-end**: TypeScript | React.js | Zustand | HTML5 | CSS3
- **Back-end**: Java | JPA | SpringBoot | RabbitMQ | Firebase
- **AI**: AWS Bedrock
- **DB**: My SQL
- **Infra**: AWS S3 | EC2 | Docker | Jenkins
- **버전 및 이슈 관리**: GitHub
- **협업 툴**: Discord, Notion, Zira
- **테스트 도구**: Swagger
- **목업 디자인**: Figma

---

## 역할 분담

> 홍선주, **Front-end**
- 로고 제작
- 프로젝트 경험 관리 기능 구현
  - 경험 수동 생성, 수정, 삭제 조회 구현
  - 경험 목록 및 키워드 관련 기능 구현
  - 경험 검색 API 연결
- 프로젝트 회고 기능 구현
  - 회고 수동 생성 수정 API 연결
  - 회고록에서 AI 경험 추출 페이지 및 추출된 경험 선택 저장 구현


---

## 서비스 소개

뽀글은 개발자들의 프로젝트 활동을 체계적으로 정리하고 취업을 돕는 서비스입니다. 
매일 뽀글과 대화하듯 회고를 작성하고 경험을 기록하며 이를 추후에 쉽게 찾아볼 수 있도록 지원합니다.

### 주요 기능
|기능|상세 설명|디자인|
|:---:|:---:|:---:|
|회고 작성|매일의 작업 내용을 뽀글에서 회고할 수 있어요|<img src="https://github.com/user-attachments/assets/b78a0b29-128c-4d7e-af4b-c43c477cbd13" alt="image" border="0" style="width: 450px;">|
|회고록|프로젝트가 모두 끝났다면, </br>프로젝트 전체 회고록을 뽑을 수 있어요|<img src="https://github.com/user-attachments/assets/3396993e-d8c6-4c57-9878-80748c72fbfc" alt="image" border="0" style="width: 450px;">|
|경험추출|내가 적은 회고를 바탕으로, </br>프로젝트에서 얻은 경험들을 추출할 수 있어요 </br>|<img src="https://github.com/user-attachments/assets/a61c0769-fab0-4875-a4f8-7fcfbed711fe" alt="image" border="0" style="width: 450px;">|
|알림 기능|잊어버리지 않도록 매일 회고 알림을 보내드려요.|<img src="https://github.com/user-attachments/assets/1671f3cd-fd25-42ff-9ba9-a74a4a8d60b3" alt="image" border="0" style="width: 450px;">|
|프로젝트|프로젝트 별로 전체 개발일지를 조회할 수 있어요.|<img src="https://github.com/user-attachments/assets/5005bd24-ce41-424a-bc48-f36bbbde66fa" alt="image" border="0" style="width: 450px;">|
|경험조회|경험 검색부터, 프로젝트별 조회까지 !|<img src="https://github.com/user-attachments/assets/9faef9a8-e0ef-46ab-98ed-d659f6cf9a1e" alt="image" border="0" style="width: 450px;"><img src="https://github.com/user-attachments/assets/339a958d-e7f3-40b7-b4c1-e810e6ac0872" alt="image" border="0" style="width: 450px;">|
|내정보|마이 페이지에서 내 정보를 조회해보세요. </br> 프로필 이미지는 다운받으실 수 있어요.|<img src="https://github.com/user-attachments/assets/826ddd1a-a743-4fbd-af88-37565b1c141d" alt="image" border="0" style="width: 450px;"><img src="https://github.com/user-attachments/assets/d0e75e8e-265a-48af-b86c-02b6bec02841" alt="image" border="0" style="width: 450px;">|

</br>


---

## 프로젝트 아키텍처
<img src="https://github.com/user-attachments/assets/8e9227f3-ea03-48ad-9d40-8f6f70b3b823" alt="architecture" border="0">

---

## 성과 및 결과
- API 분리, Store에서 로딩 상태 관리 등으로 **Zustand 상태 관리**를 이용한 프로젝트 구현 경험을 쌓을 수 있었습니다. 또한, **CSS Module**을 도입하여 CSS의 클래스명이 겹쳐서 나는 오류를 미연에 방지하고, **TypeScript**를 사용하여 JavaScript에서 발생할 수 있는 타입 오류를 줄이고자 하였습니다.
- **사용자 경험 추출 및 선택 기능 구현**을 통해 **프로젝트의 핵심 가치를 실현**할 수 있었습니다. 사용자가 자신의 경험을 쉽게 정리하고, 필요한 경험을 간편하게 선택할 수 있도록 **사용자 중심의 퍼블리싱**을 하였습니다. 그리고, 경험 작성에서 키워드 선택 시, 선택한 키워드가 바로 화면에 보일 수 있도록 하여 **사용자가 경험 작성을 더욱 편리하게 할 수 있도록** 사용자 경험을 개선하였습니다.
- 경험 키워드 데이터 처리 부분에서 키워드 값이 number[]로 전송이 되어야 했는데, Keyword[]값으로 전달이 되는 오류 발생했었습니다. 이를 해결하기 위해 여러 차례 **데이터 전송 로직을 수정**하고, **관련 변수와 함수를 정리**하고, Form 컴포넌트에서 **키워드 데이터를 분리**하여 별도로 처리하는 방식으로 **문제를 해결**할 수 있었습니다.
